import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { getPaymentsList } from '@/services/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Loading } from '@/components/ui/loading';
import { Empty } from '@/components/ui/empty';
import toast from 'react-hot-toast';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    parentName: '',
    amount: '',
    method: 'credit_card',
  });

  const filteredPayments = payments;


  const fetchPayments = () => {
    setLoading(true);
    getPaymentsList(
      statusFilter,
      currentPage,
      searchQuery,
      {
        onSuccess: (data) => {
          if (currentPage === 1) {
            setPayments(data.data);
          } else {
            setPayments((prevPayments) => [...prevPayments, ...data.data]);
          }
          setTotalCount(data.totalCount);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
          setLoading(false);
        },
        onError: (err) => {
          toast.error('فشل تحميل المدفوعات.');
          setPayments([])
          setLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    fetchPayments();
  }, [statusFilter, currentPage, searchQuery]);

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
        </div>
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                  placeholder="البحث بالاسم أو رقم الفاتورة..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on new search
                  }}
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
            <CardTitle>المدفوعات الأخيرة ({totalCount})</CardTitle>
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
                      {payment.invoiceNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {payment.parentName}
                    </TableCell>
                    <TableCell>{payment.amount.toLocaleString()} ر.س</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>{payment.paymentDate || '-'}</TableCell>
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
                      {payment.paymentMethod || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {loading && (
              <div className="col-span-full py-8">
                <Loading variant="page" text="جارٍ تحميل المدفوعات..." size="lg" />
              </div>
            )}
            {!loading && payments.length === 0 && (
              <Empty variant="payments" />
            )}
            {!loading && currentPage < totalPages && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={loading}
                >
                  تحميل المزيد
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </AdminLayout>
  );
};

export default AdminPayments;
