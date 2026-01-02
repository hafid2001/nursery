import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Search,
  UserPlus,
  MoreHorizontal,
  Mail,
  Phone,
  Eye,
  X,
} from 'lucide-react';
import { addParent, getParentList, approve } from '@/services/admin';
import AddParentDialog from '@/components/AddParentDialog';
import ViewParentDialog from '@/components/ViewParentDialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

// --- Helpers ---
const getStatusLabel = (status) => {
  const labels = {
    PENDING_REVIEW: 'قيد المراجعة',
    APPROVED_AWAITING_PAYMENT: 'بانتظار الدفع',
    ACTIVE: 'نشط',
    SUSPENDED: 'مرفوض',
  };
  return labels[status] || status;
};

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'PENDING_REVIEW':
      return 'bg-warning text-warning-foreground';
    case 'APPROVED_AWAITING_PAYMENT':
      return 'bg-info text-info-foreground';
    case 'ACTIVE':
      return 'bg-success text-success-foreground';
    case 'SUSPENDED':
      return 'bg-destructive text-destructive-foreground';
    default:
      return '';
  }
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    child_full_name: '',
    child_age: '',
    child_gender: '',
    child_date_of_birth: '',
    documents: [],
    status: 'PENDING_REVIEW',
  });

  const loadData = useCallback(
    async (targetPage, shouldAppend) => {
      setLoading(true);

      getParentList(statusFilter, targetPage, {
        onSuccess: (response) => {
          const newData = response.data || [];

          if (shouldAppend) {
            setUsers((prev) => [...prev, ...newData]);
          } else {
            setUsers(newData);
          }
          setHasMore(newData.length > 0);
        },
        onError: () => {
          setUsers([]);
          toast.error('فشل في تحميل قائمة أولياء الأمور');
        },
        onFinal: () => setLoading(false),
      });
    },
    [statusFilter, toast]
  );

  useEffect(() => {
    setPage(1);
    loadData(1, false);
  }, [statusFilter, loadData]);

  useEffect(() => {
    if (page > 1) {
      loadData(page, true);
    }
  }, [page, loadData]);

  // --- Handlers ---
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    switch (newStatus) {
      case 'APPROVED':
        approve(userId, {
          onSuccess: () => {
            setUsers((prev) =>
              prev.map((u) =>
                u.id === userId
                  ? { ...u, status: 'APPROVED_AWAITING_PAYMENT' }
                  : u
              )
            );
            toast.success('تم تغيير حالة المستخدم بنجاح');
          },
          onError: () => {
            toast.error('فشل في تغيير حالة المستخدم');
          },
        });
        break;
      case 'REJECTED':
        reject(userId, {
          onSuccess: () => {
            setUsers((prev) =>
              prev.map((u) =>
                u.id === userId ? { ...u, status: 'SUSPENDED' } : u
              )
            );
            toast.success('تم تغيير حالة المستخدم بنجاح');
          },
          onError: () => {
            toast.error('فشل في تغيير حالة المستخدم');
          },
        });
        break;
      default:
        break;
    }
  };

  const openView = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleAddParent = async (formData) => {
    const newUser = {
      id: users.length + 1,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      child: [
        {
          full_name: formData.child_full_name,
          age: formData.child_age,
          gender: formData.child_gender,
          date_of_birth: formData.child_date_of_birth,
          documents: formData.documents || [],
        },
      ],
    };

    addParent(newUser, {
      onStart: setLoading,
      onSuccess: () => {
        setUsers([...users, newUser]);
        toast.success('تمت إضافة ولي الأمر');
      },
      onError: () => {
        toast.error('فشل إضافة ولي الأم');
      },
    });
  };

  // Client-side Filter for Search
  const filteredUsers = users.filter((u) => {
    const term = searchQuery.toLowerCase();
    return (
      u.full_name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.phone?.includes(term)
    );
  });

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
            <UserPlus className="w-4 h-4" /> إضافة ولي أمر
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو البريد أو الهاتف..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="PENDING_REVIEW">قيد المراجعة</SelectItem>
                  <SelectItem value="APPROVED_AWAITING_PAYMENT">
                    بانتظار الدفع
                  </SelectItem>
                  <SelectItem value="ACTIVE">نشط</SelectItem>
                  <SelectItem value="SUSPENDED">مرفوض</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead>الطفل</TableHead>
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
                          <AvatarFallback className="bg-admin-accent text-admin-accent-foreground">
                            {user.full_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.full_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" /> {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-3 h-3" /> {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {user.children?.length || 0} طفل
                        </div>
                        {user.children && user.children.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {user.children
                              .map((child) => child.full_name)
                              .join(', ')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge
                            className={`${getStatusBadgeStyle(user.status)} cursor-pointer`}
                          >
                            {getStatusLabel(user.status)}
                          </Badge>
                        </DropdownMenuTrigger>
                        {user.status === 'PENDING_REVIEW' && (
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>{
                                handleStatusChange(user.parent_id, 'APPROVED')
                              }
                              }
                            >
                              موافقة
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user.parent_id, 'REJECTED')
                              }
                              className="text-destructive"
                            >
                              رفض
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        )}
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString('ar', {
                            numberingSystem: 'latn',
                          })
                        : '-'}
                    </TableCell>
                    <TableCell className="text-left">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openView(user)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {!loading && filteredUsers.length === 0 && (
              <div className="py-10 text-center text-muted-foreground">
                لا يوجد نتائج.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center pb-10">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              variant="outline"
              className="w-32"
            >
              {loading ? 'جاري التحميل...' : 'تحميل المزيد'}
            </Button>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AddParentDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onAddParent={handleAddParent}
        formData={formData}
        setFormData={setFormData}
      />
      <ViewParentDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        user={selectedUser}
      />
    </AdminLayout>
  );
};

export default AdminUsers;
