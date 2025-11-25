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
import { Search, Eye, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [entityFilter, setEntityFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, actionFilter, entityFilter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לטעון את הלוגים',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = [...logs];

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.entity_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.user_type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (actionFilter !== 'all') {
      filtered = filtered.filter((log) => log.action === actionFilter);
    }

    if (entityFilter !== 'all') {
      filtered = filtered.filter((log) => log.entity_type === entityFilter);
    }

    setFilteredLogs(filtered);
  };

  const getActionBadge = (action: string) => {
    const variants: Record<string, any> = {
      INSERT: 'default',
      UPDATE: 'secondary',
      DELETE: 'destructive',
    };
    return <Badge variant={variants[action] || 'secondary'}>{action}</Badge>;
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
        <h1 className="text-2xl font-bold">יומן פעולות</h1>
        <p className="text-muted-foreground">מעקב אחר כל הפעולות במערכת</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חיפוש..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="סוג פעולה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הפעולות</SelectItem>
              <SelectItem value="INSERT">יצירה</SelectItem>
              <SelectItem value="UPDATE">עדכון</SelectItem>
              <SelectItem value="DELETE">מחיקה</SelectItem>
            </SelectContent>
          </Select>
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="סוג ישות" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הישויות</SelectItem>
              <SelectItem value="orders">הזמנות</SelectItem>
              <SelectItem value="gift_registrations">מתנות</SelectItem>
              <SelectItem value="admin_users">מנהלים</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchLogs} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            רענן
          </Button>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="p-6">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>פעולה</TableHead>
                <TableHead>סוג ישות</TableHead>
                <TableHead>מזהה ישות</TableHead>
                <TableHead>סוג משתמש</TableHead>
                <TableHead>תאריך</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/30">
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell className="font-medium">{log.entity_type}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {log.entity_id?.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.user_type || 'system'}</Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(log.created_at), 'dd/MM/yyyy HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedLog(log);
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

        {filteredLogs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            לא נמצאו לוגים
          </div>
        )}
      </Card>

      {/* View Log Dialog */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>פרטי לוג</DialogTitle>
            <DialogDescription>מידע מלא על הפעולה</DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">פעולה</p>
                  <p className="text-sm">{getActionBadge(selectedLog.action)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">סוג ישות</p>
                  <p className="text-sm font-medium">{selectedLog.entity_type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">מזהה ישות</p>
                  <p className="text-xs font-mono">{selectedLog.entity_id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">סוג משתמש</p>
                  <p className="text-sm">
                    <Badge variant="outline">{selectedLog.user_type || 'system'}</Badge>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">תאריך</p>
                  <p className="text-sm">
                    {format(new Date(selectedLog.created_at), 'dd/MM/yyyy HH:mm:ss')}
                  </p>
                </div>
              </div>
              {selectedLog.details && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">פרטים</p>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
                    {JSON.stringify(selectedLog.details, null, 2)}
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
