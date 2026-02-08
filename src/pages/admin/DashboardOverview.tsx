import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StatCard } from '@/components/admin/StatCard';
import { Gift, DollarSign, TrendingUp, Users, Send } from 'lucide-react';
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
  gift_items: GiftItem[];
  total_amount: number;
  status: string;
  payment_status: string;
  delivery_method: string;
  created_at: string;
}

interface DashboardStats {
  totalGifts: number;
  totalRevenue: number;
  paidGifts: number;
  topSender: string;
  topRecipient: string;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentGifts, setRecentGifts] = useState<GiftRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch gifts from the new gifts table
      const { data: gifts, error: giftsError } = await supabase
        .from('gifts')
        .select('*');

      if (giftsError) throw giftsError;

      // Parse gift_items from JSONB
      const parsedGifts = (gifts || []).map((gift) => ({
        ...gift,
        gift_items: Array.isArray(gift.gift_items) 
          ? (gift.gift_items as unknown as GiftItem[])
          : []
      })) as GiftRecord[];

      // Calculate stats
      const totalGifts = parsedGifts.length;
      const totalRevenue = parsedGifts.reduce((sum, gift) => sum + Number(gift.total_amount || 0), 0);
      const paidGifts = parsedGifts.filter(gift => gift.payment_status === 'paid').length;

      // Find top sender (most gifts sent)
      const senderCounts: Record<string, number> = {};
      parsedGifts.forEach(gift => {
        const sender = gift.sender_name || 'Unknown';
        senderCounts[sender] = (senderCounts[sender] || 0) + 1;
      });
      const topSender = Object.keys(senderCounts).sort((a, b) => senderCounts[b] - senderCounts[a])[0] || 'N/A';

      // Find top recipient
      const recipientCounts: Record<string, number> = {};
      parsedGifts.forEach(gift => {
        const recipient = gift.recipient_name || 'Unknown';
        recipientCounts[recipient] = (recipientCounts[recipient] || 0) + 1;
      });
      const topRecipient = Object.keys(recipientCounts).sort((a, b) => recipientCounts[b] - recipientCounts[a])[0] || 'N/A';

      setStats({
        totalGifts,
        totalRevenue,
        paidGifts,
        topSender,
        topRecipient,
      });

      // Get 5 most recent gifts
      const recent = parsedGifts
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
      setRecentGifts(recent);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
          title="סה״כ מתנות"
          value={stats?.totalGifts || 0}
          icon={Gift}
          description="כל המתנות במערכת"
        />
        <StatCard
          title="סה״כ הכנסות"
          value={`₪${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={DollarSign}
          description="סכום כולל מכל המתנות"
        />
        <StatCard
          title="מתנות ששולמו"
          value={stats?.paidGifts || 0}
          icon={Send}
          description="מתנות עם תשלום מאושר"
        />
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="שולח מוביל"
          value={stats?.topSender || 'N/A'}
          icon={TrendingUp}
          description="השולח עם הכי הרבה מתנות"
        />
        <StatCard
          title="מקבל מוביל"
          value={stats?.topRecipient || 'N/A'}
          icon={Users}
          description="המקבל עם הכי הרבה מתנות"
        />
      </div>

      {/* Recent Gifts Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">מתנות אחרונות</h2>
            <p className="text-sm text-muted-foreground">5 המתנות האחרונות במערכת</p>
          </div>
          <button
            onClick={() => navigate('/admin/gifts')}
            className="text-sm text-primary hover:underline"
          >
            צפה בהכל →
          </button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>שולח</TableHead>
                <TableHead>מקבל</TableHead>
                <TableHead>מניות</TableHead>
                <TableHead>סכום</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead>תאריך</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentGifts.map((gift) => (
                <TableRow 
                  key={gift.id}
                  className="hover:bg-muted/30 cursor-pointer"
                  onClick={() => navigate('/admin/gifts')}
                >
                  <TableCell className="font-medium">{gift.sender_name}</TableCell>
                  <TableCell>{gift.recipient_name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {gift.gift_items.slice(0, 2).map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item.symbol}
                        </Badge>
                      ))}
                      {gift.gift_items.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{gift.gift_items.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>₪{Number(gift.total_amount).toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(gift.status)}</TableCell>
                  <TableCell>{format(new Date(gift.created_at), 'dd/MM/yyyy')}</TableCell>
                </TableRow>
              ))}
              {recentGifts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    אין מתנות עדיין
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
