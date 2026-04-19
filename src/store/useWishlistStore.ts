import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface WishlistState {
  favorites: WishlistItem[];
  toggleWishlist: (product: any) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleWishlist: (product) => {
        const { favorites } = get();
        const exists = favorites.find((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: favorites.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            favorites: [
              ...favorites,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.src || '',
              },
            ],
          });
        }
      },

      isInWishlist: (id) => {
        return get().favorites.some((item) => item.id === id);
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
