import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Phone,
  Mail,
  AlertCircle,
  FileText,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Mock data
const children = [
  {
    id: 1,
    name: "ليلى محمد",
    age: "4 سنوات",
    avatar: "",
    status: "present",
    parentName: "فاطمة محمد",
    parentPhone: "(555) 123-4567",
    parentEmail: "fatima.mohammed@email.com",
    allergies: ["الفول السوداني"],
    notes: "تفضل الأنشطة الهادئة بعد الغداء",
  },
  {
    id: 2,
    name: "عمر أحمد",
    age: "3 سنوات",
    avatar: "",
    status: "present",
    parentName: "أحمد حسين",
    parentPhone: "(555) 234-5678",
    parentEmail: "ahmed.hussein@email.com",
    allergies: [],
    notes: "",
  },
  {
    id: 3,
    name: "سارة علي",
    age: "4 سنوات",
    avatar: "",
    status: "present",
    parentName: "سارة علي",
    parentPhone: "(555) 345-6789",
    parentEmail: "sara.ali@email.com",
    allergies: ["منتجات الألبان"],
    notes: "تتعلم المشاركة مع الآخرين",
  },
  {
    id: 4,
    name: "أحمد خالد",
    age: "3 سنوات",
    avatar: "",
    status: "absent",
    parentName: "خالد المنصور",
    parentPhone: "(555) 456-7890",
    parentEmail: "khaled.almansour@email.com",
    allergies: [],
    notes: "يحب بناء المكعبات",
  },
  {
    id: 5,
    name: "نور الهدى",
    age: "4 سنوات",
    avatar: "",
    status: "present",
    parentName: "نادية كريم",
    parentPhone: "(555) 567-8901",
    parentEmail: "nadia.karim@email.com",
    allergies: ["البيض"],
    notes: "",
  },
  {
    id: 6,
    name: "محمد سعيد",
    age: "3 سنوات",
    avatar: "",
    status: "present",
    parentName: "هدى سعيد",
    parentPhone: "(555) 678-9012",
    parentEmail: "huda.saeed@email.com",
    allergies: [],
    notes: "يحتاج مساعدة إضافية في التدريب على الحمام",
  },
  {
    id: 7,
    name: "فاطمة حسن",
    age: "4 سنوات",
    avatar: "",
    status: "present",
    parentName: "حسن المصري",
    parentPhone: "(555) 789-0123",
    parentEmail: "hassan.almasri@email.com",
    allergies: [],
    notes: "",
  },
  {
    id: 8,
    name: "يوسف عبدالله",
    age: "3 سنوات",
    avatar: "",
    status: "absent",
    parentName: "عبدالله محمود",
    parentPhone: "(555) 890-1234",
    parentEmail: "abdullah.mahmoud@email.com",
    allergies: ["الغلوتين"],
    notes: "نشيط جداً، يحتاج وقتاً في الخارج",
  },
  {
    id: 9,
    name: "مريم أمين",
    age: "4 سنوات",
    avatar: "",
    status: "present",
    parentName: "أمين عبدالرحمن",
    parentPhone: "(555) 901-2345",
    parentEmail: "amin.abdelrahman@email.com",
    allergies: [],
    notes: "",
  },
  {
    id: 10,
    name: "عبدالرحمن علي",
    age: "3 سنوات",
    avatar: "",
    status: "present",
    parentName: "علي حسين",
    parentPhone: "(555) 012-3456",
    parentEmail: "ali.hussein@email.com",
    allergies: [],
    notes: "خجول في البداية، لكنه يتأقلم سريعاً",
  },
  {
    id: 11,
    name: "زينب كريم",
    age: "4 سنوات",
    avatar: "",
    status: "present",
    parentName: "كريم أحمد",
    parentPhone: "(555) 111-2222",
    parentEmail: "karim.ahmed@email.com",
    allergies: ["المأكولات البحرية"],
    notes: "",
  },
  {
    id: 12,
    name: "حسين محمود",
    age: "3 سنوات",
    avatar: "",
    status: "present",
    parentName: "محمود حسين",
    parentPhone: "(555) 333-4444",
    parentEmail: "mahmoud.hussein@email.com",
    allergies: [],
    notes: "صديق مقرب لعبدالرحمن",
  },
];

const TeacherClassroom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);

  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = children.filter((c) => c.status === "present").length;
  const absentCount = children.filter((c) => c.status === "absent").length;

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              صفي
            </h1>
            <p className="text-muted-foreground">
              غرفة الشمس • 12 طفل مسجل
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm py-1.5 px-3">
              <Users className="w-4 h-4 ml-1.5" />
              {presentCount} حاضر
            </Badge>
            <Badge variant="outline" className="text-sm py-1.5 px-3">
              {absentCount} غائب
            </Badge>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن الأطفال..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Children List */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredChildren.map((child) => (
                <Card
                  key={child.id}
                  className={`cursor-pointer hover:shadow-md transition-all ${
                    selectedChild?.id === child.id
                      ? "ring-2 ring-primary shadow-md"
                      : ""
                  } ${child.status === "absent" ? "opacity-60" : ""}`}
                  onClick={() => setSelectedChild(child)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={child.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {child.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground truncate">
                            {child.name}
                          </h3>
                          <Badge
                            variant={
                              child.status === "present" ? "default" : "secondary"
                            }
                            className={
                              child.status === "present"
                                ? "bg-green-500/10 text-green-600 border-green-500/20"
                                : ""
                            }
                          >
                            {child.status === "present" ? "حاضر" : "غائب"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{child.age}</p>
                        {child.allergies.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            <AlertCircle className="w-3 h-3 text-destructive" />
                            <span className="text-xs text-destructive">
                              {child.allergies.join("، ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Child Details Panel */}
          <div className="lg:col-span-1">
            {selectedChild ? (
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">تفاصيل الطفل</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 ml-2" />
                          إنشاء تقرير
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 ml-2" />
                          مراسلة ولي الأمر
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Child Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarImage src={selectedChild.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                        {selectedChild.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {selectedChild.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedChild.age}
                      </p>
                      <Badge
                        variant={
                          selectedChild.status === "present" ? "default" : "secondary"
                        }
                        className={
                          selectedChild.status === "present"
                            ? "bg-green-500/10 text-green-600 border-green-500/20 mt-1"
                            : "mt-1"
                        }
                      >
                        {selectedChild.status === "present" ? "حاضر" : "غائب"}
                      </Badge>
                    </div>
                  </div>

                  {/* Allergies */}
                  {selectedChild.allergies.length > 0 && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-medium text-sm">الحساسية</span>
                      </div>
                      <p className="text-sm mt-1">
                        {selectedChild.allergies.join("، ")}
                      </p>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedChild.notes && (
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-sm font-medium mb-1">ملاحظات</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedChild.notes}
                      </p>
                    </div>
                  )}

                  {/* Parent Contact */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">ولي الأمر</p>
                    <div className="space-y-2">
                      <p className="text-sm text-foreground">
                        {selectedChild.parentName}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{selectedChild.parentPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{selectedChild.parentEmail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <FileText className="w-4 h-4 ml-2" />
                      إنشاء تقرير
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-24">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground/50" />
                  <p className="text-muted-foreground mt-4">
                    اختر طفلاً لعرض التفاصيل
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherClassroom;
