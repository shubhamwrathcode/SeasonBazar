import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: number;
  name: string;
  price: string;
  regular_price?: string;
  image?: string;
  average_rating: string;
  categories: any[];
  description: string;
  short_description: string;
}

interface CompareState {
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set) => ({
      compareList: [],
      addToCompare: (product) => 
        set((state) => {
          const exists = state.compareList.find((p) => p.id === product.id);
          if (exists) return state;
          // Limit to 4 products for better comparison UI
          if (state.compareList.length >= 4) {
             return state;
          }
          return { compareList: [...state.compareList, product] };
        }),
      removeFromCompare: (productId) =>
        set((state) => ({
          compareList: state.compareList.filter((p) => p.id !== productId),
        })),
      clearCompare: () => set({ compareList: [] }),
    }),
    {
      name: 'compare-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
