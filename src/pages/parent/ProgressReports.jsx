import { ParentLayout } from '@/components/layout/ParentLayout.jsx';
import {
  TrendingUp,
  Calendar,
  Utensils,
  Moon,
  Users,
  Activity,
  Star,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { progressReports } from '../../mocks/parent';

const getCategoryIcon = () =>
  ({
    eating: <Utensils className="h-4 w-4" />,
    sleeping: <Moon className="h-4 w-4" />,
    social: <Users className="h-4 w-4" />,
    learning: <Star className="h-4 w-4" />,
    physical: <Activity className="h-4 w-4" />,
  })[category] || <Activity className="h-4 w-4" />;
const getLevelColor = () =>
  ({
    ممتاز: 'bg-success text-success-foreground',
    'جيد جداً': 'bg-mint text-mint-foreground',
    جيد: 'bg-info text-info-foreground',
    مقبول: 'bg-warning text-warning-foreground',
  })[level] || 'bg-secondary text-secondary-foreground';
const getCategoryLabel = () =>
  ({
    eating: 'عادات الأكل',
    sleeping: 'جودة النوم',
    social: 'المهارات الاجتماعية',
    learning: 'التعلم',
    physical: 'النمو البدني',
  })[key] || key;

export default function ProgressReports() {
  return (
    <ParentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
            تقارير التقدم 📈
          </h1>
          <p className="text-muted-foreground">تتبع تطور ليلى بمرور الوقت</p>
        </div>

        <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-primary/80 to-accent p-6 text-primary-foreground">
            <h2 className="text-xl font-semibold mb-2">
              نظرة عامة على آخر تقدم
            </h2>
            <p className="text-primary-foreground/90">
              {progressReports[0].summary}
            </p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(progressReports[0].categories).map(
                ([key, value]) => (
                  <div key={key} className="text-center">
                    <div
                      className={`h-12 w-12 rounded-full ${getLevelColor(value.level)} mx-auto flex items-center justify-center mb-2`}
                    >
                      {getCategoryIcon(key)}
                    </div>
                    <p className="text-sm font-medium capitalize">
                      {getCategoryLabel(key)}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {value.score}%
                    </p>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">جميع تقارير التقدم</h2>
          {progressReports.map((report) => (
            <Card key={report.id} className="rounded-2xl border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      {report.period}
                    </CardTitle>
                    <CardDescription>{report.dateRange}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    تقرير
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {report.summary}
                </p>
                <div className="grid gap-3">
                  {Object.entries(report.categories).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-xl bg-secondary/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {getCategoryIcon(key)}
                          </div>
                          <span className="font-medium capitalize">
                            {getCategoryLabel(key)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`rounded-full text-xs ${getLevelColor(value.level)}`}
                          >
                            {value.level}
                          </Badge>
                          <span className="font-bold text-primary">
                            {value.score}%
                          </span>
                        </div>
                      </div>
                      <Progress value={value.score} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {value.notes}
                      </p>
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
