import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

// Mock data
const children = [
  { id: 1, name: "ليلى محمد", avatar: "", status: "present", checkIn: "8:15 ص", checkOut: null },
  { id: 2, name: "عمر أحمد", avatar: "", status: "present", checkIn: "8:30 ص", checkOut: null },
  { id: 3, name: "سارة علي", avatar: "", status: "present", checkIn: "8:05 ص", checkOut: null },
  { id: 4, name: "أحمد خالد", avatar: "", status: "absent", checkIn: null, checkOut: null },
  { id: 5, name: "نور الهدى", avatar: "", status: "present", checkIn: "8:45 ص", checkOut: null },
  { id: 6, name: "محمد سعيد", avatar: "", status: "present", checkIn: "8:20 ص", checkOut: null },
  { id: 7, name: "فاطمة حسن", avatar: "", status: "present", checkIn: "8:10 ص", checkOut: null },
  { id: 8, name: "يوسف عبدالله", avatar: "", status: "absent", checkIn: null, checkOut: null },
  { id: 9, name: "مريم أمين", avatar: "", status: "present", checkIn: "8:35 ص", checkOut: null },
  { id: 10, name: "عبدالرحمن علي", avatar: "", status: "present", checkIn: "8:25 ص", checkOut: null },
  { id: 11, name: "زينب كريم", avatar: "", status: "late", checkIn: "9:15 ص", checkOut: null },
  { id: 12, name: "حسين محمود", avatar: "", status: "present", checkIn: "8:40 ص", checkOut: null },
];

const TeacherAttendance = () => {
  const [attendanceData, setAttendanceData] = useState(children);

  const today = new Date().toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const presentCount = attendanceData.filter(
    (c) => c.status === "present" || c.status === "late"
  ).length;
  const absentCount = attendanceData.filter((c) => c.status === "absent").length;
  const lateCount = attendanceData.filter((c) => c.status === "late").length;

  const updateStatus = (id, status) => {
    setAttendanceData((prev) =>
      prev.map((child) =>
        child.id === id
          ? {
              ...child,
              status,
              checkIn:
                status === "present" || status === "late"
                  ? new Date().toLocaleTimeString("ar-SA", {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : null,
            }
          : child
      )
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="w-3 h-3 ml-1" />
            حاضر
          </Badge>
        );
      case "absent":
        return (
          <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
            <XCircle className="w-3 h-3 ml-1" />
            غائب
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Clock className="w-3 h-3 ml-1" />
            متأخر
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <AlertCircle className="w-3 h-3 ml-1" />
            في الانتظار
          </Badge>
        );
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              الحضور
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {today}
            </p>
          </div>
          <Button variant="outline">
            <Calendar className="w-4 h-4 ml-2" />
            عرض السجل
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{attendanceData.length}</p>
                <p className="text-sm text-muted-foreground">الإجمالي</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500/10">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{presentCount}</p>
                <p className="text-sm text-muted-foreground">حاضر</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-destructive/10">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{absentCount}</p>
                <p className="text-sm text-muted-foreground">غائب</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lateCount}</p>
                <p className="text-sm text-muted-foreground">متأخر</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">تسجيل الحضور</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceData.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={child.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {child.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{child.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(child.status)}
                        {child.checkIn && (
                          <span className="text-xs text-muted-foreground">
                            الدخول: {child.checkIn}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={child.status === "present" ? "default" : "outline"}
                      className={
                        child.status === "present"
                          ? "bg-green-500 hover:bg-green-600"
                          : "hover:bg-green-500/10 hover:text-green-600 hover:border-green-500"
                      }
                      onClick={() => updateStatus(child.id, "present")}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={child.status === "late" ? "default" : "outline"}
                      className={
                        child.status === "late"
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500"
                      }
                      onClick={() => updateStatus(child.id, "late")}
                    >
                      <Clock className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={child.status === "absent" ? "destructive" : "outline"}
                      className={
                        child.status !== "absent"
                          ? "hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                          : ""
                      }
                      onClick={() => updateStatus(child.id, "absent")}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
};

export default TeacherAttendance;
