import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string; // Unique ID for each cart entry (allows duplicates of same stock)
  symbol: string;
  name: string;
  amount: number;
  logo?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateItemAmount: (id: string, amount: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "stock4u_cart";

// Generate unique ID for cart items
const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Validate and ensure all items have IDs
          if (Array.isArray(parsed)) {
            return parsed.map(item => ({
              ...item,
              id: item.id || generateUniqueId(),
              amount: Number(item.amount) || 0,
            }));
          }
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
      }
    }
    return [];
  });

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cartItems]);

  // Add item with unique ID (allows duplicates of same stock symbol)
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const numAmount = Number(item.amount) || 0;
    if (numAmount <= 0) return;

    const newItem: CartItem = {
      ...item,
      id: generateUniqueId(),
      amount: numAmount,
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // Remove by unique ID (not by symbol)
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Update amount by unique ID with math safety
  const updateItemAmount = (id: string, amount: number) => {
    const numAmount = Number(amount) || 0;
    
    if (numAmount <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, amount: numAmount } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Derived values with math safety
  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemAmount,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
