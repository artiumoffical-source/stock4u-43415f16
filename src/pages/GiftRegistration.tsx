import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Gift, Star, User, Phone, Mail, MapPin, CreditCard } from "lucide-react";
import { giftRegistrationValidation } from "@/lib/validation";

interface GiftData {
  id: string;
  order_number: string;
  sender_name: string;
  recipient_name: string;
  recipient_email: string;
  personal_message?: string;
  selected_stocks: Array<{
    symbol: string;
    name: string;
    amount: number;
  }>;
  total_amount: number;
  delivery_date?: string;
}

export default function GiftRegistration() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [giftData, setGiftData] = useState<GiftData | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    address: "",
    phone: "",
    email: "",
  });

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast({
        title: "שגיאה",
        description: "קישור לא תקין",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    fetchGiftData();
  }, [token]);

  const fetchGiftData = async () => {
    try {
      setLoading(true);
      
      // Call edge function to verify token and get gift data
      const { data, error } = await supabase.functions.invoke('get-gift-details', {
        body: { token }
      });

      if (error) throw error;
      
      if (!data.success) {
        toast({
          title: "שגיאה",
          description: data.message || "המתנה לא נמצאה",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setGiftData(data.gift);
      setFormData(prev => ({
        ...prev,
        fullName: data.gift.recipient_name,
        email: data.gift.recipient_email,
      }));
    } catch (error: any) {
      console.error("Error fetching gift data:", error);
      toast({
        title: "שגיאה",
        description: "שגיאה בטעינת נתוני המתנה",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate and sanitize all form inputs
      const validatedData = giftRegistrationValidation.parse(formData);

      const { data, error } = await supabase.functions.invoke('register-gift-recipient', {
        body: {
          token,
          registrationData: validatedData
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "הרשמה הושלמה!",
          description: "פרטיך נרשמו בהצלחה. המתנה תהיה זמינה בקרוב בחשבונך.",
        });
        navigate("/");
      } else {
        throw new Error(data.message || "שגיאה בהרשמה");
      }
    } catch (error: any) {
      console.error("Error registering:", error);
      
      if (error.errors) {
        // Zod validation errors
        const firstError = error.errors[0];
        toast({
          title: "שגיאה בנתונים",
          description: firstError?.message || "אנא בדוק שהנתונים תקינים",
          variant: "destructive",
        });
      } else {
        toast({
          title: "שגיאה",
          description: error.message || "שגיאה בהרשמה, אנא נסה שוב",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">טוען נתוני המתנה...</p>
        </div>
      </div>
    );
  }

  if (!giftData) {
    return null;
  }

  const stocksList = giftData.selected_stocks
    .map(stock => `${stock.symbol} (${stock.amount} מניות)`)
    .join(', ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Gift Display Card */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-white text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Gift className="h-8 w-8" />
                <Star className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold mb-2">🎁 איזה כיף!</h1>
              <h2 className="text-2xl font-semibold">קיבלת מתנת מניות!</h2>
            </div>
            
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">פרטי המתנה</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">שולח המתנה</p>
                        <p className="text-muted-foreground">{giftData.sender_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">מספר הזמנה</p>
                        <p className="text-muted-foreground">{giftData.order_number}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">המניות שקיבלת</h3>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="font-medium text-accent mb-2">מניות: {stocksList}</p>
                    <p className="text-2xl font-bold text-primary">
                      ערך כולל: ₪{giftData.total_amount.toLocaleString()}
                    </p>
                  </div>
                  
                  {giftData.personal_message && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="font-medium text-muted-foreground mb-2">הודעה מ{giftData.sender_name}:</p>
                      <p className="italic">"{giftData.personal_message}"</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-primary">השלמת הרשמה</CardTitle>
              <CardDescription className="text-center">
                על פי החוק, נדרש לרשום פרטים אישיים לפתיחת חשבון מניות
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">שם מלא *</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                        className="pr-10"
                        placeholder="הכנס שם מלא"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">תעודת זהות *</Label>
                    <div className="relative">
                      <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="idNumber"
                        type="text"
                        required
                        value={formData.idNumber}
                        onChange={(e) => setFormData(prev => ({...prev, idNumber: e.target.value}))}
                        className="pr-10"
                        placeholder="הכנס מספר תעודת זהות"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">טלפון *</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                        className="pr-10"
                        placeholder="הכנס מספר טלפון"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">אימייל *</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                        className="pr-10"
                        placeholder="הכנס כתובת אימייל"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">כתובת מלאה *</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({...prev, address: e.target.value}))}
                      className="pr-10 min-h-[80px]"
                      placeholder="הכנס כתובת מלאה (רחוב, מספר בית, עיר, מיקוד)"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    המידע שלך מאובטח ומוגן. נשתמש בו רק לצורך פתיחת חשבון המניות שלך בהתאם לחוק.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      מרשם...
                    </>
                  ) : (
                    "השלמת הרשמה וקבלת המתנה"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}