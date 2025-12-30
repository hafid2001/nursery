import { Bell, Search, LogOut, Settings, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';

const adminData = {
  name: 'سارة المديرة',
  email: 'admin@littlestars.com',
  avatar: '/placeholder.svg',
  role: 'مديرة النظام',
};

const AdminNavbar = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
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
                  <AvatarImage src={adminData.avatar} alt={adminData.name} />
                  <AvatarFallback className="bg-admin text-admin-foreground text-sm font-semibold">
                    س
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{adminData.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {adminData.role}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>حسابي</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                <User className="ml-2 h-4 w-4" />
                الملف الشخصي
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                <Settings className="ml-2 h-4 w-4" />
                الإعدادات
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate('/')}
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
  );
};

export default AdminNavbar;
