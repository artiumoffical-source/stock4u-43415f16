import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, PartyPopper, Shield, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  firstName: z.string().min(2, "שם פרטי חייב להכיל לפחות 2 תווים").max(100),
  lastName: z.string().min(2, "שם משפחה חייב להכיל לפחות 2 תווים").max(100),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().regex(/^05\d{8}$/, "מספר טלפון ישראלי לא תקין"),
  address: z.string().min(5, "כתובת חייבת להכיל לפחות 5 תווים"),
  city: z.string().min(2, "עיר חייבת להכיל לפחות 2 תווים"),
  postalCode: z.string().min(2, "מיקוד נדרש").max(10),
  dob: z.date({ required_error: "תאריך לידה נדרש" }),
  taxId: z.string().regex(/^\d{9}$/, "תעודת זהות חייבת להכיל 9 ספרות"),
});

type FormValues = z.infer<typeof formSchema>;

const fields: { name: keyof FormValues; label: string; placeholder: string; type?: string }[] = [
  { name: "firstName", label: "שם פרטי", placeholder: "ישראל" },
  { name: "lastName", label: "שם משפחה", placeholder: "ישראלי" },
  { name: "email", label: "אימייל", placeholder: "email@example.com", type: "email" },
  { name: "phone", label: "מספר טלפון", placeholder: "0501234567", type: "tel" },
  { name: "address", label: "כתובת מגורים (רחוב ומספר)", placeholder: "הרצל 1" },
  { name: "city", label: "עיר", placeholder: "תל אביב" },
  { name: "postalCode", label: "מיקוד", placeholder: "6100000" },
  { name: "taxId", label: "מספר תעודת זהות", placeholder: "123456789" },
];

export default function ClaimStockGift() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", phone: "",
      address: "", city: "", postalCode: "", taxId: "",
    },
  });

  const filledCount = Object.keys(form.watch()).filter((key) => {
    const val = form.watch(key as keyof FormValues);
    return val && (typeof val === "string" ? val.length > 0 : true);
  }).length;
  const totalFields = 9;
  const progress = Math.round((filledCount / totalFields) * 100);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { data: result, error } = await supabase.functions.invoke("create-alpaca-account", {
        body: {
          userData: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            postalCode: data.postalCode,
            dob: format(data.dob, "yyyy-MM-dd"),
            taxId: data.taxId,
          },
        },
      });

      if (error) throw new Error(error.message);
      if (result && !result.success) throw new Error(result.error || "שגיאה לא ידועה");

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "אירעה שגיאה, נסו שוב מאוחר יותר");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md text-center border-0 shadow-xl">
          <CardContent className="pt-12 pb-10 space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-[hsl(142,71%,45%)]/10 flex items-center justify-center">
              <PartyPopper className="w-10 h-10 text-[hsl(142,71%,45%)]" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">מזל טוב! 🎉</h1>
            <p className="text-muted-foreground text-lg">חשבון ההשקעות שלך נוצר בהצלחה</p>
            <p className="text-sm text-muted-foreground">נעדכן אותך במייל ברגע שהחשבון יהיה מוכן לשימוש.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8 px-4" dir="rtl">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">מימוש מתנת מניות</h1>
          <p className="text-muted-foreground text-sm">מלא/י את הפרטים הבאים לפתיחת חשבון השקעות</p>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>התקדמות</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((f) => (
                  <FormField
                    key={f.name}
                    control={form.control}
                    name={f.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{f.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={f.placeholder}
                            type={f.type || "text"}
                            {...field}
                            value={field.value as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>תאריך לידה</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-right font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="ml-2 h-4 w-4" />
                              {field.value ? format(field.value, "yyyy-MM-dd") : "בחר/י תאריך"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {errorMessage && (
                  <p className="text-sm text-destructive font-medium text-center">{errorMessage}</p>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      יוצרים את החשבון...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="ml-2 h-5 w-5" />
                      אישור ופתיחת חשבון
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  הפרטים שלך מאובטחים ומוגנים בהתאם לתקנות הרגולציה הפיננסית
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
