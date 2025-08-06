import React, { createContext, useContext, useState, useEffect } from "react";

interface GiftData {
  selectedStocks: Array<{
    symbol: string;
    name: string;
    amount: number;
  }>;
  selectedCard: string | null;
  greetingMessage: string;
  recipientDetails: {
    name: string;
    email: string;
    deliveryDate: string;
  };
  senderName: string;
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
}

interface GiftContextType {
  giftData: GiftData;
  updateGiftData: (updates: Partial<GiftData>) => void;
  addStock: (stock: { symbol: string; name: string; amount: number }) => void;
  removeStock: (symbol: string) => void;
  updateStockAmount: (symbol: string, amount: number) => void;
  resetGiftData: () => void;
}

const defaultGiftData: GiftData = {
  selectedStocks: [],
  selectedCard: null,
  greetingMessage: "",
  recipientDetails: {
    name: "",
    email: "",
    deliveryDate: "",
  },
  senderName: "",
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
};

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [giftData, setGiftData] = useState<GiftData>(defaultGiftData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("giftData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setGiftData({ ...defaultGiftData, ...parsedData });
      } catch (error) {
        console.error("Error parsing saved gift data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("giftData", JSON.stringify(giftData));
  }, [giftData]);

  const updateGiftData = (updates: Partial<GiftData>) => {
    setGiftData(prev => ({ ...prev, ...updates }));
  };

  const addStock = (stock: { symbol: string; name: string; amount: number }) => {
    setGiftData(prev => ({
      ...prev,
      selectedStocks: [...prev.selectedStocks, stock]
    }));
  };

  const removeStock = (symbol: string) => {
    setGiftData(prev => ({
      ...prev,
      selectedStocks: prev.selectedStocks.filter(stock => stock.symbol !== symbol)
    }));
  };

  const updateStockAmount = (symbol: string, amount: number) => {
    setGiftData(prev => ({
      ...prev,
      selectedStocks: prev.selectedStocks.map(stock =>
        stock.symbol === symbol ? { ...stock, amount } : stock
      )
    }));
  };

  const resetGiftData = () => {
    setGiftData(defaultGiftData);
    localStorage.removeItem("giftData");
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