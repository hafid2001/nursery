import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DollarSign,
  Search,
  Download,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  X,
} from 'lucide-react';

const AdminPayments = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState(initialPayments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    family: '',
    amount: '',
    method: 'بطاقة ائتمان',
  });

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const collected = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const pending = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  const overdue = payments
    .filter((p) => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleRecordPayment = () => {
    const newPayment = {
      id: `INV-${String(payments.length + 1).padStart(3, '0')}`,
      family: paymentForm.family,
      amount: parseFloat(paymentForm.amount),
      dueDate: new Date().toLocaleDateString('ar-SA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      paidDate: new Date().toLocaleDateString('ar-SA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      status: 'paid',
      method: paymentForm.method,
    };
    setPayments([newPayment, ...payments]);
    toast({
      title: 'تم تسجيل الدفعة',
      description: `تم تسجيل دفعة من ${paymentForm.family}.`,
    });
    setIsRecordPaymentOpen(false);
    setPaymentForm({ family: '', amount: '', method: 'بطاقة ائتمان' });
  };

  const handleExport = () => {
    toast({
      title: 'بدأ التصدير',
      description: 'جاري تصدير بيانات المدفوعات...',
    });
    setTimeout(() => {
      toast({
        title: 'اكتمل التصدير',
        description: 'تم تحميل بيانات المدفوعات.',
      });
    }, 1500);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid':
        return 'مدفوع';
      case 'pending':
        return 'قيد الانتظار';
      case 'overdue':
        return 'متأخر';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              إدارة المدفوعات
            </h1>
            <p className="text-muted-foreground">
              تتبع الرسوم الدراسية والفواتير
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="w-4 h-4" />
              تصدير
            </Button>
            <Button
              className="gap-2 bg-admin hover:bg-admin/90 text-admin-foreground"
              onClick={() => setIsRecordPaymentOpen(true)}
            >
              <CreditCard className="w-4 h-4" />
              تسجيل دفعة
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    الإيرادات الشهرية
                  </p>
                  <p className="text-2xl font-bold">
                    {totalRevenue.toLocaleString()} ر.س
                  </p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8.5% من الشهر الماضي
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-admin/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-admin" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">المحصّل</p>
                  <p className="text-2xl font-bold text-success">
                    {collected.toLocaleString()} ر.س
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {totalRevenue > 0
                      ? ((collected / totalRevenue) * 100).toFixed(1)
                      : 0}
                    % محصّل
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">قيد الانتظار</p>
                  <p className="text-2xl font-bold text-warning">
                    {pending.toLocaleString()} ر.س
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payments.filter((p) => p.status === 'pending').length}{' '}
                    فاتورة
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متأخر</p>
                  <p className="text-2xl font-bold text-destructive">
                    {overdue.toLocaleString()} ر.س
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payments.filter((p) => p.status === 'overdue').length}{' '}
                    فاتورة
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالعائلة أو رقم الفاتورة..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="paid">مدفوع</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="overdue">متأخر</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || statusFilter !== 'all') && (
                <Button variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>المدفوعات الأخيرة ({filteredPayments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الفاتورة</TableHead>
                  <TableHead>العائلة</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>تاريخ الاستحقاق</TableHead>
                  <TableHead>تاريخ الدفع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>طريقة الدفع</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">
                      {payment.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {payment.family}
                    </TableCell>
                    <TableCell>{payment.amount.toLocaleString()} ر.س</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>{payment.paidDate || '-'}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          payment.status === 'paid'
                            ? 'bg-success'
                            : payment.status === 'pending'
                              ? 'bg-warning text-warning-foreground'
                              : 'bg-destructive'
                        }
                      >
                        {getStatusLabel(payment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.method || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Record Payment Dialog */}
      <Dialog open={isRecordPaymentOpen} onOpenChange={setIsRecordPaymentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تسجيل دفعة</DialogTitle>
            <DialogDescription>أدخل تفاصيل الدفعة.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="family">العائلة</Label>
              <Input
                id="family"
                value={paymentForm.family}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, family: e.target.value })
                }
                placeholder="مثال: عائلة العتيبي"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ (ر.س)</Label>
              <Input
                id="amount"
                type="number"
                value={paymentForm.amount}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, amount: e.target.value })
                }
                placeholder="مثال: 1250"
              />
            </div>
            <div className="space-y-2">
              <Label>طريقة الدفع</Label>
              <Select
                value={paymentForm.method}
                onValueChange={(v) =>
                  setPaymentForm({ ...paymentForm, method: v })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="بطاقة ائتمان">بطاقة ائتمان</SelectItem>
                  <SelectItem value="تحويل بنكي">تحويل بنكي</SelectItem>
                  <SelectItem value="نقداً">نقداً</SelectItem>
                  <SelectItem value="شيك">شيك</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRecordPaymentOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleRecordPayment}
            >
              تسجيل الدفعة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPayments;
