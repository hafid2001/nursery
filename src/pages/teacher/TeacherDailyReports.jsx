import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  FileText,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Utensils,
  Moon,
  Smile,
  Activity,
  Calendar,
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

const todayReports = [
  {
    id: 1,
    childName: "ليلى محمد",
    childAvatar: "",
    status: "completed",
    submittedAt: "10:30 ص",
    meals: "أكل جيداً",
    nap: "1.5 ساعة",
    mood: "سعيد",
  },
  {
    id: 2,
    childName: "عمر أحمد",
    childAvatar: "",
    status: "completed",
    submittedAt: "10:15 ص",
    meals: "أكل قليلاً",
    nap: "ساعتان",
    mood: "مرح",
  },
  {
    id: 3,
    childName: "سارة علي",
    childAvatar: "",
    status: "completed",
    submittedAt: "9:45 ص",
    meals: "أكل جيداً",
    nap: "ساعة",
    mood: "هادئ",
  },
];

const pendingReports = [
  { id: 4, childName: "أحمد خالد", childAvatar: "" },
  { id: 5, childName: "نور الهدى", childAvatar: "" },
  { id: 6, childName: "محمد سعيد", childAvatar: "" },
];

const TeacherDailyReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const today = new Date().toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              التقارير اليومية
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {today}
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
                <DialogTitle>إنشاء تقرير يومي</DialogTitle>
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

                {/* Meals Section */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-primary" />
                    الوجبات والأكل
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["أكل جيداً", "أكل قليلاً", "لم يأكل كثيراً"].map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className="h-auto py-3"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="ملاحظات إضافية عن الوجبات..."
                    className="resize-none"
                  />
                </div>

                {/* Nap Section */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-primary" />
                    وقت القيلولة
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        وقت البداية
                      </Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        وقت النهاية
                      </Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["نام جيداً", "نوم متقطع", "لم ينم"].map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className="h-auto py-3"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Mood Section */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Smile className="w-4 h-4 text-primary" />
                    المزاج والسلوك
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["😊 سعيد", "😴 متعب", "😢 منزعج", "😄 مرح"].map(
                      (option) => (
                        <Button
                          key={option}
                          variant="outline"
                          className="h-auto py-3"
                        >
                          {option}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                {/* Activities Section */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    الأنشطة
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "فن",
                      "موسيقى",
                      "لعب خارجي",
                      "قراءة",
                      "بناء",
                      "لعب حسي",
                      "رقص",
                      "نشاط جماعي",
                    ].map((activity) => (
                      <Badge
                        key={activity}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 py-1.5 px-3"
                      >
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Notes Section */}
                <div className="space-y-3">
                  <Label>ملاحظات المعلمة</Label>
                  <Textarea
                    placeholder="اكتب أي ملاحظات إضافية، إنجازات، أو مخاوف..."
                    className="resize-none min-h-[100px]"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    إرسال التقرير
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500/10">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayReports.length}</p>
                <p className="text-sm text-muted-foreground">مكتمل</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingReports.length}</p>
                <p className="text-sm text-muted-foreground">معلق</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث باسم الطفل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                تقارير معلقة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingReports.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={child.childAvatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {child.childName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{child.childName}</span>
                  </div>
                  <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                    <FileText className="w-4 h-4 ml-2" />
                    إنشاء
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Completed Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                تقارير مكتملة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayReports.map((report) => (
                <div
                  key={report.id}
                  className="p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
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
                        <p className="font-medium">{report.childName}</p>
                        <p className="text-xs text-muted-foreground">
                          تم الإرسال في {report.submittedAt}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                      مكتمل
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{report.meals}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Moon className="w-3.5 h-3.5" />
                      <span>{report.nap}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Smile className="w-3.5 h-3.5" />
                      <span>{report.mood}</span>
                    </div>
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

export default TeacherDailyReports;
