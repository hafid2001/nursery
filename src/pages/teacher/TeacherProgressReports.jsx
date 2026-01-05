import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  Plus,
  FileText,
  Calendar,
  Utensils,
  Moon,
  Users,
  Brain,
} from "lucide-react";
import { useState } from "react";

// Mock data
const children = [
  { id: 1, name: "ليلى محمد", avatar: "" },
  { id: 2, name: "عمر أحمد", avatar: "" },
  { id: 3, name: "سارة علي", avatar: "" },
  { id: 4, name: "أحمد خالد", avatar: "" },
  { id: 5, name: "نور الهدى", avatar: "" },
  { id: 6, name: "محمد سعيد", avatar: "" },
];

const progressReports = [
  {
    id: 1,
    childName: "ليلى محمد",
    childAvatar: "",
    period: "نوفمبر 2024",
    createdAt: "30 نوفمبر 2024",
    status: "completed",
    areas: {
      eating: 85,
      sleeping: 90,
      social: 75,
      cognitive: 80,
    },
  },
  {
    id: 2,
    childName: "عمر أحمد",
    childAvatar: "",
    period: "نوفمبر 2024",
    createdAt: "28 نوفمبر 2024",
    status: "completed",
    areas: {
      eating: 70,
      sleeping: 85,
      social: 90,
      cognitive: 75,
    },
  },
  {
    id: 3,
    childName: "سارة علي",
    childAvatar: "",
    period: "نوفمبر 2024",
    createdAt: "29 نوفمبر 2024",
    status: "draft",
    areas: {
      eating: 80,
      sleeping: 75,
      social: 85,
      cognitive: 90,
    },
  },
];

const developmentAreas = [
  { key: "eating", label: "عادات الأكل", icon: Utensils, color: "text-green-500" },
  { key: "sleeping", label: "جودة النوم", icon: Moon, color: "text-blue-500" },
  { key: "social", label: "المهارات الاجتماعية", icon: Users, color: "text-purple-500" },
  { key: "cognitive", label: "التطور المعرفي", icon: Brain, color: "text-amber-500" },
];

const TeacherProgressReports = () => {
  const [selectedChild, setSelectedChild] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              تقارير التقدم
            </h1>
            <p className="text-muted-foreground">
              تتبع وتوثيق تقدم الأطفال التنموي
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 ml-2" />
                تقرير جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إنشاء تقرير تقدم</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Child Selection */}
                <div className="space-y-2">
                  <Label>اختر الطفل</Label>
                  <Select value={selectedChild} onValueChange={setSelectedChild}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر طفلاً..." />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {child.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {child.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Period Selection */}
                <div className="space-y-2">
                  <Label>فترة التقرير</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفترة..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dec-2024">ديسمبر 2024</SelectItem>
                      <SelectItem value="nov-2024">نوفمبر 2024</SelectItem>
                      <SelectItem value="oct-2024">أكتوبر 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Development Areas */}
                {developmentAreas.map((area) => (
                  <div key={area.key} className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <area.icon className={`w-4 h-4 ${area.color}`} />
                      {area.label}
                    </Label>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Button
                          key={level}
                          variant="outline"
                          className="h-12"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                    <Textarea
                      placeholder={`ملاحظات حول ${area.label}...`}
                      className="resize-none"
                    />
                  </div>
                ))}

                {/* Overall Comments */}
                <div className="space-y-3">
                  <Label>التعليقات العامة والتوصيات</Label>
                  <Textarea
                    placeholder="اكتب الملاحظات العامة والإنجازات والتوصيات لأولياء الأمور..."
                    className="resize-none min-h-[120px]"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    حفظ كمسودة
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    نشر التقرير
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progressReports.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي التقارير</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500/10">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {progressReports.filter((r) => r.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">منشور</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Calendar className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {progressReports.filter((r) => r.status === "draft").length}
                </p>
                <p className="text-sm text-muted-foreground">مسودات</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressReports.map((report) => (
            <Card
              key={report.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={report.childAvatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {report.childName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{report.childName}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {report.period}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={report.status === "completed" ? "default" : "secondary"}
                    className={
                      report.status === "completed"
                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                        : ""
                    }
                  >
                    {report.status === "completed" ? "منشور" : "مسودة"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {developmentAreas.map((area) => (
                  <div key={area.key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <area.icon className={`w-3.5 h-3.5 ${area.color}`} />
                        {area.label}
                      </span>
                      <span className="font-medium">
                        {report.areas[area.key]}%
                      </span>
                    </div>
                    <Progress
                      value={report.areas[area.key]}
                      className="h-1.5"
                    />
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-2">
                  تاريخ الإنشاء: {report.createdAt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherProgressReports;
