import { useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '@/components/layout/AdminLayout.jsx';
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
  Edit,
  Eye,
  Building2,
  X,
} from 'lucide-react';
import { Loading } from '@/components/ui/loading';
import { getTeacherList } from '@/services/admin';
import AddTeacherDialog from '@/components/teacher/AddTeacherDialog';
import ViewTeacherDialog from '@/components/teacher/ViewTeacherDialog';
import EditTeacherDialog from '@/components/teacher/EditTeacherDialog';
import TeacherStats from '@/components/teacher/TeacherStats';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // 🔒 prevents infinite fetch
  const loadingRef = useRef(false);

  /* -------------------- DATA LOADER -------------------- */
  const loadData = useCallback(
    (targetPage, shouldAppend) => {
      if (loadingRef.current) return;

      loadingRef.current = true;
      setLoading(true);

      getTeacherList(statusFilter, targetPage, {
        onSuccess: (response) => {
          const newData = response.data || [];

          setTeachers((prev) =>
            shouldAppend ? [...prev, ...newData] : newData
          );

          setHasMore(response.page < response.totalPages);
        },
        onError: () => {
          setTeachers([]);
          setHasMore(false);
        },
        onFinal: () => {
          loadingRef.current = false;
          setLoading(false);
        },
      });
    },
    [statusFilter]
  );

  /* -------------------- FILTER CHANGE -------------------- */
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadData(1, false);
  }, [statusFilter, loadData]);

  /* -------------------- PAGINATION -------------------- */
  useEffect(() => {
    if (page > 1) {
      loadData(page, true);
    }
  }, [page, loadData]);

  /* -------------------- LOAD MORE -------------------- */
  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    setPage((prev) => prev + 1);
  };

  /* -------------------- SEARCH -------------------- */
  const filteredTeachers = teachers.filter((teacher) => {
    const q = searchQuery.toLowerCase();
    return (
      teacher.full_name?.toLowerCase().includes(q) ||
      teacher.email?.toLowerCase().includes(q) ||
      (teacher.classroom_name &&
        teacher.classroom_name.toLowerCase().includes(q))
    );
  });

  const openView = (teacher) => {
    setSelectedTeacher(teacher);
    setIsViewOpen(true);
  };

  const openEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditOpen(true);
  };

  const refreshData = () => {
    setPage(1);
    setHasMore(true);
    loadData(1, false);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'نشطة';
      case 'UNACTIVE':
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
            <h1 className="text-2xl md:text-3xl font-bold">إدارة المعلمات</h1>
            <p className="text-muted-foreground">
              إدارة حسابات المعلمات وتعيينات الفصول
            </p>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>
            <UserPlus className="w-4 h-4 ml-2" />
            إضافة معلمة
          </Button>
        </div>

        <TeacherStats />

        {/* Search & Filter */}
        <Card>
          <CardContent className="pt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pr-10"
                placeholder="البحث بالاسم أو البريد أو الفصل..."
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
                <SelectItem value="ACTIVE">نشطة</SelectItem>
                <SelectItem value="UNACTIVE">في إجازة</SelectItem>
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
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ التعيين</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.teacher_id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {teacher.full_name
                              ?.split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{teacher.full_name}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3" />
                          {teacher.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3" />
                          {teacher.phone}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {teacher.classroom_name || 'غير محدد'}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          teacher.status === 'ACTIVE'
                            ? 'bg-success'
                            : 'bg-warning'
                        }
                      >
                        {getStatusLabel(teacher.status)}
                      </Badge>
                    </TableCell>

                    <TableCell>{teacher.created_at?.split('T')[0]}</TableCell>

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
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
              {loading ? (
                <Loading variant="button" text="جاري التحميل..." />
              ) : (
                'تحميل المزيد'
              )}
            </Button>
          </div>
        )}
      </div>

      <AddTeacherDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        refreshData={refreshData}
      />
      <ViewTeacherDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        teacher={selectedTeacher}
        onEdit={openEdit}
      />
      <EditTeacherDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        teacher={selectedTeacher}
        refreshData={refreshData}
      />
    </AdminLayout>
  );
};

export default AdminTeachers;
