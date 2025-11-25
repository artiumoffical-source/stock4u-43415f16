import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Eye, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Customer {
  name: string;
  email: string;
  giftsSent: number;
  giftsReceived: number;
  totalSpent: number;
  lastActivity: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      // Fetch all orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*');

      if (ordersError) throw ordersError;

      // Fetch all gift registrations
      const { data: gifts, error: giftsError } = await supabase
        .from('gift_registrations')
        .select('*');

      if (giftsError) throw giftsError;

      // Build customer map
      const customerMap = new Map<string, Customer>();

      // Process buyers (senders)
      orders?.forEach((order) => {
        const email = order.buyer_email;
        if (!email) return;

        if (!customerMap.has(email)) {
          customerMap.set(email, {
            name: order.buyer_name || 'Unknown',
            email,
            giftsSent: 0,
            giftsReceived: 0,
            totalSpent: 0,
            lastActivity: order.created_at,
          });
        }

        const customer = customerMap.get(email)!;
        customer.giftsSent += 1;
        customer.totalSpent += Number(order.total_amount || 0);
        
        if (new Date(order.created_at) > new Date(customer.lastActivity)) {
          customer.lastActivity = order.created_at;
        }
      });

      // Process recipients
      orders?.forEach((order) => {
        const email = order.recipient_email;
        if (!email) return;

        if (!customerMap.has(email)) {
          customerMap.set(email, {
            name: order.recipient_name || 'Unknown',
            email,
            giftsSent: 0,
            giftsReceived: 0,
            totalSpent: 0,
            lastActivity: order.created_at,
          });
        }

        const customer = customerMap.get(email)!;
        customer.giftsReceived += 1;
      });

      const customerList = Array.from(customerMap.values());
      setCustomers(customerList);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לטעון את הלקוחות',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
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
        <h1 className="text-2xl font-bold">ניהול לקוחות</h1>
        <p className="text-muted-foreground">מידע מרוכז על כל הלקוחות במערכת</p>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חיפוש לפי שם או אימייל..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Button onClick={fetchCustomers} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            רענן
          </Button>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="p-6">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>שם</TableHead>
                <TableHead>אימייל</TableHead>
                <TableHead>מתנות שנשלחו</TableHead>
                <TableHead>מתנות שהתקבלו</TableHead>
                <TableHead>סה"כ הוצאות</TableHead>
                <TableHead>פעילות אחרונה</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, idx) => (
                <TableRow key={idx} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.giftsSent}</TableCell>
                  <TableCell>{customer.giftsReceived}</TableCell>
                  <TableCell className="font-medium">
                    ₪{customer.totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell>{new Date(customer.lastActivity).toLocaleDateString('he-IL')}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setViewModalOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            לא נמצאו לקוחות
          </div>
        )}
      </Card>

      {/* View Customer Dialog */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>פרטי לקוח</DialogTitle>
            <DialogDescription>מידע מרוכז על הלקוח</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">שם</p>
                <p className="text-lg font-semibold">{selectedCustomer.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">אימייל</p>
                <p className="text-sm">{selectedCustomer.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">מתנות שנשלחו</p>
                  <p className="text-2xl font-bold">{selectedCustomer.giftsSent}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">מתנות שהתקבלו</p>
                  <p className="text-2xl font-bold">{selectedCustomer.giftsReceived}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">סה"כ הוצאות</p>
                <p className="text-2xl font-bold text-primary">
                  ₪{selectedCustomer.totalSpent.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">פעילות אחרונה</p>
                <p className="text-sm">{new Date(selectedCustomer.lastActivity).toLocaleString('he-IL')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
