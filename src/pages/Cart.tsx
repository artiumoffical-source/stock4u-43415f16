import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StepHero } from "@/components/StepHero";
import { useGift } from "@/contexts/GiftContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

const Cart = () => {
  const { giftData, removeStock, updateStockAmount } = useGift();

  const handleAmountChange = (symbol: string, newAmount: number) => {
    if (newAmount > 0) {
      updateStockAmount(symbol, newAmount);
    } else {
      removeStock(symbol);
    }
  };

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      <StepHero currentStep={1} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>סל הקניות</CardTitle>
          </CardHeader>
          <CardContent>
            {giftData.selectedStocks.length > 0 ? (
              <div className="space-y-4">
                {giftData.selectedStocks.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-sm text-muted-foreground">({stock.symbol})</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAmountChange(stock.symbol, stock.amount - 50)}
                          className="w-8 h-8 rounded-full border border-input flex items-center justify-center hover:bg-accent"
                        >
                          <Minus size={16} />
                        </button>
                        <Input
                          type="number"
                          value={stock.amount}
                          onChange={(e) => handleAmountChange(stock.symbol, parseInt(e.target.value) || 0)}
                          className="w-20 h-8 text-center"
                          min="0"
                        />
                        <button
                          onClick={() => handleAmountChange(stock.symbol, stock.amount + 50)}
                          className="w-8 h-8 rounded-full border border-input flex items-center justify-center hover:bg-accent"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-medium w-16 text-left">₪{stock.amount}</span>
                      <button
                        onClick={() => removeStock(stock.symbol)}
                        className="text-destructive hover:text-destructive/80 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="space-y-3">
                  <div className="flex justify-between items-center font-semibold text-lg border-t pt-3">
                    <span>סה"כ:</span>
                    <span>₪{giftData.selectedStocks.reduce((total, stock) => total + stock.amount, 0)}</span>
                  </div>
                  <div className="flex gap-3">
                    <Link to="/stock-selection" className="flex-1">
                      <Button variant="outline" className="w-full">
                        חזור לבחירת מניות
                      </Button>
                    </Link>
                    <Link to="/order-details" className="flex-1">
                      <Button className="w-full">
                        המשך לפרטים וברכה
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-8">הסל ריק</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;