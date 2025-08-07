import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGift } from "@/contexts/GiftContext";
import { CreditCard, Shield, Lock, Check, ArrowLeft } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { giftData } = useGift();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
  });

  const totalAmount = giftData.selectedStocks.reduce((sum, stock) => sum + stock.amount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment
    navigate("/payment-success");
  };

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <div className="relative w-full h-64 bg-gradient-to-r from-[hsl(var(--stock4u-blue))] to-[hsl(var(--stock4u-blue-light))] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(var(--stock4u-gold))]">
            השלמת רכישה
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl leading-relaxed">
            השלם את פרטי התשלום שלך בצורה מאובטחת
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="w-16 h-1 bg-white/20"></div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="w-16 h-1 bg-white/20"></div>
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--stock4u-gold))] flex items-center justify-center text-[hsl(var(--stock4u-blue))] font-bold">
              3
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Payment Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[hsl(var(--stock4u-gold))]" />
                  פרטי תשלום
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">שם פרטי</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">שם משפחה</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">כתובת אימייל</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="cardNumber">מספר כרטיס אשראי</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">תוקף</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="billingAddress">כתובת לחיוב</Label>
                    <Input
                      id="billingAddress"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">עיר</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">מיקוד</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    SSL מאובטח
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    הצפנה 256-bit
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    PCI תואם
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle>סיכום הזמנה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {giftData.selectedStocks.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                    </div>
                    <p className="font-medium">₪{stock.amount}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>סה"כ לתשלום:</span>
                  <span className="text-[hsl(var(--stock4u-gold))]">₪{totalAmount}</span>
                </div>

                <div className="space-y-3 mt-6">
                  <Button 
                    onClick={handleSubmit}
                    className="w-full bg-[hsl(var(--stock4u-gold))] hover:bg-[hsl(var(--stock4u-gold-dark))] text-white py-3"
                    size="lg"
                  >
                    השלם תשלום - ₪{totalAmount}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/gift-design")}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    חזור לעיצוב המתנה
                  </Button>
                </div>

                <div className="text-xs text-center text-muted-foreground mt-4">
                  בלחיצה על "השלם תשלום" אתה מסכים לתנאי השימוש ומדיניות הפרטיות שלנו
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

export default Checkout;