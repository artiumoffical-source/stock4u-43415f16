import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
import { Search, Eye, Trash2, RefreshCw, CheckCircle, XCircle, FileText, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface GiftRegistration {
  id: string;
  token: string;
  order_id: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone?: string;
  id_number?: string;
  address?: string;
  registration_status: string;
  kyc_status?: string;
  created_at: string;
  registered_at?: string;
  full_name_hebrew?: string;
  date_of_birth?: string;
  city?: string;
  street?: string;
  house_number?: string;
  country?: string;
  consent_acting_own_behalf?: boolean;
  consent_info_true?: boolean;
  consent_terms_accepted?: boolean;
  kyc_started_at?: string;
  kyc_submitted_at?: string;
  kyc_rejection_reason?: string;
  id_document_url?: string;
  id_document_type?: string;
}

export default function GiftsPage() {
  const [gifts, setGifts] = useState<GiftRegistration[]>([]);
  const [filteredGifts, setFilteredGifts] = useState<GiftRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedGift, setSelectedGift] = useState<GiftRegistration | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [loadingDocument, setLoadingDocument] = useState(false);
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
      setGifts((data as GiftRegistration[]) || []);
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

  const updateGiftStatus = async (giftId: string, newStatus: string, additionalData?: Record<string, unknown>) => {
    try {
      const updateData: Record<string, unknown> = { 
        registration_status: newStatus,
        ...additionalData
      };

      if (newStatus === 'approved') {
        updateData.kyc_status = 'approved';
        updateData.kyc_reviewed_at = new Date().toISOString();
      } else if (newStatus === 'rejected') {
        updateData.kyc_status = 'rejected';
        updateData.kyc_reviewed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('gift_registrations')
        .update(updateData)
        .eq('id', giftId);

      if (error) throw error;

      toast({
        title: 'הצלחה',
        description: 'הסטטוס עודכן בהצלחה',
      });
      fetchGifts();
      setViewModalOpen(false);
      setRejectionReason('');
    } catch (error) {
      console.error('Error updating gift:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לעדכן את הסטטוס',
        variant: 'destructive',
      });
    }
  };

  const handleApprove = async () => {
    if (!selectedGift) return;
    await updateGiftStatus(selectedGift.id, 'approved');
  };

  const handleReject = async () => {
    if (!selectedGift) return;
    if (!rejectionReason.trim()) {
      toast({
        title: 'שגיאה',
        description: 'יש להזין סיבת דחייה',
        variant: 'destructive',
      });
      return;
    }
    await updateGiftStatus(selectedGift.id, 'rejected', { 
      kyc_rejection_reason: rejectionReason 
    });
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

  const fetchDocumentUrl = async (giftId: string) => {
    setLoadingDocument(true);
    setDocumentUrl(null);
    try {
      const { data, error } = await supabase.functions.invoke('get-kyc-document-url', {
        body: { giftId }
      });

      if (error) throw error;
      if (data?.success && data?.url) {
        setDocumentUrl(data.url);
      }
    } catch (error) {
      console.error('Error fetching document URL:', error);
      toast({
        title: 'שגיאה',
        description: 'לא הצלחנו לטעון את המסמך',
        variant: 'destructive',
      });
    } finally {
      setLoadingDocument(false);
    }
  };

  const openViewModal = (gift: GiftRegistration) => {
    setSelectedGift(gift);
    setViewModalOpen(true);
    setRejectionReason('');
    setDocumentUrl(null);
    if (gift.id_document_url) {
      fetchDocumentUrl(gift.id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      pending: { variant: 'secondary', label: 'ממתין' },
      started_kyc: { variant: 'outline', label: 'התחיל KYC' },
      submitted: { variant: 'default', label: 'הוגש' },
      under_review: { variant: 'outline', label: 'בבדיקה' },
      approved: { variant: 'default', label: 'אושר' },
      rejected: { variant: 'destructive', label: 'נדחה' },
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ניהול מתנות ו-KYC</h1>
        <p className="text-muted-foreground">צפייה וניהול של כל רישומי המתנות ואישורי KYC</p>
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
              <SelectItem value="submitted">הוגש</SelectItem>
              <SelectItem value="approved">אושר</SelectItem>
              <SelectItem value="rejected">נדחה</SelectItem>
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
                <TableHead>סטטוס</TableHead>
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
                  <TableCell>{getStatusBadge(gift.registration_status)}</TableCell>
                  <TableCell>
                    <Badge variant={gift.kyc_status === 'approved' ? 'default' : gift.kyc_status === 'rejected' ? 'destructive' : 'secondary'}>
                      {gift.kyc_status || 'pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(gift.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openViewModal(gift)}
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>פרטי מתנה ו-KYC</DialogTitle>
            <DialogDescription>מידע מלא על רישום המתנה ותהליך הזיהוי</DialogDescription>
          </DialogHeader>
          {selectedGift && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">פרטי מתנה</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">טוקן</p>
                    <p className="text-xs font-mono bg-muted p-2 rounded">{selectedGift.token}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ID הזמנה</p>
                    <p className="text-xs font-mono">{selectedGift.order_id}</p>
                  </div>
                </div>
              </div>

              {/* KYC Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">פרטי KYC</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">שם מלא</p>
                    <p className="text-sm">{selectedGift.full_name_hebrew || selectedGift.recipient_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">תעודת זהות</p>
                    <p className="text-sm">{selectedGift.id_number || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">תאריך לידה</p>
                    <p className="text-sm">{selectedGift.date_of_birth ? format(new Date(selectedGift.date_of_birth), 'dd/MM/yyyy') : '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">אימייל</p>
                    <p className="text-sm">{selectedGift.recipient_email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">טלפון</p>
                    <p className="text-sm">{selectedGift.recipient_phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">כתובת</p>
                    <p className="text-sm">
                      {selectedGift.street && selectedGift.house_number ? (
                        `${selectedGift.street} ${selectedGift.house_number}, ${selectedGift.city || ''}, ${selectedGift.country || ''}`
                      ) : (
                        selectedGift.address || '-'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Consents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">הסכמות</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    {selectedGift.consent_acting_own_behalf ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm">פועל מטעם עצמו</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedGift.consent_info_true ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm">מידע נכון</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedGift.consent_terms_accepted ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm">הסכמה לתנאים</span>
                  </div>
                </div>
              </div>

              {/* Document */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">מסמך מזהה</h3>
                {selectedGift.id_document_url ? (
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">מסמך הועלה</p>
                      <p className="text-xs text-muted-foreground">{selectedGift.id_document_type || 'Unknown type'}</p>
                    </div>
                    {loadingDocument ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                    ) : documentUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          צפה במסמך
                        </a>
                      </Button>
                    ) : (
                      <p className="text-sm text-muted-foreground">לא ניתן לטעון</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">לא הועלה מסמך</p>
                )}
              </div>

              {/* Status & Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">סטטוס וציר זמן</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">סטטוס רישום</p>
                    <div className="mt-1">{getStatusBadge(selectedGift.registration_status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">סטטוס KYC</p>
                    <Badge variant={selectedGift.kyc_status === 'approved' ? 'default' : selectedGift.kyc_status === 'rejected' ? 'destructive' : 'secondary'}>
                      {selectedGift.kyc_status || 'pending'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">נוצר</p>
                    <p className="text-sm">{format(new Date(selectedGift.created_at), 'dd/MM/yyyy HH:mm')}</p>
                  </div>
                  {selectedGift.kyc_started_at && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">התחיל KYC</p>
                      <p className="text-sm">{format(new Date(selectedGift.kyc_started_at), 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                  )}
                  {selectedGift.kyc_submitted_at && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">הוגש KYC</p>
                      <p className="text-sm">{format(new Date(selectedGift.kyc_submitted_at), 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                  )}
                  {selectedGift.registered_at && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">נרשם</p>
                      <p className="text-sm">{format(new Date(selectedGift.registered_at), 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                  )}
                </div>
                {selectedGift.kyc_rejection_reason && (
                  <div className="bg-destructive/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-destructive">סיבת דחייה:</p>
                    <p className="text-sm">{selectedGift.kyc_rejection_reason}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              {selectedGift.registration_status === 'submitted' && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">פעולות KYC</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>סיבת דחייה (אם רלוונטי)</Label>
                      <Textarea
                        placeholder="הזן סיבת דחייה..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedGift?.registration_status === 'submitted' && (
            <DialogFooter className="gap-2">
              <Button variant="destructive" onClick={handleReject} className="gap-2">
                <XCircle className="h-4 w-4" />
                דחה KYC
              </Button>
              <Button onClick={handleApprove} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                אשר KYC
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}