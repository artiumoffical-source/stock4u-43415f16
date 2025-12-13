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

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label>תאריך לידה *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-right",
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
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    כתובת מגורים
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">עיר *</Label>
                      <div className="relative">
                        <Building className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                          className="pr-10"
                          placeholder="הכנס שם עיר"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street">רחוב *</Label>
                      <Input
                        id="street"
                        type="text"
                        required
                        value={formData.street}
                        onChange={(e) => setFormData(prev => ({...prev, street: e.target.value}))}
                        placeholder="הכנס שם רחוב"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="houseNumber">מספר בית *</Label>
                      <Input
                        id="houseNumber"
                        type="text"
                        required
                        value={formData.houseNumber}
                        onChange={(e) => setFormData(prev => ({...prev, houseNumber: e.target.value}))}
                        placeholder="מספר"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">מדינה</Label>
                    <Input
                      id="country"
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({...prev, country: e.target.value}))}
                      placeholder="ישראל"
                    />
                  </div>
                </div>

                {/* Document Upload - Front */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-primary">מסמכי זיהוי *</h3>
                  <p className="text-sm text-muted-foreground text-right">
                    אנא העלה תמונה או סריקה של שני צדי תעודת הזהות / דרכון / רישיון נהיגה
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Front Side */}
                    <div className="space-y-2">
                      <Label className="text-right font-medium">צד קדמי *</Label>
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
                    <div className="space-y-2">
                      <Label className="text-right font-medium">צד אחורי *</Label>
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
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-primary">הצהרות והסכמות</h3>
                  
                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consentActingOwnBehalf"
                        checked={formData.consentActingOwnBehalf}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({...prev, consentActingOwnBehalf: checked === true}))
                        }
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
                      />
                      <Label htmlFor="consentTermsAccepted" className="text-sm leading-relaxed cursor-pointer">
                        אני מסכים/ה לתנאי השימוש ומדיניות הפרטיות *
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="md:col-span-2 bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    המידע שלך מאובטח ומוגן. נשתמש בו רק לצורך פתיחת חשבון המניות שלך בהתאם לחוק.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:col-span-2" 
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