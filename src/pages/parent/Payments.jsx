import { ParentLayout } from '@/components/layout/ParentLayout.jsx';
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  DollarSign,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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

const getStatusBadge = () => {
  const styles = {
    paid: {
      className: 'bg-success/20 text-success border-success/30',
      icon: <CheckCircle2 className="h-3 w-3 ml-1" />,
      label: 'مدفوع',
    },
    pending: {
      className: 'bg-warning/20 text-warning border-warning/30',
      icon: <Clock className="h-3 w-3 ml-1" />,
      label: 'معلق',
    },
    overdue: {
      className: 'bg-destructive/20 text-destructive border-destructive/30',
      icon: <AlertCircle className="h-3 w-3 ml-1" />,
      label: 'متأخر',
    },
  };
  const style = styles[status] || styles.pending;
  return (
    <Badge
      variant="outline"
      className={`rounded-full capitalize ${style.className}`}
    >
      {style.icon}
      {style.label}
    </Badge>
  );
};

export default function Payments() {
  const totalPaid = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
            المدفوعات 💳
          </h1>
          <p className="text-muted-foreground">
            إدارة دفعات الرسوم الدراسية وعرض السجل
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    إجمالي المدفوع
                  </p>
                  <p className="text-2xl font-bold text-success">
                    {totalPaid.toLocaleString()} ريال
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Clock className="h-7 w-7 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">معلق</p>
                  <p className="text-2xl font-bold text-warning">
                    {pendingAmount.toLocaleString()} ريال
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-lavender flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-lavender-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    الاستحقاق القادم
                  </p>
                  <p className="text-2xl font-bold text-foreground">1 يناير</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {pendingAmount > 0 && (
          <Card className="rounded-2xl border-0 shadow-md bg-gradient-to-r from-warning/10 to-warning/5 border-r-4 border-r-warning">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold">دفعة مستحقة</h3>
                    <p className="text-sm text-muted-foreground">
                      رسوم يناير بقيمة {pendingAmount.toLocaleString()} ريال
                      مستحقة في 1 يناير 2025
                    </p>
                  </div>
                </div>
                <Button className="rounded-full">
                  <CreditCard className="h-4 w-4 ml-2" />
                  ادفع الآن
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  سجل المدفوعات
                </CardTitle>
                <CardDescription>
                  عرض جميع مدفوعاتك السابقة والقادمة
                </CardDescription>
              </div>
              <Button variant="outline" className="rounded-full">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">الوصف</TableHead>
                    <TableHead className="text-right">
                      تاريخ الاستحقاق
                    </TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-left">إجراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          {payment.paidDate && (
                            <p className="text-xs text-muted-foreground">
                              تم الدفع عبر {payment.method}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(payment.dueDate).toLocaleDateString('ar-SA', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {payment.amount.toLocaleString()} ريال
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-left">
                        {payment.status === 'paid' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full"
                          >
                            <Download className="h-4 w-4 ml-1" />
                            إيصال
                          </Button>
                        ) : (
                          <Button size="sm" className="rounded-full">
                            ادفع
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-md bg-mint/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-mint flex items-center justify-center shrink-0">
                <CreditCard className="h-6 w-6 text-mint-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">طرق الدفع المقبولة</h3>
                <p className="text-sm text-muted-foreground">
                  نقبل بطاقات الائتمان (فيزا، ماستركارد، أمريكان إكسبريس)،
                  التحويلات البنكية، وباي بال. جميع المعاملات مؤمنة ومشفرة.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
