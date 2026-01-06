import { ParentLayout } from "@/components/layout/ParentLayout";
import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParentLoading } from "@/components/parent/ParentLoading";
import { ParentEmptyState } from "@/components/parent/ParentEmptyState";
import { parentServices } from "@/services/parent.schema";
import toast from 'react-hot-toast';

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilities
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

  const formatDateKey = (day) => `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  const navigateMonth = (direction) => setCurrentDate(prev => {
    const newDate = new Date(prev);
    newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
    return newDate;
  });

  const weekDays = ["أحد","إثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"];
  const days = getDaysInMonth(currentDate);
  const todayKey = new Date().toISOString().split("T")[0];

  const getStatusColor = (status) =>
    ({ present: "bg-success text-success-foreground", absent: "bg-muted text-muted-foreground", sick: "bg-warning text-warning-foreground" }[status] || "bg-secondary text-secondary-foreground");
  const getStatusIcon = (status) =>
    ({ present: <CheckCircle2 className="h-4 w-4" />, absent: <XCircle className="h-4 w-4" />, sick: <AlertCircle className="h-4 w-4" /> }[status]);
  const getStatusLabel = (status) =>
    ({ present: "حاضر", absent: "غائب", sick: "مريض" }[status] || status);

  // Fetch data
  const fetchAttendanceData = async () => {
    await parentServices.getAttendanceReports({
      onStart: () => { setLoading(true); setError(null); },
      onSuccess: (response) => {
        const data = response.data || response;
        if (Array.isArray(data)) {
          const transformed = {};
          data.forEach(month => {
            if (month.reports && Array.isArray(month.reports)) {
              month.reports.forEach(record => {
                const dateKey = typeof record.date === 'string' ? record.date.split('T')[0] : new Date(record.date).toISOString().split('T')[0];
                transformed[dateKey] = {
                  status: record.status,
                  checkIn: record.check_in_time,
                  checkOut: record.check_out_time,
                };
              });
            }
          });
          setAttendanceData(transformed);
        }
      },
      onError: (err) => {
        if(err.status === 404){ setAttendanceData({}); setLoading(false); }
        else { setError('فشل في تحميل بيانات الحضور'); toast.error('فشل في تحميل بيانات الحضور'); setLoading(false); }
      },
      onFinal: () => setLoading(false)
    });
  };

  useEffect(() => { fetchAttendanceData(); }, []);

  const monthStats = Object.entries(attendanceData).reduce((acc, [date, data]) => {
    if (!acc.present) acc.present = 0;
    if (!acc.absent) acc.absent = 0;
    if (!acc.sick) acc.sick = 0;

    if (date.startsWith(`${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,"0")}`)) {
      if (data.status === "present") acc.present++;
      else if (data.status === "absent") acc.absent++;
      else if (data.status === "sick") acc.sick++;
    }
    return acc;
  }, {});

  if (loading) return <ParentLayout><ParentLoading variant="page" text="جاري تحميل بيانات الحضور..." /></ParentLayout>;
  if (error) return (
    <ParentLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">الحضور 📅</h1>
        <p className="text-muted-foreground">تتبع سجل حضور طفلك</p>
        <ParentEmptyState
          type="attendance"
          title="فشل في تحميل البيانات"
          description="حدث خطأ أثناء تحميل بيانات الحضور. يرجى المحاولة مرة أخرى."
          action={<Button onClick={fetchAttendanceData}>إعادة المحاولة</Button>}
        />
      </div>
    </ParentLayout>
  );

  const hasAttendanceData = Object.keys(attendanceData).length > 0;
  if (!hasAttendanceData) return <ParentLayout><ParentEmptyState type="attendance" /></ParentLayout>;

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold">الحضور 📅</h1><p className="text-muted-foreground">تتبع سجل حضور طفلك</p></div>

        {/* Month Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{monthStats.present}</p>
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
                <p className="text-2xl font-bold text-muted-foreground">{monthStats.absent}</p>
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
                <p className="text-2xl font-bold text-warning">{monthStats.sick}</p>
                <p className="text-sm text-muted-foreground">أيام مرض</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              {currentDate.toLocaleDateString("ar-SA-u-nu-latn",{ month:"long", year:"numeric" })}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => navigateMonth("prev")}><ChevronRight className="h-4 w-4"/></Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => navigateMonth("next")}><ChevronLeft className="h-4 w-4"/></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map(day => <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day,index) => {
                if(day === null) return <div key={`empty-${index}`} className="aspect-square" />;
                const dateKey = formatDateKey(day);
                const attendance = attendanceData[dateKey];
                const isWeekend = index % 7 === 5 || index % 7 === 6;
                const isToday = dateKey === todayKey;
                return (
                  <div key={day} className={`aspect-square rounded-xl p-1 flex flex-col items-center justify-center transition-all duration-200
                      ${isWeekend ? "bg-muted/30":"bg-secondary/30"} ${isToday ? "ring-2 ring-primary":""} ${attendance ? "cursor-pointer hover:scale-105":""}`}>
                    <span className={`text-sm font-medium ${isToday ? "text-primary":""}`}>{day}</span>
                    {attendance && !isWeekend && (
                      <div className={`mt-1 h-6 w-6 rounded-full ${getStatusColor(attendance.status)} flex items-center justify-center`}>
                        {getStatusIcon(attendance.status)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
              <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-success" /><span className="text-sm text-muted-foreground">حاضر</span></div>
              <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-muted" /><span className="text-sm text-muted-foreground">غائب</span></div>
              <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-warning" /><span className="text-sm text-muted-foreground">مريض</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Logs */}
        <Card className="rounded-2xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary"/>سجلات الحضور الأخيرة</CardTitle>
            <CardDescription>آخر سجلات الحضور مع الأوقات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(attendanceData)
                .filter(([_,data])=>data.checkIn)
                .sort(([a],[b])=>new Date(b)-new Date(a))
                .slice(0,5)
                .map(([date,data])=>(
                  <div key={date} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full ${getStatusColor(data.status)} flex items-center justify-center`}>{getStatusIcon(data.status)}</div>
                      <div>
                        <p className="font-medium">{new Date(date).toLocaleDateString("ar-SA-u-nu-latn",{ weekday:"short", month:"short", day:"numeric" })}</p>
                        <Badge variant="secondary" className="rounded-full text-xs capitalize">{getStatusLabel(data.status)}</Badge>
                      </div>
                    </div>
                    <div className="text-left text-sm">
                      <p><span className="text-muted-foreground">دخول:</span> <span className="font-medium">{data.checkIn}</span></p>
                      {data.checkOut && <p><span className="text-muted-foreground">خروج:</span> <span className="font-medium">{data.checkOut}</span></p>}
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  )
}
