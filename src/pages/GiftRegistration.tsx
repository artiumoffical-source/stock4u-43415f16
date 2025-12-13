import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Gift, Star, User, Phone, Mail, MapPin, CreditCard, Calendar, Building } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { he } from "date-fns/locale";
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
  const [uploadedFileFront, setUploadedFileFront] = useState<File | null>(null);
  const [uploadedFileBack, setUploadedFileBack] = useState<File | null>(null);
  const [isUploadingFront, setIsUploadingFront] = useState(false);
  const [isUploadingBack, setIsUploadingBack] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    city: "",
    street: "",
    houseNumber: "",
    country: "ישראל",
    consentActingOwnBehalf: false,
    consentInfoTrue: false,
    consentTermsAccepted: false,
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

  const handleFileUpload = async (file: File, side: 'front' | 'back') => {
    if (!token) return;
    
    const setIsUploading = side === 'front' ? setIsUploadingFront : setIsUploadingBack;
    const setUploadedFile = side === 'front' ? setUploadedFileFront : setUploadedFileBack;
    
    setIsUploading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      const fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64 = reader.result?.toString().split(',')[1];
          if (base64) resolve(base64);
          else reject(new Error('Failed to read file'));
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Upload via edge function for secure server-side handling
      const { data, error } = await supabase.functions.invoke('upload-kyc-document', {
        body: {
          token,
          fileName: `${side}_${file.name}`,
          fileData,
          fileType: file.type,
          documentSide: side
        }
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.message || 'Upload failed');
      
      setUploadedFile(file);
      toast({
        title: "הקובץ הועלה בהצלחה",
        description: side === 'front' ? "צד קדמי נשמר" : "צד אחורי נשמר",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "שגיאה בהעלאת הקובץ",
        description: error.message || "אנא נסה שוב",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileRemove = async (side: 'front' | 'back') => {
    const uploadedFile = side === 'front' ? uploadedFileFront : uploadedFileBack;
    const setUploadedFile = side === 'front' ? setUploadedFileFront : setUploadedFileBack;
    
    if (uploadedFile && token) {
      try {
        // Try to remove the file from storage
        const fileExtension = uploadedFile.name.split('.').pop();
        const fileName = `${token}/${side}_${Date.now()}.${fileExtension}`;
        
        await supabase.storage
          .from('kyc-documents')
          .remove([fileName]);
      } catch (error) {
        console.error('Error removing file:', error);
      }
    }
    setUploadedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFileFront || !uploadedFileBack) {
      toast({
        variant: "destructive",
        title: "חסרים מסמכי זיהוי",
        description: "אנא העלה את שני צדי המסמך המזהה (קדמי ואחורי)",
      });
      return;
    }
    
    setSubmitting(true);

    try {
      // Validate and sanitize all form inputs
      const validatedData = giftRegistrationValidation.parse({
        ...formData,
        dateOfBirth: dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : '',
      });

      const { data, error } = await supabase.functions.invoke('register-gift-recipient', {
        body: {
          token,
          registrationData: validatedData,
          documentFileNameFront: uploadedFileFront.name,
          documentFileNameBack: uploadedFileBack.name,
          documentType: uploadedFileFront.type
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "הרשמה הושלמה!",
          description: "פרטיך ומסמך הזהות נרשמו בהצלחה. המתנה תהיה זמינה בקרוב בחשבונך.",
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
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Gift Display Card */}
          <Card className="mb-4 sm:mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent p-4 sm:p-6 text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8" />
                <Star className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">🎁 איזה כיף!</h1>
              <h2 className="text-xl sm:text-2xl font-semibold">קיבלת מתנת מניות!</h2>
            </div>
            
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary">פרטי המתנה</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">שולח המתנה</p>
                        <p className="text-muted-foreground text-sm">{giftData.sender_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">מספר הזמנה</p>
                        <p className="text-muted-foreground text-sm">{giftData.order_number}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary">המניות שקיבלת</h3>
                  <div className="bg-accent/10 p-3 sm:p-4 rounded-lg">
                    <p className="font-medium text-accent mb-2 text-sm sm:text-base">מניות: {stocksList}</p>
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      ערך כולל: ₪{giftData.total_amount.toLocaleString()}
                    </p>
                  </div>
                  
                  {giftData.personal_message && (
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-muted rounded-lg">
                      <p className="font-medium text-muted-foreground mb-2 text-sm">הודעה מ{giftData.sender_name}:</p>
                      <p className="italic text-sm sm:text-base">"{giftData.personal_message}"</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card>
            <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
              <CardTitle className="text-center text-primary text-lg sm:text-xl">השלמת הרשמה</CardTitle>
              <CardDescription className="text-center text-sm">
                על פי החוק, נדרש לרשום פרטים אישיים לפתיחת חשבון מניות
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="fullName" className="text-sm">שם מלא *</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                        className="pr-10 h-11 sm:h-10 text-base sm:text-sm"
                        placeholder="הכנס שם מלא"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="idNumber" className="text-sm">תעודת זהות *</Label>
                    <div className="relative">
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="idNumber"
                        type="text"
                        required
                        value={formData.idNumber}
                        onChange={(e) => setFormData(prev => ({...prev, idNumber: e.target.value}))}
                        className="pr-10 h-11 sm:h-10 text-base sm:text-sm"
                        placeholder="הכנס מספר תעודת זהות"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="phone" className="text-sm">טלפון *</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                        className="pr-10 h-11 sm:h-10 text-base sm:text-sm"
                        placeholder="הכנס מספר טלפון"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-sm">אימייל *</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                        className="pr-10 h-11 sm:h-10 text-base sm:text-sm"
                        placeholder="הכנס כתובת אימייל"
                      />
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-sm">תאריך לידה *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-right h-11 sm:h-10 text-base sm:text-sm",
                          !dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="ml-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "dd/MM/yyyy") : "בחר תאריך לידה"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        locale={he}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                        className="pointer-events-auto"
                        captionLayout="dropdown-buttons"
                        fromYear={1920}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Address Section */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    כתובת מגורים
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="city" className="text-sm">עיר *</Label>
                      <div className="relative">
                        <Building className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                          className="pr-10 h-11 sm:h-10 text-base sm:text-sm"
                          placeholder="הכנס שם עיר"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="street" className="text-sm">רחוב *</Label>
                      <Input
                        id="street"
                        type="text"
                        required
                        value={formData.street}
                        onChange={(e) => setFormData(prev => ({...prev, street: e.target.value}))}
                        className="h-11 sm:h-10 text-base sm:text-sm"
                        placeholder="הכנס שם רחוב"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="houseNumber" className="text-sm">מספר בית *</Label>
                      <Input
                        id="houseNumber"
                        type="text"
                        required
                        value={formData.houseNumber}
                        onChange={(e) => setFormData(prev => ({...prev, houseNumber: e.target.value}))}
                        className="h-11 sm:h-10 text-base sm:text-sm"
                        placeholder="מספר"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="country" className="text-sm">מדינה</Label>
                    <Input
                      id="country"
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({...prev, country: e.target.value}))}
                      className="h-11 sm:h-10 text-base sm:text-sm"
                      placeholder="ישראל"
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-primary">מסמכי זיהוי *</h3>
                  <p className="text-sm text-muted-foreground text-right">
                    אנא העלה תמונה או סריקה של שני צדי תעודת הזהות / דרכון / רישיון נהיגה
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Front Side */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-right font-medium text-sm">צד קדמי *</Label>
                      <FileUpload
                        onFileSelect={(file) => handleFileUpload(file, 'front')}
                        onFileRemove={() => handleFileRemove('front')}
                        uploadedFile={uploadedFileFront}
                        isUploading={isUploadingFront}
                        acceptedTypes={["image/jpeg", "image/png", "image/jpg", "application/pdf"]}
                        maxSizeMB={5}
                      />
                    </div>
                    
                    {/* Back Side */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-right font-medium text-sm">צד אחורי *</Label>
                      <FileUpload
                        onFileSelect={(file) => handleFileUpload(file, 'back')}
                        onFileRemove={() => handleFileRemove('back')}
                        uploadedFile={uploadedFileBack}
                        isUploading={isUploadingBack}
                        acceptedTypes={["image/jpeg", "image/png", "image/jpg", "application/pdf"]}
                        maxSizeMB={5}
                      />
                    </div>
                  </div>
                </div>

                {/* Consents */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-primary">הצהרות והסכמות</h3>
                  
                  <div className="space-y-3 sm:space-y-4 bg-muted/30 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consentActingOwnBehalf"
                        checked={formData.consentActingOwnBehalf}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({...prev, consentActingOwnBehalf: checked === true}))
                        }
                        className="h-5 w-5 mt-0.5"
                      />
                      <Label htmlFor="consentActingOwnBehalf" className="text-sm leading-relaxed cursor-pointer">
                        אני מאשר/ת שאני פועל/ת מטעם עצמי ולא עבור צד שלישי *
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consentInfoTrue"
                        checked={formData.consentInfoTrue}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({...prev, consentInfoTrue: checked === true}))
                        }
                        className="h-5 w-5 mt-0.5"
                      />
                      <Label htmlFor="consentInfoTrue" className="text-sm leading-relaxed cursor-pointer">
                        אני מאשר/ת שכל המידע שמסרתי נכון ומדויק *
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consentTermsAccepted"
                        checked={formData.consentTermsAccepted}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({...prev, consentTermsAccepted: checked === true}))
                        }
                        className="h-5 w-5 mt-0.5"
                      />
                      <Label htmlFor="consentTermsAccepted" className="text-sm leading-relaxed cursor-pointer">
                        אני מסכים/ה לתנאי השימוש ומדיניות הפרטיות *
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">
                    המידע שלך מאובטח ומוגן. נשתמש בו רק לצורך פתיחת חשבון המניות שלך בהתאם לחוק.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 sm:h-11 text-base sm:text-sm" 
                  size="lg"
                  disabled={
                    submitting || 
                    isUploadingFront || 
                    isUploadingBack ||
                    !uploadedFileFront ||
                    !uploadedFileBack ||
                    !formData.consentActingOwnBehalf ||
                    !formData.consentInfoTrue ||
                    !formData.consentTermsAccepted
                  }
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