import { ParentLayout } from "@/components/layout/ParentLayout";
import { useState, useEffect } from "react";
import { TrendingUp, Calendar, Utensils, Moon, Users, Activity, Star, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ParentLoading } from "@/components/parent/ParentLoading";
import { ParentEmptyState } from "@/components/parent/ParentEmptyState";
import { parentServices } from "@/services/parent.schema";
import toast from 'react-hot-toast';

const getCategoryIcon = (category) => ({ eating: <Utensils className="h-4 w-4" />, sleeping: <Moon className="h-4 w-4" />, social: <Users className="h-4 w-4" />, learning: <Star className="h-4 w-4" />, physical: <Activity className="h-4 w-4" /> }[category] || <Activity className="h-4 w-4" />);
const getLevelColor = (level) => ({ "ممتاز": "bg-success text-success-foreground", "جيد جداً": "bg-mint text-mint-foreground", "جيد": "bg-info text-info-foreground", "مقبول": "bg-warning text-warning-foreground" }[level] || "bg-secondary text-secondary-foreground");
const getCategoryLabel = (key) => ({ eating: "عادات الأكل", sleeping: "جودة النوم", social: "المهارات الاجتماعية", learning: "التعلم", physical: "النمو البدني" }[key] || key);


export default function ProgressReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    await parentServices.getProgressReports({
      onStart: () => {
        setLoading(true);
        setError(null);
      },
      onSuccess: (response) => {
        setReports(response.data || response);
      },
      onError: (err) => {
        if(err.status == 404){
          setReports([])
        }else {
          setError("فشل في تحميل تقارير التقدم");
          toast.error('تعذر الحصول على التقارير حالياً');
        }
      },
      onFinal: () => setLoading(false),
    });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <ParentLayout><ParentLoading variant="page" text="جاري تحميل التقارير..." /></ParentLayout>;

  if (error) return (
    <ParentLayout>
      <ParentEmptyState 
        type="reports" 
        title="حدث خطأ" 
        description={error} 
        action={<Button onClick={fetchReports}>إعادة المحاولة</Button>} 
      />
    </ParentLayout>
  );

  if (reports.length === 0) return (
    <ParentLayout>
       <div className="space-y-6">
        <div><h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">تقارير التقدم 📈</h1></div>
        <ParentEmptyState type="reports" />
      </div>
    </ParentLayout>
  );

  const latestReport = reports[0];
  const childName = latestReport.first_name || "طفلك";

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">تقارير التقدم 📈</h1>
          <p className="text-muted-foreground">تتبع تطور {childName} بمرور الوقت</p>
        </div>

        {/* Latest Overview Card */}
        <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-primary/80 to-accent p-6 text-primary-foreground">
            <h2 className="text-xl font-semibold mb-2">نظرة عامة على آخر تقدم</h2>
            <p className="text-primary-foreground/90">
              ملخص الفترة من {new Date(latestReport.period_start).toLocaleDateString('ar-SA-u-nu-latn')} إلى {new Date(latestReport.period_end).toLocaleDateString('ar-SA-u-nu-latn')}
            </p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(latestReport.levels).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className={`h-12 w-12 rounded-full ${getLevelColor(value.level)} mx-auto flex items-center justify-center mb-2`}>
                    {getCategoryIcon(key)}
                  </div>
                  <p className="text-sm font-medium">{getCategoryLabel(key)}</p>
                  <p className="text-2xl font-bold text-primary">{value.score}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Reports List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">جميع تقارير التقدم</h2>
          {reports.map((report) => (
            <Card key={report.report_id} className="rounded-2xl border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      {new Date(report.period_start).toLocaleDateString('ar-SA-u-nu-latn', { month: 'long', year: 'numeric' })}
                    </CardTitle>
                    <CardDescription>
                      {new Date(report.period_start).toLocaleDateString('ar-SA-u-nu-latn')} - {new Date(report.period_end).toLocaleDateString('ar-SA-u-nu-latn')}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="rounded-full"><TrendingUp className="h-3 w-3 ml-1" />تقرير</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {Object.entries(report.levels).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-xl bg-secondary/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {getCategoryIcon(key)}
                          </div>
                          <span className="font-medium">{getCategoryLabel(key)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`rounded-full text-xs ${getLevelColor(value.level)}`}>{value.level}</Badge>
                          <span className="font-bold text-primary">{value.score}%</span>
                        </div>
                      </div>
                      <Progress value={value.score} className="h-2" />
                      {value.notes && <p className="text-xs text-muted-foreground mt-2">{value.notes}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ParentLayout>
  );
}