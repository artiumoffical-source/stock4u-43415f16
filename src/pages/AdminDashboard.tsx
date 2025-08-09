import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LogOut, Search, Filter, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

interface Order {
  id: string;
  order_number: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  recipient_name?: string;
  selected_stocks: any;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  personal_message?: string;
  sender_name?: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-portal-s4u');
    }
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (paymentStatusFilter !== 'all') {
        query = query.eq('payment_status', paymentStatusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      let filteredData = data || [];

      if (searchTerm) {
        filteredData = filteredData.filter(order => 
          order.buyer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.buyer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.buyer_phone?.includes(searchTerm) ||
          order.recipient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.order_number?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setOrders(filteredData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, statusFilter, paymentStatusFilter, searchTerm]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'new': { label: 'חדש', variant: 'secondary' as const },
      'processing': { label: 'בתהליך', variant: 'default' as const },
      'completed': { label: 'בוצע', variant: 'default' as const },
      'cancelled': { label: 'מבוטל', variant: 'destructive' as const }
    };

    const config = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: 'ממתין', variant: 'secondary' as const },
      'paid': { label: 'שולם', variant: 'default' as const },
      'failed': { label: 'נכשל', variant: 'destructive' as const },
      'refunded': { label: 'הוחזר', variant: 'outline' as const }
    };

    const config = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatStocks = (stocks: any) => {
    if (!stocks || !Array.isArray(stocks)) return '-';
    return stocks.map(stock => `${stock.symbol} (${stock.amount})`).join(', ');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">ניהול הזמנות</h1>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            התנתק
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              סינון וחיפוש
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="חפש לפי שם, אימייל, טלפון..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="סטטוס הזמנה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הסטטוסים</SelectItem>
                  <SelectItem value="new">חדש</SelectItem>
                  <SelectItem value="processing">בתהליך</SelectItem>
                  <SelectItem value="completed">בוצע</SelectItem>
                  <SelectItem value="cancelled">מבוטל</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="סטטוס תשלום" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל סטטוסי התשלום</SelectItem>
                  <SelectItem value="pending">ממתין</SelectItem>
                  <SelectItem value="paid">שולם</SelectItem>
                  <SelectItem value="failed">נכשל</SelectItem>
                  <SelectItem value="refunded">הוחזר</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={fetchOrders} disabled={loading} className="flex items-center gap-2">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                רענן
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>הזמנות ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>מספר הזמנה</TableHead>
                    <TableHead>מזמין</TableHead>
                    <TableHead>מקבל</TableHead>
                    <TableHead>מניות</TableHead>
                    <TableHead>סכום</TableHead>
                    <TableHead>סטטוס הזמנה</TableHead>
                    <TableHead>סטטוס תשלום</TableHead>
                    <TableHead>תאריך</TableHead>
                    <TableHead>פעולות</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        טוען הזמנות...
                      </TableCell>
                    </TableRow>
                  ) : orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        לא נמצאו הזמנות
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          {order.order_number}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.buyer_name}</div>
                            <div className="text-sm text-muted-foreground">{order.buyer_email}</div>
                            {order.buyer_phone && (
                              <div className="text-sm text-muted-foreground">{order.buyer_phone}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.recipient_name || 'לא צוין'}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {formatStocks(order.selected_stocks)}
                        </TableCell>
                        <TableCell>
                          ₪{order.total_amount?.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(order.status)}
                        </TableCell>
                        <TableCell>
                          {getPaymentStatusBadge(order.payment_status)}
                        </TableCell>
                        <TableCell>
                          {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm', { locale: he })}
                        </TableCell>
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
                              <SelectItem value="processing">בתהליך</SelectItem>
                              <SelectItem value="completed">בוצע</SelectItem>
                              <SelectItem value="cancelled">מבוטל</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}