import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  GraduationCap,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Bell,
  Calendar,
  FileText,
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isScheduleEventOpen, setIsScheduleEventOpen] = useState(false);
  const [studentForm, setStudentForm] = useState({
    firstName: '',
    lastName: '',
    classroom: '',
    parentEmail: '',
  });
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const handleGenerateReport = () => {
    toast({
      title: 'تم إنشاء التقرير',
      description: 'تقريرك جاهز للتحميل.',
    });
  };

  const handleAddStudent = () => {
    toast({
      title: 'تمت إضافة الطالب',
      description: `تم تسجيل ${studentForm.firstName} ${studentForm.lastName} بنجاح.`,
    });
    setIsAddStudentOpen(false);
    setStudentForm({
      firstName: '',
      lastName: '',
      classroom: '',
      parentEmail: '',
    });
  };

  const handleScheduleEvent = () => {
    toast({
      title: 'تمت جدولة الفعالية',
      description: `تمت جدولة "${eventForm.title}" في ${eventForm.date}.`,
    });
    setIsScheduleEventOpen(false);
    setEventForm({ title: '', date: '', time: '', description: '' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              مرحباً بك، سارة
            </h1>
            <p className="text-muted-foreground">
              إليك ما يحدث في حضانة النجوم الصغيرة اليوم
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleGenerateReport}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">إنشاء تقرير</span>
            </Button>
            <Button
              className="gap-2 bg-admin hover:bg-admin/90 text-admin-foreground"
              onClick={() => setIsAddStudentOpen(true)}
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">إضافة طالب</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="hover-lift cursor-pointer"
              onClick={() => {
                if (stat.title === 'إجمالي الطلاب') navigate('/admin/users');
                if (stat.title === 'المعلمات النشطات')
                  navigate('/admin/teachers');
                if (stat.title === 'الفصول') navigate('/admin/classrooms');
                if (stat.title === 'الإيرادات الشهرية')
                  navigate('/admin/payments');
              }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-success" />
                      )}
                      {stat.trend === 'down' && (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span
                        className={`text-sm ${
                          stat.trend === 'up'
                            ? 'text-success'
                            : stat.trend === 'down'
                              ? 'text-destructive'
                              : 'text-muted-foreground'
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                النشاط الأخير
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-admin"
                onClick={() => navigate('/admin/reports')}
              >
                عرض الكل
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => {
                      if (activity.type === 'enrollment')
                        navigate('/admin/users');
                      if (activity.type === 'payment')
                        navigate('/admin/payments');
                      if (activity.type === 'staff')
                        navigate('/admin/teachers');
                      if (activity.type === 'report')
                        navigate('/admin/reports');
                    }}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-admin-accent text-admin-accent-foreground text-sm">
                        {activity.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.name}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-admin" />
                الإجراءات المعلقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-admin/50 transition-colors cursor-pointer"
                    onClick={() => navigate(action.route)}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        action.priority === 'high'
                          ? 'bg-destructive'
                          : action.priority === 'medium'
                            ? 'bg-warning'
                            : 'bg-muted-foreground'
                      }`}
                    />
                    <p className="text-sm">{action.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 hover:border-admin hover:bg-admin/5"
                onClick={() => setIsAddStudentOpen(true)}
              >
                <UserPlus className="w-6 h-6 text-admin" />
                <span className="text-sm">إضافة طالب</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 hover:border-admin hover:bg-admin/5"
                onClick={() => navigate('/admin/teachers')}
              >
                <GraduationCap className="w-6 h-6 text-admin" />
                <span className="text-sm">إضافة معلمة</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 hover:border-admin hover:bg-admin/5"
                onClick={() => setIsScheduleEventOpen(true)}
              >
                <Calendar className="w-6 h-6 text-admin" />
                <span className="text-sm">جدولة فعالية</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 hover:border-admin hover:bg-admin/5"
                onClick={() => navigate('/admin/reports')}
              >
                <FileText className="w-6 h-6 text-admin" />
                <span className="text-sm">إنشاء تقرير</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة طالب جديد</DialogTitle>
            <DialogDescription>أدخل معلومات الطالب لتسجيله.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">الاسم الأول</Label>
                <Input
                  id="firstName"
                  value={studentForm.firstName}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">اسم العائلة</Label>
                <Input
                  id="lastName"
                  value={studentForm.lastName}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>الفصل</Label>
              <Select
                value={studentForm.classroom}
                onValueChange={(v) =>
                  setStudentForm({ ...studentForm, classroom: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفصل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunshine">فصل الشمس</SelectItem>
                  <SelectItem value="rainbow">فصل قوس قزح</SelectItem>
                  <SelectItem value="starlight">فصل النجوم</SelectItem>
                  <SelectItem value="moonbeam">فصل القمر</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentEmail">بريد ولي الأمر</Label>
              <Input
                id="parentEmail"
                type="email"
                value={studentForm.parentEmail}
                onChange={(e) =>
                  setStudentForm({
                    ...studentForm,
                    parentEmail: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddStudentOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleAddStudent}
            >
              إضافة الطالب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Event Dialog */}
      <Dialog open={isScheduleEventOpen} onOpenChange={setIsScheduleEventOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>جدولة فعالية</DialogTitle>
            <DialogDescription>إنشاء فعالية جديدة للمركز.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">عنوان الفعالية</Label>
              <Input
                id="eventTitle"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm({ ...eventForm, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">التاريخ</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventTime">الوقت</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={eventForm.time}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDescription">الوصف</Label>
              <Input
                id="eventDescription"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({ ...eventForm, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsScheduleEventOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleScheduleEvent}
            >
              جدولة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDashboard;
