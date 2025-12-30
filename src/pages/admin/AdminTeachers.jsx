import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Mail,
  Phone,
  Edit,
  Trash2,
  Eye,
  Building2,
  X,
} from 'lucide-react';

const initialTeachers = [
  {
    id: 1,
    name: 'أ. نورة الشمري',
    email: 'noura.shamri@littlestars.com',
    phone: '0501112222',
    classroom: 'فصل الشمس',
    role: 'معلمة رئيسية',
    status: 'active',
    hireDate: '15 أغسطس 2022',
  },
  {
    id: 2,
    name: 'أ. سارة العلي',
    email: 'sara.ali@littlestars.com',
    phone: '0552223333',
    classroom: 'فصل قوس قزح',
    role: 'معلمة رئيسية',
    status: 'active',
    hireDate: '10 يناير 2023',
  },
  {
    id: 3,
    name: 'أ. منى الحربي',
    email: 'mona.harbi@littlestars.com',
    phone: '0563334444',
    classroom: 'فصل الشمس',
    role: 'معلمة مساعدة',
    status: 'active',
    hireDate: '20 مارس 2024',
  },
  {
    id: 4,
    name: 'أ. هند القحطاني',
    email: 'hind.qahtani@littlestars.com',
    phone: '0574445555',
    classroom: 'فصل النجوم',
    role: 'معلمة رئيسية',
    status: 'on leave',
    hireDate: '5 يونيو 2021',
  },
  {
    id: 5,
    name: 'أ. ريم المالكي',
    email: 'reem.malki@littlestars.com',
    phone: '0585556666',
    classroom: 'فصل القمر',
    role: 'معلمة مساعدة',
    status: 'active',
    hireDate: '1 سبتمبر 2023',
  },
];

const AdminTeachers = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] =
    (useState < typeof initialTeachers[0]) | (null > null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    classroom: '',
    role: 'معلمة رئيسية',
    status: 'active',
  });

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.classroom.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || teacher.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = teachers.filter((t) => t.status === 'active').length;
  const onLeaveCount = teachers.filter((t) => t.status === 'on leave').length;

  const handleAddTeacher = () => {
    const newTeacher = {
      id: teachers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      classroom: formData.classroom,
      role: formData.role,
      status: formData.status,
      hireDate: new Date().toLocaleDateString('ar-SA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
    setTeachers([...teachers, newTeacher]);
    toast({
      title: 'تمت إضافة المعلمة',
      description: `تمت إضافة ${formData.name} بنجاح.`,
    });
    setIsAddOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      classroom: '',
      role: 'معلمة رئيسية',
      status: 'active',
    });
  };

  const handleEditTeacher = () => {
    if (!selectedTeacher) return;
    setTeachers(
      teachers.map((t) =>
        t.id === selectedTeacher.id ? { ...t, ...formData } : t
      )
    );
    toast({
      title: 'تم تحديث البيانات',
      description: `تم تحديث بيانات ${formData.name}.`,
    });
    setIsEditOpen(false);
    setSelectedTeacher(null);
  };

  const handleDeleteTeacher = () => {
    if (!selectedTeacher) return;
    setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
    toast({
      title: 'تم الحذف',
      description: `تم حذف ${selectedTeacher.name}.`,
      variant: 'destructive',
    });
    setIsDeleteOpen(false);
    setSelectedTeacher(null);
  };

  const openEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      classroom: teacher.classroom,
      role: teacher.role,
      status: teacher.status,
    });
    setIsEditOpen(true);
  };

  const openView = (teacher) => {
    setSelectedTeacher(teacher);
    setIsViewOpen(true);
  };

  const openDelete = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteOpen(true);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'نشطة';
      case 'on leave':
        return 'في إجازة';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              إدارة المعلمات
            </h1>
            <p className="text-muted-foreground">
              إدارة حسابات المعلمات وتعيينات الفصول
            </p>
          </div>
          <Button
            className="gap-2 bg-admin hover:bg-admin/90 text-admin-foreground"
            onClick={() => setIsAddOpen(true)}
          >
            <UserPlus className="w-4 h-4" />
            إضافة معلمة
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-admin">
                  {teachers.length}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي المعلمات</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success">{activeCount}</p>
                <p className="text-sm text-muted-foreground">نشطات</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-warning">
                  {onLeaveCount}
                </p>
                <p className="text-sm text-muted-foreground">في إجازة</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو البريد أو الفصل..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشطة</SelectItem>
                  <SelectItem value="on leave">في إجازة</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || statusFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Teachers Table */}
        <Card>
          <CardHeader>
            <CardTitle>جميع المعلمات ({filteredTeachers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المعلمة</TableHead>
                  <TableHead>التواصل</TableHead>
                  <TableHead>الفصل</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ التعيين</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-admin-accent text-admin-accent-foreground">
                            {teacher.name
                              .split(' ')
                              .slice(1)
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{teacher.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          {teacher.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {teacher.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-admin" />
                        <span>{teacher.classroom}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{teacher.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          teacher.status === 'active'
                            ? 'bg-success'
                            : 'bg-warning text-warning-foreground'
                        }
                      >
                        {getStatusLabel(teacher.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {teacher.hireDate}
                    </TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openView(teacher)}>
                            <Eye className="w-4 h-4 ml-2" />
                            عرض الملف
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(teacher)}>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => openDelete(teacher)}
                          >
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Teacher Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة معلمة جديدة</DialogTitle>
            <DialogDescription>أدخل بيانات المعلمة.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الفصل</Label>
                <Select
                  value={formData.classroom}
                  onValueChange={(v) =>
                    setFormData({ ...formData, classroom: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="فصل الشمس">فصل الشمس</SelectItem>
                    <SelectItem value="فصل قوس قزح">فصل قوس قزح</SelectItem>
                    <SelectItem value="فصل النجوم">فصل النجوم</SelectItem>
                    <SelectItem value="فصل القمر">فصل القمر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الدور</Label>
                <Select
                  value={formData.role}
                  onValueChange={(v) => setFormData({ ...formData, role: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="معلمة رئيسية">معلمة رئيسية</SelectItem>
                    <SelectItem value="معلمة مساعدة">معلمة مساعدة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleAddTeacher}
            >
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Teacher Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ملف المعلمة</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-admin-accent text-admin-accent-foreground text-lg">
                    {selectedTeacher.name
                      .split(' ')
                      .slice(1)
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedTeacher.name}
                  </h3>
                  <Badge
                    className={
                      selectedTeacher.status === 'active'
                        ? 'bg-success'
                        : 'bg-warning'
                    }
                  >
                    {getStatusLabel(selectedTeacher.status)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  {selectedTeacher.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  {selectedTeacher.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  {selectedTeacher.classroom}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">الدور</Label>
                <p>{selectedTeacher.role}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">تاريخ التعيين</Label>
                <p>{selectedTeacher.hireDate}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              إغلاق
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={() => {
                setIsViewOpen(false);
                if (selectedTeacher) openEdit(selectedTeacher);
              }}
            >
              تعديل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل بيانات المعلمة</DialogTitle>
            <DialogDescription>تحديث بيانات المعلمة.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">الاسم الكامل</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">البريد الإلكتروني</Label>
              <Input
                id="editEmail"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhone">رقم الهاتف</Label>
              <Input
                id="editPhone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الفصل</Label>
                <Select
                  value={formData.classroom}
                  onValueChange={(v) =>
                    setFormData({ ...formData, classroom: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="فصل الشمس">فصل الشمس</SelectItem>
                    <SelectItem value="فصل قوس قزح">فصل قوس قزح</SelectItem>
                    <SelectItem value="فصل النجوم">فصل النجوم</SelectItem>
                    <SelectItem value="فصل القمر">فصل القمر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشطة</SelectItem>
                    <SelectItem value="on leave">في إجازة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleEditTeacher}
            >
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف {selectedTeacher?.name} نهائياً. لا يمكن التراجع عن هذا
              الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteTeacher}
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminTeachers;
