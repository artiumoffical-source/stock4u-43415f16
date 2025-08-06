import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Plus, Minus, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGift } from "@/contexts/GiftContext";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logo: string;
}

const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    logo: "🍎"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 345.67,
    change: -1.23,
    changePercent: -0.35,
    logo: "💻"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2756.34,
    change: 15.67,
    changePercent: 0.57,
    logo: "🔍"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 3234.56,
    change: -8.91,
    changePercent: -0.27,
    logo: "📦"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 867.45,
    change: 23.45,
    changePercent: 2.78,
    logo: "🚗"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 456.78,
    change: 12.34,
    changePercent: 2.78,
    logo: "🎮"
  }
];

const StockSelection = () => {
  const { giftData, addStock, removeStock, updateStockAmount } = useGift();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAmounts, setSelectedAmounts] = useState<{ [key: string]: number }>({});

  const filteredStocks = mockStocks.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStock = (stock: Stock) => {
    const amount = selectedAmounts[stock.symbol] || 100;
    addStock({
      symbol: stock.symbol,
      name: stock.name,
      amount: amount
    });
  };

  const handleRemoveStock = (symbol: string) => {
    removeStock(symbol);
    setSelectedAmounts(prev => {
      const newAmounts = { ...prev };
      delete newAmounts[symbol];
      return newAmounts;
    });
  };

  const handleAmountChange = (symbol: string, amount: number) => {
    setSelectedAmounts(prev => ({ ...prev, [symbol]: amount }));
  };

  const isStockSelected = (symbol: string) => {
    return giftData.selectedStocks.some(stock => stock.symbol === symbol);
  };

  const getTotalValue = () => {
    return giftData.selectedStocks.reduce((total, stock) => total + stock.amount, 0);
  };

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">בחירת מניות למתנה</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            בחרו מהמניות הפופולאריות ביותר והוסיפו אותן לסל הקניות שלכם
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-8">
              <Input
                type="text"
                placeholder="חפשו מניה לפי שם או סמל..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md"
              />
            </div>

            {/* Stocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStocks.map((stock) => (
                <Card key={stock.symbol} className="stock-card-hover">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{stock.logo}</div>
                        <div>
                          <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                          <CardDescription className="text-sm">{stock.name}</CardDescription>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-xl font-bold">${stock.price}</div>
                        <div className={`flex items-center gap-1 text-sm ${
                          stock.change > 0 ? 'text-gain' : 'text-loss'
                        }`}>
                          {stock.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {stock.changePercent > 0 ? '+' : ''}{stock.changePercent}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">סכום:</label>
                        <Input
                          type="number"
                          min="50"
                          step="50"
                          value={selectedAmounts[stock.symbol] || 100}
                          onChange={(e) => handleAmountChange(stock.symbol, parseInt(e.target.value) || 100)}
                          className="w-24"
                        />
                        <span className="text-sm text-muted-foreground">₪</span>
                      </div>
                      
                      {isStockSelected(stock.symbol) ? (
                        <Button
                          onClick={() => handleRemoveStock(stock.symbol)}
                          variant="outline"
                          className="w-full border-loss text-loss hover:bg-loss hover:text-white"
                        >
                          <Minus className="ml-2 h-4 w-4" />
                          הסר מהסל
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAddStock(stock)}
                          className="w-full bg-stock4u-blue hover:bg-stock4u-dark-blue text-white"
                        >
                          <Plus className="ml-2 h-4 w-4" />
                          הוסף לסל
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shopping Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  סל הקניות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {giftData.selectedStocks.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      הסל ריק
                    </p>
                  ) : (
                    <>
                      {giftData.selectedStocks.map((stock) => (
                        <div key={stock.symbol} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">₪{stock.amount}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveStock(stock.symbol)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between font-bold">
                          <span>סה"כ:</span>
                          <span>₪{getTotalValue()}</span>
                        </div>
                      </div>
                      
                      <Link to="/gift-design">
                        <Button className="w-full bg-stock4u-blue hover:bg-stock4u-dark-blue text-white">
                          המשך לעיצוב המתנה
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StockSelection;