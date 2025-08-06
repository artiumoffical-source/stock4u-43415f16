import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to SMS verification
    window.location.href = "/sms-verification";
  };

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md glass-effect">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">התחברות לחשבון</CardTitle>
            <CardDescription>הזינו את מספר הטלפון שלכם לקבלת קוד אימות</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">מספר טלפון</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="050-1234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pr-10"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-stock4u-blue hover:bg-stock4u-dark-blue text-white"
                disabled={!phoneNumber}
              >
                שלח קוד אימות
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                אין לכם חשבון?{" "}
                <Link 
                  to="/register" 
                  className="text-stock4u-blue hover:text-stock4u-dark-blue font-medium"
                >
                  הרשמו עכשיו
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;