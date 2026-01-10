import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
        </div>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentActivities />
          <PendingActions />
        </div>

      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;
