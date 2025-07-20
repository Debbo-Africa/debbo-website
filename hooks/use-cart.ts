"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  testName: string;
  price: string;
  category?: string;
  type?: string;
  quantity: number;
  testCount?: number;
  isScan?: boolean;
}

interface CartStore {
  cartItems: CartItem[];
  isLoaded: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
  setLoaded: (loaded: boolean) => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isLoaded: false,

      addToCart: (item: Omit<CartItem, "quantity">) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }

          return {
            cartItems: [...state.cartItems, { ...item, quantity: 1 }],
          };
        });
      },

      removeFromCart: (id: string) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => {
          // Extract numeric value from price string (e.g., "₦5,000" -> 5000)
          const priceString = item.price.replace(/[₦,\s]/g, "");
          const price = Number.parseFloat(priceString) || 0;
          return total + price * item.quantity;
        }, 0);
      },

      getCartCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },

      isInCart: (id: string) => {
        const { cartItems } = get();
        return cartItems.some((item) => item.id === id);
      },

      getItemQuantity: (id: string) => {
        const { cartItems } = get();
        const item = cartItems.find((item) => item.id === id);
        return item?.quantity || 0;
      },

      setLoaded: (loaded: boolean) => {
        set({ isLoaded: loaded });
      },
    }),
    {
      name: "medical-cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Set loaded to true after rehydration
        if (state) {
          state.setLoaded(true);
        }
      },
    }
  )
);

// Custom hook that maintains the same interface as your original hook
export function useCart() {
  const store = useCartStore();

  return {
    cartItems: store.cartItems,
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getCartTotal: store.getCartTotal,
    getCartCount: store.getCartCount,
    isInCart: store.isInCart,
    getItemQuantity: store.getItemQuantity,
    isLoaded: store.isLoaded,
  };
}

export { useCartStore };
