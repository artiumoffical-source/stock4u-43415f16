import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGift } from "@/contexts/GiftContext";

const Cart = () => {
  const { giftData } = useGift();

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>סל הקניות</CardTitle>
          </CardHeader>
          <CardContent>
            {giftData.selectedStocks.length > 0 ? (
              <div className="space-y-4">
                {giftData.selectedStocks.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center p-4 border rounded">
                    <span>{stock.name} ({stock.symbol})</span>
                    <span>₪{stock.amount}</span>
                  </div>
                ))}
                <Link to="/gift-design">
                  <Button className="w-full bg-stock4u-blue hover:bg-stock4u-dark-blue">
                    המשך לעיצוב המתנה
                  </Button>
                </Link>
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