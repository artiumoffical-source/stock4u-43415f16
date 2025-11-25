import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Eye, Trash2, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function GiftsPage() {
  const [gifts, setGifts] = useState<any[]>([]);
  const [filteredGifts, setFilteredGifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGifts();
  }, []);

  useEffect(() => {
    filterGifts();
  }, [gifts, searchTerm, statusFilter]);

  const fetchGifts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gift_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGifts(data || []);
    } catch (error) {
      console.error('Error fetching gifts:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לטעון את המתנות',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterGifts = () => {
    let filtered = [...gifts];

    if (searchTerm) {
      filtered = filtered.filter(
        (gift) =>
          gift.recipient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gift.recipient_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gift.token?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((gift) => gift.registration_status === statusFilter);
    }

    setFilteredGifts(filtered);
  };

  const updateGiftStatus = async (giftId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('gift_registrations')
        .update({ registration_status: newStatus })
        .eq('id', giftId);

      if (error) throw error;

      toast({
        title: 'הצלחה',
        description: 'הסטטוס עודכן בהצלחה',
      });
      fetchGifts();
    } catch (error) {
      console.error('Error updating gift:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לעדכן את הסטטוס',
        variant: 'destructive',
      });
    }
  };

  const deleteGift = async (giftId: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק רישום מתנה זה?')) return;

    try {
      const { error } = await supabase
        .from('gift_registrations')
        .delete()
        .eq('id', giftId);

      if (error) throw error;

      toast({
        title: 'הצלחה',
        description: 'הרישום נמחק בהצלחה',
      });
      fetchGifts();
    } catch (error) {
      console.error('Error deleting gift:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו למחוק את הרישום',
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
      <div>
        <h1 className="text-2xl font-bold">ניהול מתנות</h1>
        <p className="text-muted-foreground">צפייה וניהול של כל רישומי המתנות</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חיפוש לפי שם מקבל, אימייל, טוקן..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="סינון לפי סטטוס" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הסטטוסים</SelectItem>
              <SelectItem value="pending">ממתין</SelectItem>
              <SelectItem value="completed">הושלם</SelectItem>
              <SelectItem value="cancelled">בוטל</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchGifts} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            רענן
          </Button>
        </div>
      </Card>

      {/* Gifts Table */}
      <Card className="p-6">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>טוקן</TableHead>
                <TableHead>שם מקבל</TableHead>
                <TableHead>אימייל מקבל</TableHead>
                <TableHead>טלפון</TableHead>
                <TableHead>סטטוס רישום</TableHead>
                <TableHead>סטטוס KYC</TableHead>
                <TableHead>תאריך יצירה</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGifts.map((gift) => (
                <TableRow key={gift.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs">{gift.token?.substring(0, 8)}...</TableCell>
                  <TableCell className="font-medium">{gift.recipient_name}</TableCell>
                  <TableCell>{gift.recipient_email}</TableCell>
                  <TableCell>{gift.recipient_phone || '-'}</TableCell>
                  <TableCell>
                    <Select
                      value={gift.registration_status}
                      onValueChange={(value) => updateGiftStatus(gift.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">ממתין</SelectItem>
                        <SelectItem value="completed">הושלם</SelectItem>
                        <SelectItem value="cancelled">בוטל</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={gift.kyc_status === 'approved' ? 'default' : 'secondary'}>
                      {gift.kyc_status || 'pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(gift.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedGift(gift);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteGift(gift.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredGifts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            לא נמצאו מתנות
          </div>
        )}
      </Card>

      {/* View Gift Dialog */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>פרטי מתנה</DialogTitle>
            <DialogDescription>מידע מלא על רישום המתנה</DialogDescription>
          </DialogHeader>
          {selectedGift && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">טוקן</p>
                  <p className="text-xs font-mono bg-muted p-2 rounded">{selectedGift.token}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID הזמנה</p>
                  <p className="text-xs font-mono">{selectedGift.order_id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">שם מקבל</p>
                  <p className="text-sm">{selectedGift.recipient_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">אימייל מקבל</p>
                  <p className="text-sm">{selectedGift.recipient_email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">טלפון</p>
                  <p className="text-sm">{selectedGift.recipient_phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ת.ז.</p>
                  <p className="text-sm">{selectedGift.id_number || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">כתובת</p>
                  <p className="text-sm">{selectedGift.address || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">סטטוס רישום</p>
                  <p className="text-sm">
                    <Badge>{selectedGift.registration_status}</Badge>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">סטטוס KYC</p>
                  <p className="text-sm">
                    <Badge variant={selectedGift.kyc_status === 'approved' ? 'default' : 'secondary'}>
                      {selectedGift.kyc_status || 'pending'}
                    </Badge>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">תאריך יצירה</p>
                  <p className="text-sm">{format(new Date(selectedGift.created_at), 'dd/MM/yyyy HH:mm')}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
