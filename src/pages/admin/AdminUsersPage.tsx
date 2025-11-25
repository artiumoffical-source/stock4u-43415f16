import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2, RefreshCw, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לטעון את המנהלים',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAdmin = async (adminId: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק משתמש מנהל זה?')) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', adminId);

      if (error) throw error;

      toast({
        title: 'הצלחה',
        description: 'המנהל נמחק בהצלחה',
      });
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו למחוק את המנהל',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ניהול מנהלים</h1>
          <p className="text-muted-foreground">ניהול משתמשי מערכת וסמכויות</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchAdmins} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            רענן
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            הוסף מנהל
          </Button>
        </div>
      </div>

      {/* Admins Table */}
      <Card className="p-6">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>שם משתמש</TableHead>
                <TableHead>כניסה אחרונה</TableHead>
                <TableHead>ניסיונות כושלים</TableHead>
                <TableHead>נעול עד</TableHead>
                <TableHead>תאריך יצירה</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{admin.username}</TableCell>
                  <TableCell>
                    {admin.last_login 
                      ? format(new Date(admin.last_login), 'dd/MM/yyyy HH:mm')
                      : 'מעולם לא'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={admin.failed_attempts > 0 ? 'destructive' : 'secondary'}>
                      {admin.failed_attempts || 0}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {admin.locked_until ? (
                      <Badge variant="destructive">
                        {format(new Date(admin.locked_until), 'dd/MM/yyyy HH:mm')}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{format(new Date(admin.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteAdmin(admin.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {admins.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            לא נמצאו מנהלים
          </div>
        )}
      </Card>
    </div>
  );
}
