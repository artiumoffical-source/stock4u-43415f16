import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SMSVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      // Navigate to stock selection
      navigate("/stock-selection");
    }
  };

  const handleResendCode = () => {
    // Resend SMS code logic
    console.log("Resending SMS code...");
  };

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md glass-effect">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">אימות SMS</CardTitle>
            <CardDescription>
              הזינו את הקוד בן 6 הספרות שנשלח אליכם ב-SMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-stock4u-blue hover:bg-stock4u-dark-blue text-white"
                disabled={otp.length !== 6}
              >
                אמת ולהמשיך
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                לא קיבלתם קוד?
              </p>
              <Button 
                variant="ghost" 
                onClick={handleResendCode}
                className="text-stock4u-blue hover:text-stock4u-dark-blue"
              >
                שלח שוב
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                to="/login" 
                className="text-sm text-muted-foreground hover:text-stock4u-blue"
              >
                חזור להתחברות
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default SMSVerification;