import { Bell, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';

// Mock data
const teacherData = {
  name: 'سارة أحمد',
  email: 'sarah.ahmed@childcare.com',
  avatar: '',
};

const notifications = [
  {
    id: 1,
    title: 'رسالة جديدة من ولي أمر ليلى',
    time: 'منذ 5 دقائق',
    unread: true,
  },
  {
    id: 2,
    title: 'تذكير بالحضور',
    time: 'منذ 30 دقيقة',
    unread: true,
  },
  {
    id: 3,
    title: 'اجتماع الموظفين الساعة 3 مساءً',
    time: 'منذ ساعة',
    unread: false,
  },
];

const unreadCount = notifications.filter((n) => n.unread).length;

export function TeacherNavbar() {
  const today = new Date().toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>

          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-foreground">
              صباح الخير، {teacherData.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث عن الأطفال..."
                className="pr-9 w-64 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-secondary-foreground">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-semibold">
                الإشعارات
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    {notification.unread && (
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    )}
                    <span
                      className={`text-sm ${
                        notification.unread ? 'font-medium' : ''
                      }`}
                    >
                      {notification.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-primary cursor-pointer">
                عرض جميع الإشعارات
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={teacherData.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    سأ
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{teacherData.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {teacherData.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>ملفي الشخصي</DropdownMenuItem>
              <DropdownMenuItem>الإعدادات</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
