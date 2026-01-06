import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
// Using the new service names we discussed
import { getParentsSubscriptions, getAdminRevenueStats } from '@/services/admin'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Search, TrendingUp, CreditCard, Clock, X, Phone, Mail } from 'lucide-react';
import { Loading } from '@/components/ui/loading';
import toast from 'react-hot-toast';

const AdminPayments = () => {
  const [parents, setParents] = useState([]); // Renamed from payments to match context
  const [stats, setStats] = useState({ monthlyRevenue: 0, outstandingAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchStats = () => {
    setStatsLoading(true);
    getAdminRevenueStats({
      onSuccess: (data) => {
        setStats({
          monthlyRevenue: data.monthlyRevenue,
          outstandingAmount: data.outstandingAmount
        });
        setStatsLoading(false);
      },
      onError: () => {
        toast.error('فشل تحميل الإحصائيات');
        setStatsLoading(false);
      }
    });
  };

  const fetchSubscriptions = () => {
    setLoading(true);
    getParentsSubscriptions(statusFilter, currentPage, searchQuery, {
      onSuccess: (data) => {
        console.log(data)
        if (currentPage === 1) {
          setParents(data.data);
        } else {
          setParents((prev) => [...prev, ...data.data]);
        }

        setTotalCount(data.totalCount);
        setTotalPages(data.totalPages);
        setLoading(false);
      },
      onError: () => {
        toast.error('فشل تحميل قائمة الاشتراكات.');
        setParents([]);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [statusFilter, currentPage, searchQuery]);

  // Helper to get clean status badge
  const getStatusBadge = (status) => {
    const themes = {
      active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      trialing: 'bg-blue-50 text-blue-600 border-blue-100',
      past_due: 'bg-amber-50 text-amber-600 border-amber-100',
      canceled: 'bg-rose-50 text-rose-600 border-rose-100',
      no_subscription: 'bg-gray-50 text-gray-500 border-gray-100',
    };
    
    const labels = {
      active: 'نشط',
      trialing: 'فترة تجريبية',
      past_due: 'متأخر السداد',
      canceled: 'ملغي',
      no_subscription: 'بدون اشتراك',
    };

    return (
      <Badge variant="outline" className={`${themes[status] || themes.no_subscription} font-medium`}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">الاشتراكات والتحصيل المالي</h1>
          <p className="text-muted-foreground">مراقبة اشتراكات أولياء الأمور والدفعات الشهرية</p>
        </div>

        {/* Statistics Cards (Clean White Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> إيرادات الشهر الحالي
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-emerald-600">
                    {statsLoading ? "..." : Number(stats.monthlyRevenue).toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-emerald-500">ر.س</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl">
                <DollarSign className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-rose-500" /> مبالغ متأخرة
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-rose-600">
                    {statsLoading ? "..." : Number(stats.outstandingAmount).toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-rose-500">ر.س</span>
                </div>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl">
                <Clock className="w-8 h-8 text-rose-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث باسم ولي الأمر أو البريد..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="حالة الاشتراك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="past_due">متأخر السداد</SelectItem>
                  <SelectItem value="canceled">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">قائمة المشتركين ({totalCount})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ولي الأمر</TableHead>
                  <TableHead>معلومات الاتصال</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>نهاية الفترة</TableHead>
                  <TableHead className="text-left">معرف الاشتراك</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parents.map((parent) => (
                  <TableRow key={parent.id}>
                    <TableCell className="font-medium">{parent.parentName}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Mail className="w-3 h-3" /> {parent.email}
                        </span>
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Phone className="w-3 h-3" /> {parent.phone}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(parent.status)}</TableCell>
                    <TableCell className="text-sm">
                      {parent.endDate 
                        ? new Date(parent.endDate).toLocaleDateString('ar-EG') 
                        : '---'}
                    </TableCell>
                    <TableCell className="text-left font-mono text-[10px] text-muted-foreground">
                      {parent.subscriptionId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {loading && <div className="py-10 text-center"><Loading text="جارٍ تحديث البيانات..." /></div>}
            
            {!loading && parents.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">لا توجد اشتراكات مطابقة للبحث</div>
            )}

            {currentPage < totalPages && (
              <div className="mt-4 flex justify-center">
                <Button variant="ghost" onClick={() => setCurrentPage(p => p + 1)}>تحميل المزيد</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;