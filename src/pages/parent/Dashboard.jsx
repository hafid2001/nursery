import {
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  Utensils,
  Moon,
  Activity,
  Bell,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  childName,
  quickStats,
  recentNotifications,
  todaySummary,
} from '../../mocks/parent';
import { ParentLayout } from '../../components/layout/ParentLayout.jsx';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <ParentLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-accent p-6 md:p-8 text-primary-foreground playful-shadow">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold font-display">
              صباح الخير! ☀️
            </h1>
            <p className="mt-2 text-primary-foreground/90 max-w-xl">
              {childName} تقضي يوماً رائعاً في حضانة النجوم الصغيرة. إليك ما
              يحدث اليوم!
            </p>
            <Button
              variant="secondary"
              className="mt-4 rounded-full"
              onClick={() => navigate('/daily-reports')}
            >
              عرض تقرير اليوم <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift rounded-2xl border-0 shadow-md"
            >
              <CardContent className="p-4 md:p-6">
                <div
                  className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center mb-3`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.percentage && (
                  <Progress value={stat.percentage} className="mt-2 h-1.5" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Utensils className="h-5 w-5 text-primary" />
                وجبات اليوم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySummary.meals.map((meal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{meal.emoji}</span>
                    <span className="font-medium">{meal.name}</span>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    {meal.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Moon className="h-5 w-5 text-primary" />
                الراحة والمزاج
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-lavender">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-lavender-foreground" />
                  <span className="font-medium text-lavender-foreground">
                    وقت القيلولة
                  </span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {todaySummary.napTime}
                </p>
                <Badge className="mt-2 bg-success text-success-foreground">
                  {todaySummary.napQuality}
                </Badge>
              </div>
              <div className="p-4 rounded-xl bg-peach">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="h-5 w-5 text-peach-foreground" />
                  <span className="font-medium text-peach-foreground">
                    المزاج العام
                  </span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {todaySummary.mood}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities & Notifications */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                أنشطة اليوم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {todaySummary.activities.map((activity, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm bg-mint/50 border-mint text-mint-foreground"
                  >
                    {activity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5 text-primary" />
                آخر التحديثات
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={() => navigate('/notifications')}
              >
                عرض الكل
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
            <CardDescription>المهام الشائعة في متناول يدك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 rounded-xl hover:bg-lavender hover:border-lavender"
                onClick={() => navigate('/daily-reports')}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span>التقارير اليومية</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 rounded-xl hover:bg-mint hover:border-mint"
                onClick={() => navigate('/attendance')}
              >
                <Calendar className="h-6 w-6 text-primary" />
                <span>الحضور</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 rounded-xl hover:bg-peach hover:border-peach"
                onClick={() => navigate('/documents')}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span>المستندات</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 rounded-xl hover:bg-sky hover:border-sky"
                onClick={() => navigate('/payments')}
              >
                <TrendingUp className="h-6 w-6 text-primary" />
                <span>المدفوعات</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
