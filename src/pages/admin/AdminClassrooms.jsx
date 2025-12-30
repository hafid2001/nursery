import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Building2,
  Plus,
  Users,
  GraduationCap,
  Edit,
  Settings,
} from 'lucide-react';

const AdminClassrooms = () => {
  const { toast } = useToast();
  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] =
    (useState < typeof initialClassrooms[0]) | (null > null);
  const [formData, setFormData] = useState({
    name: '',
    ageGroup: '',
    capacity: '15',
    leadTeacher: '',
    assistantTeacher: '',
  });

  const totalEnrolled = classrooms.reduce((sum, c) => sum + c.enrolled, 0);
  const totalCapacity = classrooms.reduce((sum, c) => sum + c.capacity, 0);
  const spotsAvailable = totalCapacity - totalEnrolled;

  const handleAddClassroom = () => {
    const colors = [
      'bg-success/20 border-success/50',
      'bg-info/20 border-info/50',
      'bg-warning/20 border-warning/50',
    ];
    const iconColors = ['text-success', 'text-info', 'text-warning'];
    const randomIndex = Math.floor(Math.random() * colors.length);

    const newClassroom = {
      id: classrooms.length + 1,
      name: formData.name,
      ageGroup: formData.ageGroup,
      capacity: parseInt(formData.capacity),
      enrolled: 0,
      leadTeacher: formData.leadTeacher,
      assistantTeacher: formData.assistantTeacher,
      color: colors[randomIndex],
      iconColor: iconColors[randomIndex],
      students: [],
    };
    setClassrooms([...classrooms, newClassroom]);
    toast({
      title: 'تمت إضافة الفصل',
      description: `تم إنشاء ${formData.name} بنجاح.`,
    });
    setIsAddOpen(false);
    setFormData({
      name: '',
      ageGroup: '',
      capacity: '15',
      leadTeacher: '',
      assistantTeacher: '',
    });
  };

  const handleEditClassroom = () => {
    if (!selectedClassroom) return;
    setClassrooms(
      classrooms.map((c) =>
        c.id === selectedClassroom.id
          ? {
              ...c,
              name: formData.name,
              ageGroup: formData.ageGroup,
              capacity: parseInt(formData.capacity),
              leadTeacher: formData.leadTeacher,
              assistantTeacher: formData.assistantTeacher,
            }
          : c
      )
    );
    toast({
      title: 'تم تحديث الفصل',
      description: `تم تحديث ${formData.name}.`,
    });
    setIsEditOpen(false);
    setSelectedClassroom(null);
  };

  const openEdit = (classroom) => {
    setSelectedClassroom(classroom);
    setFormData({
      name: classroom.name,
      ageGroup: classroom.ageGroup,
      capacity: classroom.capacity.toString(),
      leadTeacher: classroom.leadTeacher,
      assistantTeacher: classroom.assistantTeacher,
    });
    setIsEditOpen(true);
  };

  const openStudents = (classroom) => {
    setSelectedClassroom(classroom);
    setIsStudentsOpen(true);
  };

  const openSettings = (classroom) => {
    setSelectedClassroom(classroom);
    setFormData({
      name: classroom.name,
      ageGroup: classroom.ageGroup,
      capacity: classroom.capacity.toString(),
      leadTeacher: classroom.leadTeacher,
      assistantTeacher: classroom.assistantTeacher,
    });
    setIsSettingsOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              إدارة الفصول
            </h1>
            <p className="text-muted-foreground">
              إدارة الفصول والسعة وتعيينات المعلمات
            </p>
          </div>
          <Button
            className="gap-2 bg-admin hover:bg-admin/90 text-admin-foreground"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="w-4 h-4" />
            إضافة فصل
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-admin/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-admin" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{classrooms.length}</p>
                  <p className="text-sm text-muted-foreground">إجمالي الفصول</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalEnrolled}</p>
                  <p className="text-sm text-muted-foreground">
                    إجمالي المسجلين
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{classrooms.length * 2}</p>
                  <p className="text-sm text-muted-foreground">المعلمات</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{spotsAvailable}</p>
                  <p className="text-sm text-muted-foreground">
                    الأماكن المتاحة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Card
              key={classroom.id}
              className={`hover-lift border-2 ${classroom.color}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${classroom.color} flex items-center justify-center`}
                    >
                      <Building2 className={`w-5 h-5 ${classroom.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {classroom.name}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {classroom.ageGroup}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openSettings(classroom)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Capacity */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">السعة</span>
                    <span className="font-medium">
                      {classroom.enrolled} / {classroom.capacity}
                    </span>
                  </div>
                  <Progress
                    value={(classroom.enrolled / classroom.capacity) * 100}
                    className="h-2"
                  />
                </div>

                {/* Teachers */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">الطاقم</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs bg-admin-accent">
                        {classroom.leadTeacher
                          .split(' ')
                          .slice(1)
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {classroom.leadTeacher}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        معلمة رئيسية
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs bg-muted">
                        {classroom.assistantTeacher
                          .split(' ')
                          .slice(1)
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {classroom.assistantTeacher}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        معلمة مساعدة
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => openStudents(classroom)}
                  >
                    <Users className="w-3 h-3" />
                    الطلاب
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => openEdit(classroom)}
                  >
                    <Edit className="w-3 h-3" />
                    تعديل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Classroom Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة فصل جديد</DialogTitle>
            <DialogDescription>إنشاء فصل جديد للمركز.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الفصل</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="مثال: فصل الورد"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الفئة العمرية</Label>
                <Select
                  value={formData.ageGroup}
                  onValueChange={(v) =>
                    setFormData({ ...formData, ageGroup: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1 سنة">0-1 سنة</SelectItem>
                    <SelectItem value="1-2 سنة">1-2 سنة</SelectItem>
                    <SelectItem value="2-3 سنوات">2-3 سنوات</SelectItem>
                    <SelectItem value="3-4 سنوات">3-4 سنوات</SelectItem>
                    <SelectItem value="4-5 سنوات">4-5 سنوات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">السعة</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="leadTeacher">المعلمة الرئيسية</Label>
              <Input
                id="leadTeacher"
                value={formData.leadTeacher}
                onChange={(e) =>
                  setFormData({ ...formData, leadTeacher: e.target.value })
                }
                placeholder="مثال: أ. نورة الشمري"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assistantTeacher">المعلمة المساعدة</Label>
              <Input
                id="assistantTeacher"
                value={formData.assistantTeacher}
                onChange={(e) =>
                  setFormData({ ...formData, assistantTeacher: e.target.value })
                }
                placeholder="مثال: أ. منى الحربي"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleAddClassroom}
            >
              إضافة الفصل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Students Dialog */}
      <Dialog open={isStudentsOpen} onOpenChange={setIsStudentsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedClassroom?.name} - الطلاب</DialogTitle>
            <DialogDescription>
              {selectedClassroom?.enrolled} طالب مسجل
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {selectedClassroom?.students.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-admin-accent text-xs">
                      {student
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student}</span>
                </div>
              ))}
              {(!selectedClassroom?.students ||
                selectedClassroom.students.length === 0) && (
                <p className="text-muted-foreground text-center py-4">
                  لا يوجد طلاب مسجلين بعد.
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStudentsOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إعدادات الفصل</DialogTitle>
            <DialogDescription>
              تعديل إعدادات {selectedClassroom?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="settingsCapacity">السعة القصوى</Label>
              <Input
                id="settingsCapacity"
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>الفئة العمرية</Label>
              <Select
                value={formData.ageGroup}
                onValueChange={(v) => setFormData({ ...formData, ageGroup: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1 سنة">0-1 سنة</SelectItem>
                  <SelectItem value="1-2 سنة">1-2 سنة</SelectItem>
                  <SelectItem value="2-3 سنوات">2-3 سنوات</SelectItem>
                  <SelectItem value="3-4 سنوات">3-4 سنوات</SelectItem>
                  <SelectItem value="4-5 سنوات">4-5 سنوات</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={() => {
                handleEditClassroom();
                setIsSettingsOpen(false);
              }}
            >
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Classroom Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل الفصل</DialogTitle>
            <DialogDescription>تحديث بيانات الفصل.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">اسم الفصل</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الفئة العمرية</Label>
                <Select
                  value={formData.ageGroup}
                  onValueChange={(v) =>
                    setFormData({ ...formData, ageGroup: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1 سنة">0-1 سنة</SelectItem>
                    <SelectItem value="1-2 سنة">1-2 سنة</SelectItem>
                    <SelectItem value="2-3 سنوات">2-3 سنوات</SelectItem>
                    <SelectItem value="3-4 سنوات">3-4 سنوات</SelectItem>
                    <SelectItem value="4-5 سنوات">4-5 سنوات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editCapacity">السعة</Label>
                <Input
                  id="editCapacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editLeadTeacher">المعلمة الرئيسية</Label>
              <Input
                id="editLeadTeacher"
                value={formData.leadTeacher}
                onChange={(e) =>
                  setFormData({ ...formData, leadTeacher: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editAssistantTeacher">المعلمة المساعدة</Label>
              <Input
                id="editAssistantTeacher"
                value={formData.assistantTeacher}
                onChange={(e) =>
                  setFormData({ ...formData, assistantTeacher: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleEditClassroom}
            >
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminClassrooms;
