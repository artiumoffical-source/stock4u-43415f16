import React, { createContext, useContext, useState, useEffect } from "react";

interface GiftData {
  selectedStocks: Array<{
    id: string; // Unique ID for each stock entry
    symbol: string;
    name: string;
    amount: number;
    price?: number;
  }>;
  selectedCard: string | null;
  greetingMessage: string;
  recipientDetails: {
    name: string;
    email: string;
    deliveryDate: string;
  };
  senderName: string;
  senderEmail: string;
  sendingMethod?: string;
  selectedDate?: {
    day: string;
    month: string;
    year: string;
  };
  selectedTime?: {
    hour: string;
    minute: string;
  };
  recipients?: Array<{
    id: string;
    name: string;
    phone: string;
    email: string;
  }>;
  deliveryMethods?: string[];
  uploadedImage?: string;
  companyLogo?: string;
  hasLogo?: boolean;
}

interface GiftContextType {
  giftData: GiftData;
  updateGiftData: (updates: Partial<GiftData>) => void;
  addStock: (stock: { symbol: string; name: string; amount: number }) => void;
  removeStock: (id: string) => void;
  updateStockAmount: (id: string, amount: number) => void;
  resetGiftData: () => void;
}

const defaultGiftData: GiftData = {
  selectedStocks: [],
  selectedCard: "lightblue",
  greetingMessage: "",
  recipientDetails: {
    name: "",
    email: "",
    deliveryDate: "",
  },
  senderName: "",
  senderEmail: "",
  sendingMethod: "immediately",
  selectedDate: {
    day: "",
    month: "",
    year: "",
  },
  selectedTime: {
    hour: "",
    minute: "",
  },
  recipients: [],
  deliveryMethods: ["email"],
};

const GIFT_STORAGE_KEY = "stock4u_gift_stocks";

// Generate unique ID for stock entries
const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [giftData, setGiftData] = useState<GiftData>(() => {
    // Hydrate selected stocks from localStorage on mount
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(GIFT_STORAGE_KEY);
        if (saved) {
          const parsedStocks = JSON.parse(saved);
          if (Array.isArray(parsedStocks)) {
            return {
              ...defaultGiftData,
              selectedStocks: parsedStocks.map(stock => ({
                ...stock,
                id: stock.id || generateUniqueId(),
                amount: Number(stock.amount) || 0,
              })),
            };
          }
        }
      } catch (e) {
        console.error("Failed to parse gift stocks from localStorage:", e);
      }
    }
    return defaultGiftData;
  });

  // Persist selected stocks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(GIFT_STORAGE_KEY, JSON.stringify(giftData.selectedStocks));
    } catch (e) {
      console.error("Failed to save gift stocks to localStorage:", e);
    }
  }, [giftData.selectedStocks]);

  const updateGiftData = (updates: Partial<GiftData>) => {
    setGiftData((prev) => ({ ...prev, ...updates }));
  };

  // Add stock with unique ID (allows duplicates)
  const addStock = (stock: {
    symbol: string;
    name: string;
    amount: number;
  }) => {
    const numAmount = Number(stock.amount) || 0;
    if (numAmount <= 0) return;

    const newStock = {
      ...stock,
      id: generateUniqueId(),
      amount: numAmount,
    };

    setGiftData((prev) => ({
      ...prev,
      selectedStocks: [...prev.selectedStocks, newStock],
    }));
  };

  // Remove by unique ID
  const removeStock = (id: string) => {
    setGiftData((prev) => ({
      ...prev,
      selectedStocks: prev.selectedStocks.filter((s) => s.id !== id),
    }));
  };

  // Update amount by unique ID with math safety
  const updateStockAmount = (id: string, amount: number) => {
    const numAmount = Number(amount) || 0;
    
    if (numAmount <= 0) {
      removeStock(id);
      return;
    }
    
    setGiftData((prev) => ({
      ...prev,
      selectedStocks: prev.selectedStocks.map((stock) =>
        stock.id === id ? { ...stock, amount: numAmount } : stock,
      ),
    }));
  };

  const resetGiftData = () => {
    setGiftData(defaultGiftData);
    try {
      localStorage.removeItem(GIFT_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear gift stocks from localStorage:", e);
    }
  };

  return (
    <GiftContext.Provider
      value={{
        giftData,
        updateGiftData,
        addStock,
        removeStock,
        updateStockAmount,
        resetGiftData,
      }}
    >
      {children}
    </GiftContext.Provider>
  );
};

export const useGift = () => {
  const context = useContext(GiftContext);
  if (context === undefined) {
    throw new Error("useGift must be used within a GiftProvider");
  }
  return context;
};