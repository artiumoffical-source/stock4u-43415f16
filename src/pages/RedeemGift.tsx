import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Gift, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StepHero } from "@/components/StepHero";

type TokenStatus = "loading" | "valid" | "invalid" | "error";

interface GiftDetails {
  id: string;
  order_id: string;
  recipient_name: string;
  recipient_email: string;
  registration_status: string;
  created_at: string;
}

export default function RedeemGift() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>("loading");
  const [giftDetails, setGiftDetails] = useState<GiftDetails | null>(null);

  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      console.log('[REDEEM_DEBUG] Token from URL:', token);
      
      if (!token) {
        console.log('[REDEEM_DEBUG] No token found in URL');
        setTokenStatus("invalid");
        return;
      }

      try {
        setTokenStatus("loading");
        console.log('[REDEEM_DEBUG] Calling get-gift-details edge function');
        
        // Use edge function to validate token and get gift details
        const { data, error } = await supabase.functions.invoke('get-gift-details', {
          body: { token }
        });

        console.log('[REDEEM_DEBUG] Response:', { data, error });

        if (error || !data?.success) {
          console.error('[REDEEM_DEBUG] Error validating token:', error || data?.message);
          setTokenStatus('invalid');
          return;
        }

        console.log('[REDEEM_DEBUG] Gift details received:', data.giftDetails);
        console.log('[REDEEM_DEBUG] Gift status:', data.giftDetails?.registration_status);
        
        setGiftDetails(data.giftDetails);
        setTokenStatus('valid');
      } catch (error) {
        console.error('[REDEEM_DEBUG] Exception:', error);
        setTokenStatus('error');
      }
    };

    validateToken();
  }, [token]);

  const handleStartKYC = () => {
    console.log('[REDEEM_DEBUG] Start KYC clicked, token:', token);
    if (token) {
      navigate(`/gift-registration?token=${token}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <StepHero currentStep={1} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-3xl mx-auto">
          {tokenStatus === "loading" && (
            <Card className="text-center">
              <CardContent className="py-12">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-lg text-muted-foreground">מאמת את פרטי המתנה...</p>
              </CardContent>
            </Card>
          )}

          {tokenStatus === "invalid" && (
            <Card className="border-destructive">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-destructive" />
                  <CardTitle>קישור לא תקין</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  הקישור שבו השתמשת אינו תקף או שכבר נוצל.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>סיבות אפשריות:</strong>
                  </p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>המתנה כבר מומשה בעבר</li>
                    <li>הקישור פג תוקף</li>
                    <li>הקישור לא הועתק כראוי</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  במידה ואתם מאמינים שמדובר בטעות, אנא פנו לשירות הלקוחות בכתובת{" "}
                  <a href="mailto:support@stock4u.co.il" className="text-primary hover:underline">
                    support@stock4u.co.il
                  </a>
                </p>
              </CardContent>
            </Card>
          )}

          {tokenStatus === "error" && (
            <Card className="border-warning">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-warning" />
                  <CardTitle>שגיאה בטעינת הנתונים</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  התרחשה שגיאה בעת ניסיון לטעון את פרטי המתנה. אנא נסו שוב מאוחר יותר.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                  נסה שוב
                </Button>
              </CardContent>
            </Card>
          )}

          {tokenStatus === "valid" && giftDetails && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gift className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">🎁 ברוכים הבאים!</CardTitle>
                      <CardDescription className="text-base">
                        קיבלת מתנת מניות מיוחדת
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">
                    שלום <strong>{giftDetails.recipient_name || "מקבל/ת המתנה"}</strong>,
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    קיבלת מתנה מיוחדת במניות! על מנת לקבל את המתנה ולממש אותה, 
                    עליך להשלים תהליך זיהוי (KYC) קצר בהתאם לדרישות הרגולציה הישראלית.
                  </p>
                </CardContent>
              </Card>

              {/* Trust Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    חשבון נאמנות מאובטח
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    ערך המתנה שלך מוחזק בחשבון נאמנות ייעודי על שמך. 
                    הכספים מאובטחים ומוגנים על פי חוק, ואינם נגישים לשום צד שלישי.
                  </p>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium">🔒 עד להשלמת תהליך הזיהוי:</p>
                    <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                      <li>הכספים נשמרים בנאמנות מאובטחת</li>
                      <li>לא ניתן להעביר או למשוך את הכספים על ידי אף אחד</li>
                      <li>אתה המוטב החוקי היחיד</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* KYC Process Info */}
              <Card>
                <CardHeader>
                  <CardTitle>תהליך הזיהוי (KYC)</CardTitle>
                  <CardDescription>חובה על פי חוק למניעת הלבנת הון</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    על מנת לקבל את המתנה, עליך להשלים תהליך זיהוי מלא בהתאם לדרישות הרגולציה הישראלית.
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium">מה נדרש ממך:</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>צילום תעודת זהות / דרכון בתוקף</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>אימות פרטים אישיים (שם, כתובת, טלפון)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>חתימה דיגיטלית על הצהרות רגולטוריות</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      ⏱️ זמני טיפול
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      התהליך הממוצע נמשך 2-5 ימי עסקים מרגע הגשת כל המסמכים הנדרשים.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Button */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="py-8 text-center space-y-4">
                  <p className="text-lg font-medium">מוכנים להתחיל?</p>
                  <Button 
                    onClick={handleStartKYC}
                    size="lg"
                    className="text-lg px-8 py-6 h-auto"
                  >
                    🎁 התחל תהליך זיהוי וקבלת המתנה
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    התהליך פשוט ומהיר - לוקח כ-10 דקות
                  </p>
                </CardContent>
              </Card>

              {/* Support Info */}
              <Card className="bg-muted/50">
                <CardContent className="py-6">
                  <p className="text-sm text-center text-muted-foreground">
                    <strong>זקוקים לעזרה?</strong>
                    <br />
                    📧 support@stock4u.co.il | 📞 03-1234567
                    <br />
                    שעות פעילות: ראשון-חמישי 9:00-18:00
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
