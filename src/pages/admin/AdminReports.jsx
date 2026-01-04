import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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
  FileBarChart,
  Download,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  FileText,
} from 'lucide-react';
import { Loading } from '@/components/ui/loading';

const AdminReports = () => {
  const { toast } = useToast();
  const [recentReports, setRecentReports] = useState(initialRecentReports);
  const [isCustomReportOpen, setIsCustomReportOpen] = useState(false);
  const [generatingReportId, setGeneratingReportId] =
    (useState < number) | (null > null);
  const [customForm, setCustomForm] = useState({
    name: '',
    type: 'الحضور',
    description: '',
  });

  const handleGenerateReport = (reportType) => {
    setGeneratingReportId(reportType.id);

    setTimeout(() => {
      const newReport = {
        id: recentReports.length + 1,
        name: `${reportType.title} - ${new Date().toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}`,
        type: reportType.title.split(' ')[1] || reportType.title,
        generatedBy: 'سارة المديرة',
        date: new Date().toLocaleDateString('ar-SA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        status: 'ready',
      };
      setRecentReports([newReport, ...recentReports]);
      setGeneratingReportId(null);
      toast({
        title: 'تم إنشاء التقرير',
        description: `تم إنشاء ${reportType.title} بنجاح.`,
      });
    }, 2000);
  };

  const handleDownload = (report) => {
    toast({
      title: 'بدأ التحميل',
      description: `جاري تحميل ${report.name}...`,
    });
  };

  const handleCreateCustomReport = () => {
    const newReport = {
      id: recentReports.length + 1,
      name: customForm.name,
      type: customForm.type,
      generatedBy: 'سارة المديرة',
      date: new Date().toLocaleDateString('ar-SA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      status: 'processing',
    };
    setRecentReports([newReport, ...recentReports]);
    toast({
      title: 'تم إنشاء التقرير المخصص',
      description: `جاري إنشاء ${customForm.name}.`,
    });
    setIsCustomReportOpen(false);
    setCustomForm({ name: '', type: 'الحضور', description: '' });

    setTimeout(() => {
      setRecentReports((prev) =>
        prev.map((r) => (r.id === newReport.id ? { ...r, status: 'ready' } : r))
      );
      toast({
        title: 'التقرير جاهز',
        description: `${customForm.name || newReport.name} جاهز للتحميل.`,
      });
    }, 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              التقارير والتحليلات
            </h1>
            <p className="text-muted-foreground">إنشاء وتحميل تقارير المركز</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="december">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="december">ديسمبر 2024</SelectItem>
                <SelectItem value="november">نوفمبر 2024</SelectItem>
                <SelectItem value="q4">الربع الرابع 2024</SelectItem>
                <SelectItem value="year">سنة 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="gap-2 bg-admin hover:bg-admin/90 text-admin-foreground"
              onClick={() => setIsCustomReportOpen(true)}
            >
              <FileText className="w-4 h-4" />
              تقرير مخصص
            </Button>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((report) => (
            <Card
              key={report.id}
              className="hover-lift cursor-pointer hover:border-admin/50"
            >
              <CardContent className="pt-6">
                <div
                  className={`w-12 h-12 rounded-xl ${report.color} flex items-center justify-center mb-4`}
                >
                  <report.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {report.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  آخر: {report.lastGenerated}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => handleGenerateReport(report)}
                  disabled={generatingReportId === report.id}
                >
                  {generatingReportId === report.id ? (
                    <Loading variant="button" text="جاري الإنشاء..." />
                  ) : (
                    'إنشاء التقرير'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>التقارير الأخيرة</CardTitle>
            <Button variant="ghost" size="sm" className="text-admin">
              عرض الكل
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-admin/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-admin-accent flex items-center justify-center">
                      <FileBarChart className="w-5 h-5 text-admin" />
                    </div>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <span>•</span>
                        <span>{report.generatedBy}</span>
                        <span>•</span>
                        <span>{report.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'ready' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleDownload(report)}
                      >
                        <Download className="w-4 h-4" />
                        تحميل
                      </Button>
                    ) : (
                      <Loading variant="inline" text="جاري المعالجة..." size="sm" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط الحضور</p>
                  <p className="text-3xl font-bold text-foreground">94.2%</p>
                  <p className="text-sm text-success">+2.1% من الشهر الماضي</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-admin/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-admin" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">نسبة التحصيل</p>
                  <p className="text-3xl font-bold text-foreground">97.8%</p>
                  <p className="text-sm text-success">+0.5% من الشهر الماضي</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">نمو التسجيل</p>
                  <p className="text-3xl font-bold text-foreground">+12%</p>
                  <p className="text-sm text-success">+8 طلاب جدد</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom Report Dialog */}
      <Dialog open={isCustomReportOpen} onOpenChange={setIsCustomReportOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إنشاء تقرير مخصص</DialogTitle>
            <DialogDescription>تحديد معايير التقرير المخصص.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reportName">اسم التقرير</Label>
              <Input
                id="reportName"
                value={customForm.name}
                onChange={(e) =>
                  setCustomForm({ ...customForm, name: e.target.value })
                }
                placeholder="مثال: تقرير الملخص الشهري"
              />
            </div>
            <div className="space-y-2">
              <Label>نوع التقرير</Label>
              <Select
                value={customForm.type}
                onValueChange={(v) => setCustomForm({ ...customForm, type: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الحضور">الحضور</SelectItem>
                  <SelectItem value="مالي">مالي</SelectItem>
                  <SelectItem value="التسجيل">التسجيل</SelectItem>
                  <SelectItem value="الموظفات">أداء الموظفات</SelectItem>
                  <SelectItem value="شامل">نظرة شاملة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف (اختياري)</Label>
              <Textarea
                id="description"
                value={customForm.description}
                onChange={(e) =>
                  setCustomForm({ ...customForm, description: e.target.value })
                }
                placeholder="أضف ملاحظات حول ما يجب أن يتضمنه التقرير..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCustomReportOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleCreateCustomReport}
            >
              إنشاء التقرير
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminReports;
