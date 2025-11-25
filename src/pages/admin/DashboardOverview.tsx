import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StatCard } from '@/components/admin/StatCard';
import { Package, Gift, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalGifts: number;
  topSender: string;
  topRecipient: string;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch orders statistics
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*');

      if (ordersError) throw ordersError;

      // Fetch gift registrations
      const { data: gifts, error: giftsError } = await supabase
        .from('gift_registrations')
        .select('*');

      if (giftsError) throw giftsError;

      // Calculate stats
      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;
      const totalGifts = gifts?.length || 0;

      // Find top sender (most orders)
      const senderCounts: Record<string, number> = {};
      orders?.forEach(order => {
        const sender = order.buyer_name || 'Unknown';
        senderCounts[sender] = (senderCounts[sender] || 0) + 1;
      });
      const topSender = Object.keys(senderCounts).sort((a, b) => senderCounts[b] - senderCounts[a])[0] || 'N/A';

      // Find top recipient
      const recipientCounts: Record<string, number> = {};
      orders?.forEach(order => {
        const recipient = order.recipient_name || 'Unknown';
        recipientCounts[recipient] = (recipientCounts[recipient] || 0) + 1;
      });
      const topRecipient = Object.keys(recipientCounts).sort((a, b) => recipientCounts[b] - recipientCounts[a])[0] || 'N/A';

      setStats({
        totalOrders,
        totalRevenue,
        totalGifts,
        topSender,
        topRecipient,
      });

      // Get 5 most recent orders
      const recent = orders
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5) || [];
      setRecentOrders(recent);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="סה״כ הזמנות"
          value={stats?.totalOrders || 0}
          icon={Package}
          description="כל ההזמנות במערכת"
        />
        <StatCard
          title="סה״כ הכנסות"
          value={`₪${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={DollarSign}
          description="סכום כולל מכל ההזמנות"
        />
        <StatCard
          title="סה״כ מתנות"
          value={stats?.totalGifts || 0}
          icon={Gift}
          description="מתנות שנרשמו"
        />
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="שולח מוביל"
          value={stats?.topSender || 'N/A'}
          icon={TrendingUp}
          description="הלקוח עם הכי הרבה הזמנות"
        />
        <StatCard
          title="מקבל מוביל"
          value={stats?.topRecipient || 'N/A'}
          icon={Users}
          description="המקבל עם הכי הרבה מתנות"
        />
      </div>

      {/* Recent Orders Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">הזמנות אחרונות</h2>
            <p className="text-sm text-muted-foreground">5 ההזמנות האחרונות במערכת</p>
          </div>
          <button
            onClick={() => navigate('/admin/orders')}
            className="text-sm text-primary hover:underline"
          >
            צפה בהכל →
          </button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>מספר הזמנה</TableHead>
                <TableHead>קונה</TableHead>
                <TableHead>מקבל</TableHead>
                <TableHead>סכום</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead>תאריך</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow 
                  key={order.id}
                  className="hover:bg-muted/30 cursor-pointer"
                  onClick={() => navigate('/admin/orders')}
                >
                  <TableCell className="font-medium">{order.order_number}</TableCell>
                  <TableCell>{order.buyer_name}</TableCell>
                  <TableCell>{order.recipient_name || '-'}</TableCell>
                  <TableCell>₪{Number(order.total_amount).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(order.created_at), 'dd/MM/yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
