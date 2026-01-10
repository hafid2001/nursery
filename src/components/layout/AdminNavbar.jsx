import { useState } from 'react';
import {
  Bell,
  Search,
  LogOut,
  User,
  Shield,
  X,
  Edit2,
  Mail,
  Phone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth.context';
import toast from 'react-hot-toast';
import { EditAdminSchema } from '@/schemas/admin.schema';
import { EditAdmin } from '@/services/admin';

const adminData = {
  avatar: '',
};

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const currentDate = new Date().toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      full_name: user?.full_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      full_name: user?.full_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  };

  const handleSave = async () => {
    try {
      // Validate form data using the schema
      EditAdminSchema.parse(formData);
      // Clear any previous errors
      setErrors({});

      await EditAdmin(user.id, formData,{
        onStart : () => {
          setLoading(true)
        },
      onSuccess : () => {
        setProfileOpen(false)
        toast.success("تم تحديث بيانات بنجاح")
        refreshUser(); // Refresh auth context with updated data
      },
        onError : () => {
          toast.error("فشل تحديث البيانات")
        },
        onFinal : () => {
          setLoading(false)
        }
      })
    } catch (validationError) {
      // Handle validation errors
      if (validationError.errors && Array.isArray(validationError.errors)) {
        const formattedErrors = {};
        validationError.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      } else {
        // Handle unexpected errors
        console.error('Validation error:', validationError);
        toast.error('حدث خطأ في التحقق من البيانات');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-admin-accent/50 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-admin hover:bg-admin-accent hover:text-admin-accent-foreground" />
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-foreground">
                لوحة تحكم الإدارة
              </h1>
              <p className="text-sm text-muted-foreground">{currentDate}</p>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="البحث عن المستخدمين، الفصول، التقارير..."
                className="pr-10 bg-admin-muted/50 border-admin-accent/50 focus:border-admin focus:ring-admin"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-admin-accent hover:text-admin-accent-foreground"
              onClick={() => navigate('/admin/notifications')}
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                5
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-admin-accent"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-admin/30">
                    <AvatarImage src={adminData.avatar} alt={user?.full_name} />
                    <AvatarFallback className="bg-admin text-admin-foreground text-sm font-semibold">
                      {user?.full_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium">{user?.full_name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {user?.role}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <User className="ml-2 h-4 w-4" />
                  الملف الشخصي
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-right">
              الملف الشخصي
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24 ring-4 ring-purple-600/20">
                <AvatarImage src={adminData.avatar} alt={user?.full_name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-3xl font-light">
                  {user?.full_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">
                  {user?.full_name}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                  <Shield className="w-3 h-3" />
                  {user?.role}
                </p>
              </div>
            </div>

            {/* Info Fields */}
            <div className="space-y-4 pt-4 border-t">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  الاسم الكامل
                </Label>
                {isEditing ? (
                  <>
                    <Input
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      className={`h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20 ${
                        errors.full_name ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.full_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.full_name}</p>
                    )}
                  </>
                ) : (
                  <div className="h-11 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 flex items-center text-gray-700">
                    {user?.full_name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني
                </Label>
                {isEditing ? (
                  <>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20 ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                  </>
                ) : (
                  <div className="h-11 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 flex items-center text-gray-700">
                    {user?.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  رقم الهاتف
                </Label>
                {isEditing ? (
                  <>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20 ${
                        errors.phone ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </>
                ) : (
                  <div className="h-11 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 flex items-center text-gray-700">
                    {user?.phone || 'لم يتم التحديد'}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 h-11 border-gray-300"
                    disabled={loading}
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 h-11 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        جاري الحفظ
                      </span>
                    ) : (
                      'حفظ التغييرات'
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleEdit}
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
                >
                  <Edit2 className="w-4 h-4 ml-2" />
                  تعديل الملف الشخصي
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminNavbar;
