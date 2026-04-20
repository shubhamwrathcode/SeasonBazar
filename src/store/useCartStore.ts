import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cartService } from '../services/cartService';
import { useAuthStore } from './useAuthStore';

interface CartItem {
  key?: string; // Store API's unique item key
  id: number;
  name: string;
  price: string;
  regular_price?: string;
  image: string;
  quantity: number;
  store?: any;
}

interface CartState {
  items: CartItem[];
  appliedCoupon: any | null;
  loading: boolean;
  
  // Actions
  syncCart: () => Promise<void>;
  addItem: (product: any) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // Coupons & Pricing
  applyCoupon: (coupon: any) => void;
  removeCoupon: () => void;
  totalAmount: () => number;
  subTotal: () => number;
  discountTotal: () => number;
  couponDiscount: () => number;
  totalSavings: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      loading: false,

      /**
       * Sync local cart with server data
       */
      syncCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        console.log('--- syncCart Called --- isAuthenticated:', isAuthenticated);
        if (!isAuthenticated) return;

        try {
          set({ loading: true });
          console.log('--- Calling cartService.getCart() ---');
          const serverCart = await cartService.getCart();
          console.log('--- serverCart Received ---', serverCart);
          
          if (serverCart && serverCart.items) {
            const mappedItems = serverCart.items.map((item: any) => ({
              key: item.key,
              id: item.id,
              name: item.name,
              price: (parseFloat(item.prices?.price || '0') / 100).toString(), 
              regular_price: (parseFloat(item.prices?.regular_price || '0') / 100).toString(),
              image: item.images?.[0]?.src || '',
              quantity: item.quantity,
              store: item.item_data?.find((d: any) => d.type === 'vendor')?.value || null
            }));
            set({ items: mappedItems });
          }
        } catch (error) {
          console.log('Sync Cart Error:', error);
        } finally {
          set({ loading: false });
        }
      },
      
      addItem: async (product) => {
        const { items } = get();
        const { isAuthenticated } = useAuthStore.getState();
        const existingItem = items.find((item) => item.id === product.id);

        // 1. Optimistic UI Update
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                regular_price: product.regular_price,
                image: product.images?.[0]?.src || '',
                quantity: 1,
                store: product.store,
              },
            ],
          });
        }

        // 2. Server Sync
        if (isAuthenticated) {
          try {
            let variationId = product.variation_id || product.default_variation_id;
            let variationAttributes = product.variation_attributes || product.default_variation_attributes || [];
            
            // If it's a variable product but no variation was passed, 
            // pick the first one as fallback to avoid API error
            if (product.type === 'variable' && !variationId && product.variations?.length > 0) {
              variationId = product.variations[0];
            }

            await cartService.addToCart(product.id, 1, variationId, variationAttributes);
            get().syncCart(); // Re-sync to get keys and exact prices
          } catch (error) {
             console.log('API Add To Cart Failed');
          }
        }
      },

      removeItem: async (id) => {
        const { items } = get();
        const { isAuthenticated } = useAuthStore.getState();
        const itemToRemove = items.find(i => i.id === id);

        // 1. Local Update
        set({ items: items.filter((item) => item.id !== id) });

        // 2. Server Sync
        if (isAuthenticated && itemToRemove?.key) {
           try {
             await cartService.removeItem(itemToRemove.key);
           } catch (error) {
             console.log('API Remove Item Failed');
           }
        }
      },

      updateQuantity: async (id, quantity) => {
        if (quantity < 1) return;
        const { items } = get();
        const { isAuthenticated } = useAuthStore.getState();
        const targetItem = items.find(i => i.id === id);

        // 1. Local Update
        set({
          items: items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });

        // 2. Server Sync
        if (isAuthenticated && targetItem?.key) {
           try {
             await cartService.updateItem(targetItem.key, quantity);
           } catch (error) {
             console.log('API Update Qty Failed');
           }
        }
      },

      clearCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        set({ items: [], appliedCoupon: null });
        
        if (isAuthenticated) {
          try {
            await cartService.clearCart();
          } catch (error) {
            console.log('API Clear Cart Failed');
          }
        }
      },
      
      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),

      subTotal: () => {
        return get().items.reduce((total, item) => {
          const price = parseFloat(item.regular_price || item.price) || 0;
          return total + price * item.quantity;
        }, 0);
      },

      discountTotal: () => {
        return get().items.reduce((total, item) => {
          if (!item.regular_price || item.regular_price === item.price) return total;
          const saving = (parseFloat(item.regular_price) - parseFloat(item.price)) || 0;
          return total + saving * item.quantity;
        }, 0);
      },

      couponDiscount: () => {
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        const sub = get().subTotal() - get().discountTotal();
        
        if (coupon.discount_type === 'percent') {
          return (sub * parseFloat(coupon.amount)) / 100;
        }
        return parseFloat(coupon.amount) || 0;
      },

      totalAmount: () => {
        const sub = get().subTotal();
        const disc = get().discountTotal();
        const coup = get().couponDiscount();
        return Math.max(0, sub - disc - coup);
      },

      totalSavings: () => {
        return get().discountTotal() + get().couponDiscount();
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
