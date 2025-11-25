import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Settings, Palette, Mail, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'הגדרות נשמרו',
      description: 'ההגדרות עודכנו בהצלחה',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">הגדרות מערכת</h1>
        <p className="text-muted-foreground">ניהול הגדרות כלליות של המערכת</p>
      </div>

      {/* Card Colors */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">עיצוב כרטיסים</h2>
            <p className="text-sm text-muted-foreground">הגדרות צבעים וערכות נושא לכרטיסי מתנה</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="card-blue">כרטיס כחול</Label>
              <Input
                id="card-blue"
                type="color"
                defaultValue="#3B82F6"
                className="h-12 cursor-pointer"
              />
            </div>
            <div>
              <Label htmlFor="card-red">כרטיס אדום</Label>
              <Input
                id="card-red"
                type="color"
                defaultValue="#EF4444"
                className="h-12 cursor-pointer"
              />
            </div>
            <div>
              <Label htmlFor="card-yellow">כרטיס צהוב</Label>
              <Input
                id="card-yellow"
                type="color"
                defaultValue="#F59E0B"
                className="h-12 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Email Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">הגדרות דוא"ל</h2>
            <p className="text-sm text-muted-foreground">תצורת שליחת מיילים אוטומטיים</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="sender-email">כתובת שולח</Label>
            <Input
              id="sender-email"
              type="email"
              placeholder="noreply@stock4u.co.il"
              defaultValue="noreply@stock4u.co.il"
            />
          </div>
          <div>
            <Label htmlFor="sender-name">שם שולח</Label>
            <Input
              id="sender-name"
              placeholder="Stock4U"
              defaultValue="Stock4U"
            />
          </div>
        </div>
      </Card>

      {/* API Keys */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">מפתחות API</h2>
            <p className="text-sm text-muted-foreground">צפייה במפתחות API (לקריאה בלבד)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Supabase URL</Label>
            <Input
              type="text"
              value="https://ggquxuidarjnayqkhthv.supabase.co"
              readOnly
              className="bg-muted"
            />
          </div>
          <div>
            <Label>Supabase Anon Key</Label>
            <Input
              type="password"
              value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              readOnly
              className="bg-muted"
            />
          </div>
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">הגדרות כלליות</h2>
            <p className="text-sm text-muted-foreground">הגדרות מערכת נוספות</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="site-name">שם האתר</Label>
            <Input
              id="site-name"
              defaultValue="Stock4U - מתנות מניות"
            />
          </div>
          <div>
            <Label htmlFor="support-email">דוא"ל תמיכה</Label>
            <Input
              id="support-email"
              type="email"
              defaultValue="support@stock4u.co.il"
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Settings className="h-4 w-4" />
          שמור הגדרות
        </Button>
      </div>
    </div>
  );
}
