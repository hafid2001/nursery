import { ParentLayout } from '@/components/layout/ParentLayout.jsx';
import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { attendanceData } from '../../mocks/parent';

const getStatusColor = () =>
  ({
    present: 'bg-success text-success-foreground',
    absent: 'bg-muted text-muted-foreground',
    sick: 'bg-warning text-warning-foreground',
  })[status] || 'bg-secondary text-secondary-foreground';
const getStatusIcon = () =>
  ({
    present: <CheckCircle2 className="h-4 w-4" />,
    absent: <XCircle className="h-4 w-4" />,
    sick: <AlertCircle className="h-4 w-4" />,
  })[status];
const getStatusLabel = () =>
  ({ present: 'حاضر', absent: 'غائب', sick: 'مريض' })[status] || status;

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1));
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(i);
    return days;
  };
  const formatDateKey = (day) =>
    `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const days = getDaysInMonth(currentDate);
  const weekDays = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
  const navigateMonth = (direction) =>
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
  const monthStats = Object.entries(attendanceData).reduce(
    (acc, [date, data]) => {
      if (
        date.startsWith(
          `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
        )
      ) {
        if (data.status === 'present') acc.present++;
        else if (data.status === 'absent') acc.absent++;
        else if (data.status === 'sick') acc.sick++;
      }
      return acc;
    },
    { present: 0, absent: 0, sick: 0 }
  );

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
            الحضور 📅
          </h1>
          <p className="text-muted-foreground">تتبع سجل حضور ليلى</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">
                  {monthStats.present}
                </p>
                <p className="text-sm text-muted-foreground">حاضر</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                <XCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">
                  {monthStats.absent}
                </p>
                <p className="text-sm text-muted-foreground">غائب</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">
                  {monthStats.sick}
                </p>
                <p className="text-sm text-muted-foreground">أيام مرض</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                {currentDate.toLocaleDateString('ar-SA', {
                  month: 'long',
                  year: 'numeric',
                })}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (day === null)
                  return (
                    <div key={`empty-${index}`} className="aspect-square" />
                  );
                const dateKey = formatDateKey(day);
                const attendance = attendanceData[dateKey];
                const isWeekend = index % 7 === 5 || index % 7 === 6;
                const isToday = dateKey === '2024-12-18';
                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-xl p-1 flex flex-col items-center justify-center transition-all duration-200 ${isWeekend ? 'bg-muted/30' : 'bg-secondary/30'} ${isToday ? 'ring-2 ring-primary' : ''} ${attendance ? 'cursor-pointer hover:scale-105' : ''}`}
                  >
                    <span
                      className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}
                    >
                      {day}
                    </span>
                    {attendance && !isWeekend && (
                      <div
                        className={`mt-1 h-6 w-6 rounded-full ${getStatusColor(attendance.status)} flex items-center justify-center`}
                      >
                        {getStatusIcon(attendance.status)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">حاضر</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">غائب</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-warning" />
                <span className="text-sm text-muted-foreground">مريض</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              سجلات الحضور الأخيرة
            </CardTitle>
            <CardDescription>آخر سجلات الحضور مع الأوقات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(attendanceData)
                .filter(([_, data]) => data.checkIn)
                .reverse()
                .slice(0, 5)
                .map(([date, data]) => (
                  <div
                    key={date}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full ${getStatusColor(data.status)} flex items-center justify-center`}
                      >
                        {getStatusIcon(data.status)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {new Date(date).toLocaleDateString('ar-SA', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs capitalize"
                        >
                          {getStatusLabel(data.status)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left text-sm">
                      <p>
                        <span className="text-muted-foreground">دخول:</span>{' '}
                        <span className="font-medium">{data.checkIn}</span>
                      </p>
                      {data.checkOut && (
                        <p>
                          <span className="text-muted-foreground">خروج:</span>{' '}
                          <span className="font-medium">{data.checkOut}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
