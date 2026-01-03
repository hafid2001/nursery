import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
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
} from "lucide-react";
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentActivities from '@/components/dashboard/RecentActivities';
import PendingActions from '@/components/dashboard/PendingActions';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddParentOpen, setIsAddParentOpen] = useState(false);
  const [isScheduleEventOpen, setIsScheduleEventOpen] = useState(false);
  const [parentForm, setParentForm] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
  });
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const handleGenerateReport = () => {
    toast({
      title: "تم إنشاء التقرير",
      description: "تقريرك جاهز للتحميل.",
    });
  };

  const handleAddParent = () => {
    toast({
      title: "تمت إضافة ولي الأمر",
      description: `تم تسجيل ${parentForm.parentName} مع الطفل ${parentForm.childName} بنجاح.`,
    });
    setIsAddParentOpen(false);
    setParentForm({
      parentName: '',
      email: '',
      phone: '',
      childName: '',
      childAge: '',
    });
  };

  const handleScheduleEvent = () => {
    toast({
      title: "تمت جدولة الفعالية",
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
              onClick={() => setIsAddParentOpen(true)}
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">إضافة ولي أمر</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentActivities />
          <PendingActions />
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
                onClick={() => setIsAddParentOpen(true)}
              >
                <UserPlus className="w-6 h-6 text-admin" />
                <span className="text-sm">إضافة ولي أمر</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2 hover:border-admin hover:bg-admin/5"
                onClick={() => navigate("/admin/teachers")}
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
                onClick={() => navigate("/admin/reports")}
              >
                <FileText className="w-6 h-6 text-admin" />
                <span className="text-sm">إنشاء تقرير</span>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Add Parent with Child Dialog */}
      <Dialog open={isAddParentOpen} onOpenChange={setIsAddParentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة ولي أمر مع طفل</DialogTitle>
            <DialogDescription>
              أدخل معلومات ولي الأمر والطفل لتسجيلهم.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-b pb-3 mb-3">
              <h4 className="font-semibold mb-3 text-admin">
                بيانات ولي الأمر
              </h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="parentName">الاسم الكامل</Label>
                  <Input
                    id="parentName"
                    value={parentForm.parentName}
                    onChange={(e) =>
                      setParentForm({
                        ...parentForm,
                        parentName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={parentForm.email}
                    onChange={(e) =>
                      setParentForm({ ...parentForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={parentForm.phone}
                    onChange={(e) =>
                      setParentForm({ ...parentForm, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-admin">بيانات الطفل</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="childName">اسم الطفل</Label>
                  <Input
                    id="childName"
                    value={parentForm.childName}
                    onChange={(e) =>
                      setParentForm({
                        ...parentForm,
                        childName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>العمر</Label>
                  <Select
                    value={parentForm.childAge}
                    onValueChange={(v) =>
                      setParentForm({ ...parentForm, childAge: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر العمر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="سنة واحدة">سنة واحدة</SelectItem>
                      <SelectItem value="سنتان">سنتان</SelectItem>
                      <SelectItem value="3 سنوات">3 سنوات</SelectItem>
                      <SelectItem value="4 سنوات">4 سنوات</SelectItem>
                      <SelectItem value="5 سنوات">5 سنوات</SelectItem>
                      <SelectItem value="6 سنوات">6 سنوات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddParentOpen(false)}>
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleAddParent}
            >
              إضافة
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
