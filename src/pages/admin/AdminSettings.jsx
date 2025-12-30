import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Bell,
  Shield,
  Save,
  Loader2,
} from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [centerInfo, setCenterInfo] = useState({
    name: 'حضانة النجوم الصغيرة',
    phone: '0501234567',
    email: 'info@littlestars.com',
    address: 'شارع الملك فهد، الرياض، المملكة العربية السعودية',
  });

  const [hours, setHours] = useState({
    opening: '7:00',
    closing: '18:00',
    weekendEnabled: false,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    paymentReminders: true,
    attendanceAlerts: true,
    dailyReportNotifications: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
  });

  const handleSave = () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'تم حفظ الإعدادات',
        description: 'تم تحديث إعداداتك بنجاح.',
      });
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            الإعدادات
          </h1>
          <p className="text-muted-foreground">
            إدارة إعدادات المركز والتفضيلات
          </p>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-admin" />
              معلومات المركز
            </CardTitle>
            <CardDescription>
              المعلومات الأساسية عن مركز رعاية الأطفال
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="centerName">اسم المركز</Label>
                <Input
                  id="centerName"
                  value={centerInfo.name}
                  onChange={(e) =>
                    setCenterInfo({ ...centerInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    className="pr-10"
                    value={centerInfo.phone}
                    onChange={(e) =>
                      setCenterInfo({ ...centerInfo, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    className="pr-10"
                    value={centerInfo.email}
                    onChange={(e) =>
                      setCenterInfo({ ...centerInfo, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="address"
                    className="pr-10"
                    value={centerInfo.address}
                    onChange={(e) =>
                      setCenterInfo({ ...centerInfo, address: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-admin" />
              ساعات العمل
            </CardTitle>
            <CardDescription>تحديد جدول عمل المركز</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>وقت الفتح</Label>
                <Select
                  value={hours.opening}
                  onValueChange={(v) => setHours({ ...hours, opening: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6:00">6:00 صباحاً</SelectItem>
                    <SelectItem value="6:30">6:30 صباحاً</SelectItem>
                    <SelectItem value="7:00">7:00 صباحاً</SelectItem>
                    <SelectItem value="7:30">7:30 صباحاً</SelectItem>
                    <SelectItem value="8:00">8:00 صباحاً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>وقت الإغلاق</Label>
                <Select
                  value={hours.closing}
                  onValueChange={(v) => setHours({ ...hours, closing: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="17:00">5:00 مساءً</SelectItem>
                    <SelectItem value="17:30">5:30 مساءً</SelectItem>
                    <SelectItem value="18:00">6:00 مساءً</SelectItem>
                    <SelectItem value="18:30">6:30 مساءً</SelectItem>
                    <SelectItem value="19:00">7:00 مساءً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>ساعات نهاية الأسبوع</Label>
                <p className="text-sm text-muted-foreground">
                  تفعيل ساعات العمل في نهاية الأسبوع
                </p>
              </div>
              <Switch
                checked={hours.weekendEnabled}
                onCheckedChange={(checked) =>
                  setHours({ ...hours, weekendEnabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-admin" />
              تفضيلات الإشعارات
            </CardTitle>
            <CardDescription>إعداد إشعارات وتنبيهات النظام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>إشعارات البريد الإلكتروني</Label>
                <p className="text-sm text-muted-foreground">
                  استلام تنبيهات البريد للأحداث المهمة
                </p>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    emailNotifications: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>تذكيرات الدفع</Label>
                <p className="text-sm text-muted-foreground">
                  إرسال تذكيرات دفع تلقائية لأولياء الأمور
                </p>
              </div>
              <Switch
                checked={notifications.paymentReminders}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    paymentReminders: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>تنبيهات الحضور</Label>
                <p className="text-sm text-muted-foreground">
                  إشعار أولياء الأمور بالتسجيل والخروج
                </p>
              </div>
              <Switch
                checked={notifications.attendanceAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    attendanceAlerts: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>إشعارات التقارير اليومية</Label>
                <p className="text-sm text-muted-foreground">
                  تنبيه أولياء الأمور عند توفر التقارير اليومية
                </p>
              </div>
              <Switch
                checked={notifications.dailyReportNotifications}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    dailyReportNotifications: checked,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-admin" />
              الأمان
            </CardTitle>
            <CardDescription>إدارة إعدادات الأمان والوصول</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>المصادقة الثنائية</Label>
                <p className="text-sm text-muted-foreground">
                  طلب المصادقة الثنائية لحسابات الإدارة
                </p>
              </div>
              <Switch
                checked={security.twoFactor}
                onCheckedChange={(checked) =>
                  setSecurity({ ...security, twoFactor: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>انتهاء الجلسة</Label>
                <p className="text-sm text-muted-foreground">
                  تسجيل الخروج تلقائياً بعد فترة من عدم النشاط
                </p>
              </div>
              <Select
                value={security.sessionTimeout}
                onValueChange={(v) =>
                  setSecurity({ ...security, sessionTimeout: v })
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 دقيقة</SelectItem>
                  <SelectItem value="30">30 دقيقة</SelectItem>
                  <SelectItem value="60">ساعة واحدة</SelectItem>
                  <SelectItem value="120">ساعتان</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            className="gap-2 bg-admin hover:bg-admin/90 text-admin-foreground"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                حفظ التغييرات
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
