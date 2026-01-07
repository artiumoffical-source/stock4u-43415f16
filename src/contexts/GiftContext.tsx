import React, { createContext, useContext, useState, useEffect } from "react";

interface GiftData {
  selectedStocks: Array<{
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
  removeStock: (symbol: string) => void;
  updateStockAmount: (symbol: string, amount: number) => void;
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

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [giftData, setGiftData] = useState<GiftData>(defaultGiftData);

  const updateGiftData = (updates: Partial<GiftData>) => {
    setGiftData((prev) => ({ ...prev, ...updates }));
  };

  const addStock = (stock: {
    symbol: string;
    name: string;
    amount: number;
  }) => {
    setGiftData((prev) => ({
      ...prev,
      selectedStocks: [
        ...prev.selectedStocks.filter((s) => s.symbol !== stock.symbol),
        stock,
      ],
    }));
  };

  const removeStock = (symbol: string) => {
    setGiftData((prev) => ({
      ...prev,
      selectedStocks: prev.selectedStocks.filter((s) => s.symbol !== symbol),
    }));
  };

  const updateStockAmount = (symbol: string, amount: number) => {
    setGiftData((prev) => ({
      ...prev,
      selectedStocks: prev.selectedStocks.map((stock) =>
        stock.symbol === symbol ? { ...stock, amount } : stock,
      ),
    }));
  };

  const resetGiftData = () => {
    setGiftData(defaultGiftData);
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