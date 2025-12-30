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
  X,
} from 'lucide-react';

const initialUsers = [
  {
    id: 1,
    name: 'أحمد العتيبي',
    email: 'ahmed.otaibi@email.com',
    phone: '0501234567',
    children: ['سارة العتيبي', 'محمد العتيبي'],
    status: 'active',
    joinDate: '15 يناير 2024',
  },
  {
    id: 2,
    name: 'فاطمة الشمري',
    email: 'fatima.shamri@email.com',
    phone: '0552345678',
    children: ['نورة الشمري'],
    status: 'active',
    joinDate: '20 فبراير 2024',
  },
  {
    id: 3,
    name: 'خالد المالكي',
    email: 'khaled.malki@email.com',
    phone: '0563456789',
    children: ['عمر المالكي', 'ليلى المالكي'],
    status: 'inactive',
    joinDate: '10 مارس 2024',
  },
  {
    id: 4,
    name: 'منى الحربي',
    email: 'mona.harbi@email.com',
    phone: '0574567890',
    children: ['يوسف الحربي'],
    status: 'active',
    joinDate: '5 أبريل 2024',
  },
  {
    id: 5,
    name: 'سعود القحطاني',
    email: 'saud.qahtani@email.com',
    phone: '0585678901',
    children: ['ريم القحطاني', 'فيصل القحطاني'],
    status: 'pending',
    joinDate: '1 مايو 2024',
  },
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] =
    (useState < typeof initialUsers[0]) | (null > null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddParent = () => {
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      children: [],
      status: formData.status,
      joinDate: new Date().toLocaleDateString('ar-SA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
    setUsers([...users, newUser]);
    toast({
      title: 'تمت إضافة ولي الأمر',
      description: `تمت إضافة ${formData.name} بنجاح.`,
    });
    setIsAddOpen(false);
    setFormData({ name: '', email: '', phone: '', status: 'active' });
  };

  const handleEditParent = () => {
    if (!selectedUser) return;
    setUsers(
      users.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u))
    );
    toast({
      title: 'تم تحديث البيانات',
      description: `تم تحديث بيانات ${formData.name}.`,
    });
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteParent = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    toast({
      title: 'تم الحذف',
      description: `تم حذف ${selectedUser.name}.`,
      variant: 'destructive',
    });
    setIsDeleteOpen(false);
    setSelectedUser(null);
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
    });
    setIsEditOpen(true);
  };

  const openView = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const openDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'inactive':
        return 'غير نشط';
      case 'pending':
        return 'قيد الانتظار';
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
              إدارة أولياء الأمور
            </h1>
            <p className="text-muted-foreground">
              إدارة حسابات أولياء الأمور ومعلومات العائلات
            </p>
          </div>
          <Button
            className="gap-2 bg-admin hover:bg-admin/90 text-admin-foreground"
            onClick={() => setIsAddOpen(true)}
          >
            <UserPlus className="w-4 h-4" />
            إضافة ولي أمر
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو البريد أو الهاتف..."
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
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
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

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>جميع أولياء الأمور ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ولي الأمر</TableHead>
                  <TableHead>التواصل</TableHead>
                  <TableHead>الأبناء</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الانضمام</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-admin-accent text-admin-accent-foreground">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.children.map((child) => (
                          <Badge
                            key={child}
                            variant="secondary"
                            className="text-xs"
                          >
                            {child}
                          </Badge>
                        ))}
                        {user.children.length === 0 && (
                          <span className="text-muted-foreground text-sm">
                            لا يوجد أبناء
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === 'active'
                            ? 'default'
                            : user.status === 'pending'
                              ? 'secondary'
                              : 'destructive'
                        }
                        className={
                          user.status === 'active'
                            ? 'bg-success'
                            : user.status === 'pending'
                              ? 'bg-warning text-warning-foreground'
                              : ''
                        }
                      >
                        {getStatusLabel(user.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.joinDate}
                    </TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openView(user)}>
                            <Eye className="w-4 h-4 ml-2" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(user)}>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => openDelete(user)}
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

      {/* Add Parent Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة ولي أمر جديد</DialogTitle>
            <DialogDescription>أدخل بيانات ولي الأمر.</DialogDescription>
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
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleAddParent}
            >
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Parent Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تفاصيل ولي الأمر</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-admin-accent text-admin-accent-foreground text-lg">
                    {selectedUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                  <Badge
                    className={
                      selectedUser.status === 'active'
                        ? 'bg-success'
                        : selectedUser.status === 'pending'
                          ? 'bg-warning'
                          : ''
                    }
                  >
                    {getStatusLabel(selectedUser.status)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  {selectedUser.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  {selectedUser.phone}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">الأبناء</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedUser.children.map((child) => (
                    <Badge key={child} variant="secondary">
                      {child}
                    </Badge>
                  ))}
                  {selectedUser.children.length === 0 && (
                    <span className="text-muted-foreground">
                      لا يوجد أبناء مسجلين
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">تاريخ الانضمام</Label>
                <p>{selectedUser.joinDate}</p>
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
                if (selectedUser) openEdit(selectedUser);
              }}
            >
              تعديل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Parent Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل بيانات ولي الأمر</DialogTitle>
            <DialogDescription>تحديث بيانات ولي الأمر.</DialogDescription>
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
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              إلغاء
            </Button>
            <Button
              className="bg-admin hover:bg-admin/90"
              onClick={handleEditParent}
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
              سيتم حذف {selectedUser?.name} نهائياً. لا يمكن التراجع عن هذا
              الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteParent}
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminUsers;
