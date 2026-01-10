import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const stats = [
  {
    title: "الأطفال الحاضرون",
    value: "10/12",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "التقارير اليوم",
    value: "6",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "رسائل غير مقروءة",
    value: "3",
    icon: MessageSquare,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "مهام معلقة",
    value: "4",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const todaySchedule = [
  { time: "8:00 ص", activity: "الوصول واللعب الحر", status: "completed" },
  { time: "9:00 ص", activity: "وقت الحلقة", status: "completed" },
  { time: "9:30 ص", activity: "نشاط فني", status: "current" },
  { time: "10:30 ص", activity: "اللعب في الخارج", status: "upcoming" },
  { time: "11:30 ص", activity: "وقت الغداء", status: "upcoming" },
  { time: "12:30 م", activity: "وقت القيلولة", status: "upcoming" },
];

const recentActivity = [
  {
    id: 1,
    type: "report",
    message: "تم تقديم تقرير يومي لليلى محمد",
    time: "منذ 10 دقائق",
  },
  {
    id: 2,
    type: "attendance",
    message: "تم تسجيل حضور عمر أحمد",
    time: "منذ 25 دقيقة",
  },
  {
    id: 3,
    type: "message",
    message: "رسالة جديدة من ولي أمر سارة",
    time: "منذ ساعة",
  },
  {
    id: 4,
    type: "report",
    message: "تم تقديم تقرير يومي لأحمد علي",
    time: "منذ ساعتين",
  },
];

const childrenNeedingReports = [
  { id: 1, name: "نور الهدى", avatar: "" },
  { id: 2, name: "محمد خالد", avatar: "" },
  { id: 3, name: "فاطمة سعيد", avatar: "" },
  { id: 4, name: "يوسف أحمد", avatar: "" },
  { id: 5, name: "مريم علي", avatar: "" },
  { id: 6, name: "عبدالله حسن", avatar: "" },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  مرحباً بك في غرفة الشمس! ☀️
                </h1>
                <p className="text-muted-foreground mt-1">
                  لديك 12 طفل في صفك اليوم. دعينا نجعله يوماً رائعاً!
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate("/teacher/attendance")}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Calendar className="w-4 h-4 ml-2" />
                  تسجيل الحضور
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/teacher/daily-reports")}
                >
                  <Plus className="w-4 h-4 ml-2" />
                  تقرير جديد
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                جدول اليوم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    item.status === "current"
                      ? "bg-primary/10 border border-primary/20"
                      : item.status === "completed"
                      ? "opacity-60"
                      : ""
                  }`}
                >
                  {item.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : item.status === "current" ? (
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reports Needed */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  تقارير مطلوبة
                </CardTitle>
                <Badge variant="secondary">{childrenNeedingReports.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {childrenNeedingReports.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={child.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {child.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{child.name}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => navigate("/teacher/daily-reports")}
              >
                عرض جميع التقارير
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                النشاط الأخير
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "report"
                        ? "bg-primary/10"
                        : activity.type === "attendance"
                        ? "bg-green-500/10"
                        : "bg-secondary/10"
                    }`}
                  >
                    {activity.type === "report" ? (
                      <FileText className="w-3 h-3 text-primary" />
                    ) : activity.type === "attendance" ? (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    ) : (
                      <MessageSquare className="w-3 h-3 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
