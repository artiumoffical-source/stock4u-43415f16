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
import { Search, Eye, Trash2, RefreshCw, Gift } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GiftItem {
  symbol: string;
  name: string;
  amount: number;
}

interface GiftRecord {
  id: string;
  sender_name: string;
  sender_email: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone?: string;
  gift_items: GiftItem[];
  total_amount: number;
  status: string;
  payment_status: string;
  delivery_method: string;
  delivery_timing: string;
  scheduled_at?: string;
  card_last_four?: string;
  created_at: string;
  updated_at: string;
}

export default function GiftsPage() {
  const [gifts, setGifts] = useState<GiftRecord[]>([]);
  const [filteredGifts, setFilteredGifts] = useState<GiftRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedGift, setSelectedGift] = useState<GiftRecord | null>(null);
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
        .from('gifts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Parse gift_items from JSONB
      const parsedData = (data || []).map((gift) => ({
        ...gift,
        gift_items: Array.isArray(gift.gift_items) 
          ? (gift.gift_items as unknown as GiftItem[])
          : []
      })) as GiftRecord[];
      
      setGifts(parsedData);
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
          gift.sender_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gift.recipient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gift.recipient_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gift.sender_email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((gift) => gift.status === statusFilter);
    }

    setFilteredGifts(filtered);
  };

  const updateGiftStatus = async (giftId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('gifts')
        .update({ status: newStatus })
        .eq('id', giftId);

      if (error) throw error;

      toast({
        title: 'הצלחה',
        description: 'הסטטוס עודכן בהצלחה',
      });
      fetchGifts();
      setViewModalOpen(false);
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
    if (!confirm('האם אתה בטוח שברצונך למחוק מתנה זו?')) return;

    try {
      const { error } = await supabase
        .from('gifts')
        .delete()
        .eq('id', giftId);

      if (error) throw error;

      toast({
        title: 'הצלחה',
        description: 'המתנה נמחקה בהצלחה',
      });
      fetchGifts();
    } catch (error) {
      console.error('Error deleting gift:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו למחוק את המתנה',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      draft: { variant: 'secondary', label: 'טיוטה' },
      pending: { variant: 'outline', label: 'ממתין' },
      sent: { variant: 'default', label: 'נשלח' },
      delivered: { variant: 'default', label: 'נמסר' },
      completed: { variant: 'default', label: 'הושלם' },
      cancelled: { variant: 'destructive', label: 'בוטל' },
    };
    const config = statusConfig[status] || { variant: 'secondary' as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      pending: { variant: 'outline', label: 'ממתין' },
      paid: { variant: 'default', label: 'שולם' },
      failed: { variant: 'destructive', label: 'נכשל' },
      refunded: { variant: 'secondary', label: 'הוחזר' },
    };
    const config = statusConfig[status] || { variant: 'secondary' as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getDeliveryMethodLabel = (method: string) => {
    return method === 'whatsapp' ? 'וואטסאפ' : 'אימייל';
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
        <p className="text-muted-foreground">צפייה וניהול של כל המתנות במערכת</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חיפוש לפי שם שולח, מקבל, אימייל..."
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
              <SelectItem value="draft">טיוטה</SelectItem>
              <SelectItem value="pending">ממתין</SelectItem>
              <SelectItem value="sent">נשלח</SelectItem>
              <SelectItem value="delivered">נמסר</SelectItem>
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
                <TableHead>שולח</TableHead>
                <TableHead>מקבל</TableHead>
                <TableHead>מניות</TableHead>
                <TableHead>סכום</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead>תשלום</TableHead>
                <TableHead>משלוח</TableHead>
                <TableHead>תאריך</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGifts.map((gift) => (
                <TableRow key={gift.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    <div>
                      <p>{gift.sender_name}</p>
                      <p className="text-xs text-muted-foreground">{gift.sender_email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{gift.recipient_name}</p>
                      <p className="text-xs text-muted-foreground">{gift.recipient_email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {gift.gift_items.slice(0, 3).map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item.symbol}
                        </Badge>
                      ))}
                      {gift.gift_items.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{gift.gift_items.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>₪{Number(gift.total_amount).toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(gift.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(gift.payment_status)}</TableCell>
                  <TableCell>{getDeliveryMethodLabel(gift.delivery_method)}</TableCell>
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
            <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>לא נמצאו מתנות</p>
          </div>
        )}
      </Card>

      {/* View Gift Dialog */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>פרטי מתנה</DialogTitle>
            <DialogDescription>מידע מלא על המתנה</DialogDescription>
          </DialogHeader>
          {selectedGift && (
            <div className="space-y-6">
              {/* Sender Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">פרטי שולח</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">שם</p>
                    <p className="text-sm">{selectedGift.sender_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">אימייל</p>
                    <p className="text-sm">{selectedGift.sender_email}</p>
                  </div>
                </div>
              </div>

              {/* Recipient Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">פרטי מקבל</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">שם</p>
                    <p className="text-sm">{selectedGift.recipient_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">אימייל</p>
                    <p className="text-sm">{selectedGift.recipient_email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">טלפון</p>
                    <p className="text-sm">{selectedGift.recipient_phone || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Gift Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">מניות במתנה</h3>
                <div className="space-y-2">
                  {selectedGift.gift_items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.symbol}</p>
                        <p className="text-sm text-muted-foreground">{item.name}</p>
                      </div>
                      <p className="font-bold">₪{item.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="font-semibold">סה״כ</p>
                  <p className="font-bold text-lg">₪{Number(selectedGift.total_amount).toLocaleString()}</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">פרטי משלוח</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">שיטת משלוח</p>
                    <p className="text-sm">{getDeliveryMethodLabel(selectedGift.delivery_method)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">תזמון</p>
                    <p className="text-sm">{selectedGift.delivery_timing === 'now' ? 'מיידי' : 'מתוזמן'}</p>
                  </div>
                  {selectedGift.scheduled_at && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">תאריך משלוח</p>
                      <p className="text-sm">{format(new Date(selectedGift.scheduled_at), 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">פרטי תשלום</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">סטטוס תשלום</p>
                    {getPaymentStatusBadge(selectedGift.payment_status)}
                  </div>
                  {selectedGift.card_last_four && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">כרטיס</p>
                      <p className="text-sm">**** {selectedGift.card_last_four}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">סטטוס</h3>
                <div className="flex items-center gap-4">
                  <Select
                    value={selectedGift.status}
                    onValueChange={(value) => updateGiftStatus(selectedGift.id, value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">טיוטה</SelectItem>
                      <SelectItem value="pending">ממתין</SelectItem>
                      <SelectItem value="sent">נשלח</SelectItem>
                      <SelectItem value="delivered">נמסר</SelectItem>
                      <SelectItem value="completed">הושלם</SelectItem>
                      <SelectItem value="cancelled">בוטל</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Timestamps */}
              <div className="text-xs text-muted-foreground border-t pt-4">
                <p>נוצר: {format(new Date(selectedGift.created_at), 'dd/MM/yyyy HH:mm')}</p>
                <p>עודכן: {format(new Date(selectedGift.updated_at), 'dd/MM/yyyy HH:mm')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
