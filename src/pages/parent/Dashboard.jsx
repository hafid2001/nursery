import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, FileText, TrendingUp, Utensils, 
  Moon, Activity, ArrowLeft, Sparkles 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParentLayout } from '../../components/layout/ParentLayout.jsx';
import { ParentLoading } from "@/components/parent/ParentLoading";
import { ParentEmptyState } from "@/components/parent/ParentEmptyState";
import { parentServices } from "@/services/parent.schema";
import toast from "react-hot-toast";

/* Helpers mirroring DailyReports.jsx */
const parseJSON = (value, fallback) => {
  try {
    if (!value) return fallback;
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch { return fallback; }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestReport = async () => {
        await parentServices.getLatestDailyReport({
          onStart : setLoading(true),
          onSuccess: (response) => {
            setReport(response.data);
          },
          onError: (err) => {
            if (err.status === 404) {
              setReport(null);
            } else {
              toast.error("فشل تحميل بيانات لوحة التحكم");
            }
          },
          onFinal : setLoading(false)
        });
    };

    fetchLatestReport();
  }, []);

  if (loading) {
    return (
      <ParentLayout>
        <ParentLoading variant="page" text="جاري تحميل لوحة التحكم..." />
      </ParentLayout>
    );
  }

  if (!report) {
    return (
      <ParentLayout>
        <ParentEmptyState type="daily-reports" />
      </ParentLayout>
    );
  }

  // Data Parsing
  const meals = parseJSON(report.food_intake, []);
  const sleep = parseJSON(report.sleep_quality, {});
  const behavior = parseJSON(report.behavior, {});
  const activities = Array.isArray(report.activity_level) 
    ? report.activity_level.map(a => typeof a === "string" ? a : a.name)
    : [];

  return (
    <ParentLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-accent p-6 md:p-8 text-primary-foreground">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold font-display">صباح الخير! ☀️</h1>
            <p className="mt-2 text-primary-foreground/90 max-w-xl">
              {report.child_name} تقضي يوماً رائعاً. إليك ما يحدث اليوم!
            </p>
            <Button variant="secondary" className="mt-4 rounded-full" onClick={() => navigate('/daily-reports')}>
              عرض كل التقارير <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Meals Section */}
          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Utensils className="h-5 w-5 text-primary" /> وجبات اليوم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {meals.length > 0 ? (
                meals.map((meal, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col gap-1 p-3 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{meal.meal}</span>
                      <Badge variant="secondary" className="rounded-full">
                        {meal.status}
                      </Badge>
                    </div>
                    {meal.description && (
                      <p className="text-sm text-muted-foreground mr-1">
                        {meal.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground text-sm py-4">
                  لم يتم تسجيل وجبات بعد
                </p>
              )}
            </CardContent>
          </Card>

          {/* Sleep & Mood Section */}
          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Moon className="h-5 w-5 text-primary" /> الراحة والمزاج</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/20">
                <div className="flex items-center gap-3 mb-2"><Clock className="h-5 w-5 text-primary" /><span className="font-medium">جودة النوم</span></div>
                <p className="text-lg font-semibold">{sleep.quality || "غير محدد"}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/20">
                <div className="flex items-center gap-3 mb-2"><Activity className="h-5 w-5 text-primary" /><span className="font-medium">المزاج العام</span></div>
                <p className="text-lg font-semibold">{behavior.mood || "عادي"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities Section */}
        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" /> أنشطة اليوم</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity, index) => (
                <Badge key={index} variant="outline" className="rounded-full px-4 py-2 bg-primary/5 text-primary border-primary/20">
                  {activity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions (Static) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ActionBtn icon={FileText} label="التقارير" path="/daily-reports" />
          <ActionBtn icon={Calendar} label="الحضور" path="/attendance" />
          <ActionBtn icon={FileText} label="المستندات" path="/documents" />
          <ActionBtn icon={TrendingUp} label="المدفوعات" path="/payments" />
        </div>
      </div>
    </ParentLayout>
  );
}

function ActionBtn({ icon: Icon, label, path }) {
  const navigate = useNavigate();
  return (
    <Button 
      variant="outline" 
      className="h-auto py-4 flex-col gap-2 rounded-xl hover:bg-primary/5" 
      onClick={() => navigate(path)}
    >
      <Icon className="h-6 w-6 text-primary" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}