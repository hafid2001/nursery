import { Bell, ChevronDown, Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth.context';

// Mock notifications count - in a real app, this would come from an API
const unreadNotifications = 3;

export function ParentNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const today = new Date().toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLogout = async () => {
    await logout({
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-foreground">
              مرحباً بعودتك،{' '}
              <span className="text-primary">
                {user?.full_name?.split(' ')[0] || 'والد'}
              </span>
              ! 👋
            </h2>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-secondary"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs font-bold animate-bounce-gentle">
                {unreadNotifications}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-full hover:bg-secondary px-2 py-1"
              >
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarImage src="" alt={user?.full_name || 'Parent'} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-bold">
                    {user?.full_name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('') || 'P'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">
                  {user?.full_name || 'الوالد'}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.full_name || 'الوالد'}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || 'email@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/child-profile')}>
                👶 ملف الطفل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/notifications')}>
                🔔 الإشعارات
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/payments')}>
                💳 المدفوعات
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                🚪 تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
