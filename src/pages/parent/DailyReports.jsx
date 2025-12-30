import { ParentLayout } from '@/components/layout/ParentLayout.jsx';
import { useState } from 'react';
import {
  FileText,
  Calendar,
  Utensils,
  Moon,
  Activity,
  MessageCircle,
  ChevronLeft,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { dailyReports } from '../../mocks/parent';

const getMoodEmoji = () =>
  ({ سعيد: '😊', هادئ: '😌', نشيط: '🤩', متعب: '😴', منزعج: '😢' })[mood] ||
  '😊';
const getMealStatusColor = () =>
  ({
    أحبها: 'bg-success text-success-foreground',
    'أكل جيداً': 'bg-mint text-mint-foreground',
    'أكل قليلاً': 'bg-warning text-warning-foreground',
    'لم يأكل': 'bg-destructive text-destructive-foreground',
  })[status] || 'bg-secondary text-secondary-foreground';
const getNapQualityColor = () =>
  ({
    'نام جيداً': 'bg-success text-success-foreground',
    'نوم متقطع': 'bg-warning text-warning-foreground',
    'لم ينم': 'bg-destructive text-destructive-foreground',
  })[quality] || 'bg-secondary text-secondary-foreground';

export default function DailyReports() {
  const [selectedReport, setSelectedReport] =
    (useState < typeof dailyReports[0]) | (null > null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              التقارير اليومية 📋
            </h1>
            <p className="text-muted-foreground">
              شاهد كيف قضت ليلى يومها في الحضانة
            </p>
          </div>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث بالتاريخ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 rounded-full w-64"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {dailyReports.map((report) => (
            <Card
              key={report.id}
              className="rounded-2xl border-0 shadow-md hover-lift cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-lavender flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-lavender-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {new Date(report.date).toLocaleDateString('ar-SA', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs"
                        >
                          {getMoodEmoji(report.mood)} {report.mood}
                        </Badge>
                        <Badge
                          className={`rounded-full text-xs ${getNapQualityColor(report.nap.quality)}`}
                        >
                          <Moon className="h-3 w-3 ml-1" />
                          {report.nap.quality}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog
          open={!!selectedReport}
          onOpenChange={() => setSelectedReport(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-primary" />
                التقرير اليومي
              </DialogTitle>
              <DialogDescription>
                {selectedReport &&
                  new Date(selectedReport.date).toLocaleDateString('ar-SA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </DialogDescription>
            </DialogHeader>
            {selectedReport && (
              <ScrollArea className="max-h-[60vh] pl-4">
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-lavender to-mint text-center">
                    <span className="text-4xl">
                      {getMoodEmoji(selectedReport.mood)}
                    </span>
                    <p className="font-semibold mt-2">
                      المزاج العام: {selectedReport.mood}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <Utensils className="h-4 w-4 text-primary" />
                      الوجبات
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(selectedReport.meals).map(
                        ([meal, data]) => (
                          <div
                            key={meal}
                            className="p-3 rounded-xl bg-secondary/50"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="capitalize font-medium">
                                {meal === 'breakfast'
                                  ? 'الفطور'
                                  : meal === 'lunch'
                                    ? 'الغداء'
                                    : 'وجبة خفيفة'}
                              </span>
                              <Badge
                                className={`rounded-full ${getMealStatusColor(data.status)}`}
                              >
                                {data.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {data.notes}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <Moon className="h-4 w-4 text-primary" />
                      وقت القيلولة
                    </h4>
                    <div className="p-4 rounded-xl bg-lavender">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-lavender-foreground">
                            المدة
                          </p>
                          <p className="font-semibold text-lg">
                            {selectedReport.nap.startTime} -{' '}
                            {selectedReport.nap.endTime}
                          </p>
                        </div>
                        <Badge
                          className={`rounded-full ${getNapQualityColor(selectedReport.nap.quality)}`}
                        >
                          {selectedReport.nap.quality}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <Activity className="h-4 w-4 text-primary" />
                      الأنشطة
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.activities.map((activity, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="rounded-full px-4 py-2 bg-mint/50 border-mint"
                        >
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      ملاحظات المعلمة
                    </h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-peach">
                        <p className="text-sm font-medium text-peach-foreground mb-1">
                          السلوك
                        </p>
                        <p className="text-foreground">
                          {selectedReport.behaviorNotes}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-sky">
                        <p className="text-sm font-medium text-sky-foreground mb-1">
                          ملاحظات عامة
                        </p>
                        <p className="text-foreground">
                          {selectedReport.teacherNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ParentLayout>
  );
}
