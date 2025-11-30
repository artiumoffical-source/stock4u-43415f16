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
  _timestamp?: number;
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
  deliveryMethods: ["mobile"],
};

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [giftData, setGiftData] = useState<GiftData>(defaultGiftData);

  // Load data from localStorage on mount with expiration check
  useEffect(() => {
    const savedData = localStorage.getItem("giftData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
        
        // Check if data is older than 7 days
        if (parsedData._timestamp && Date.now() - parsedData._timestamp > sevenDaysMs) {
          localStorage.removeItem('giftData');
        } else {
          setGiftData({ ...defaultGiftData, ...parsedData });
        }
      } catch (error) {
        localStorage.removeItem('giftData');
      }
    }
  }, []);

  // Save data to localStorage whenever it changes with timestamp
  useEffect(() => {
    const dataWithTimestamp = { ...giftData, _timestamp: Date.now() };
    localStorage.setItem("giftData", JSON.stringify(dataWithTimestamp));
  }, [giftData]);

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