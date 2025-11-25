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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Eye, Edit, Trash2, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לטעון את ההזמנות',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.buyer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.buyer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.recipient_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'הצלחה',
        description: 'הסטטוס עודכן בהצלחה',
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לעדכן את הסטטוס',
        variant: 'destructive',
      });
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק הזמנה זו?')) return;

    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'הצלחה',
        description: 'ההזמנה נמחקה בהצלחה',
      });
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו למחוק את ההזמנה',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      new: 'secondary',
      processing: 'default',
      completed: 'default',
      cancelled: 'destructive',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
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
        <h1 className="text-2xl font-bold">ניהול הזמנות</h1>
        <p className="text-muted-foreground">צפייה וניהול של כל ההזמנות במערכת</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חיפוש לפי מספר הזמנה, שם קונה, אימייל..."
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
              <SelectItem value="new">חדש</SelectItem>
              <SelectItem value="processing">בטיפול</SelectItem>
              <SelectItem value="completed">הושלם</SelectItem>
              <SelectItem value="cancelled">בוטל</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchOrders} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            רענן
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="p-6">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>מספר הזמנה</TableHead>
                <TableHead>קונה</TableHead>
                <TableHead>אימייל קונה</TableHead>
                <TableHead>מקבל</TableHead>
                <TableHead>סכום</TableHead>
                <TableHead>כרטיס</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead>תאריך</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{order.order_number}</TableCell>
                  <TableCell>{order.buyer_name}</TableCell>
                  <TableCell>{order.buyer_email}</TableCell>
                  <TableCell>{order.recipient_name || '-'}</TableCell>
                  <TableCell className="font-medium">
                    ₪{Number(order.total_amount).toLocaleString()}
                  </TableCell>
                  <TableCell>{order.selected_card || '-'}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">חדש</SelectItem>
                        <SelectItem value="processing">בטיפול</SelectItem>
                        <SelectItem value="completed">הושלם</SelectItem>
                        <SelectItem value="cancelled">בוטל</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{format(new Date(order.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedOrder(order);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteOrder(order.id)}
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

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            לא נמצאו הזמנות
          </div>
        )}
      </Card>

      {/* View Order Dialog */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>פרטי הזמנה - {selectedOrder?.order_number}</DialogTitle>
            <DialogDescription>מידע מלא על ההזמנה</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">שם קונה</p>
                  <p className="text-sm">{selectedOrder.buyer_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">אימייל קונה</p>
                  <p className="text-sm">{selectedOrder.buyer_email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">טלפון קונה</p>
                  <p className="text-sm">{selectedOrder.buyer_phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ת.ז. קונה</p>
                  <p className="text-sm">{selectedOrder.buyer_id || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">שם מקבל</p>
                  <p className="text-sm">{selectedOrder.recipient_name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">אימייל מקבל</p>
                  <p className="text-sm">{selectedOrder.recipient_email || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">סכום כולל</p>
                  <p className="text-sm font-bold">₪{Number(selectedOrder.total_amount).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">כרטיס נבחר</p>
                  <p className="text-sm">{selectedOrder.selected_card || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">סטטוס</p>
                  <p className="text-sm">{getStatusBadge(selectedOrder.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">תאריך יצירה</p>
                  <p className="text-sm">{format(new Date(selectedOrder.created_at), 'dd/MM/yyyy HH:mm')}</p>
                </div>
              </div>
              {selectedOrder.personal_message && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">הודעה אישית</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedOrder.personal_message}</p>
                </div>
              )}
              {selectedOrder.selected_stocks && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">מניות שנבחרו</p>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto">
                    {JSON.stringify(selectedOrder.selected_stocks, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
