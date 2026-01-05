import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  symbol: string;
  name: string;
  amount: number;
  logo?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (symbol: string) => void;
  updateItemAmount: (symbol: string, amount: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "stock4u_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.symbol === item.symbol);
      if (existing) {
        return prev.map((i) =>
          i.symbol === item.symbol ? { ...i, amount: i.amount + item.amount } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (symbol: string) => {
    setCartItems((prev) => prev.filter((i) => i.symbol !== symbol));
  };

  const updateItemAmount = (symbol: string, amount: number) => {
    if (amount <= 0) {
      removeFromCart(symbol);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.symbol === symbol ? { ...i, amount } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemAmount,
        clearCart,
        cartCount,
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
