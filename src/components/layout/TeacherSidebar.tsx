import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  MessageSquare,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const navigationItems = [
  {
    title: 'لوحة التحكم',
    url: '/teacher',
    icon: LayoutDashboard,
  },
  {
    title: 'صفي',
    url: '/teacher/classroom',
    icon: Users,
  },
  {
    title: 'التقارير اليومية',
    url: '/teacher/daily-reports',
    icon: FileText,
  },
  {
    title: 'الحضور',
    url: '/teacher/attendance',
    icon: Calendar,
  },
  {
    title: 'تقارير التقدم',
    url: '/teacher/progress-reports',
    icon: TrendingUp,
  },
  {
    title: 'الرسائل',
    url: '/teacher/messages',
    icon: MessageSquare,
  },
];

// Mock teacher data
const teacherData = {
  name: 'أ. سارة أحمد',
  avatar: '',
  classroom: 'غرفة الشمس',
  childrenCount: 12,
};

export function TeacherSidebar() {
  return (
    <Sidebar className="border-l border-border/50">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground">
              لوحة المعلمة
            </h2>
            <p className="text-xs text-muted-foreground">منصة رعاية الأطفال</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Teacher Profile Card */}
        <div className="mx-2 mb-4 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-primary/30">
              <AvatarImage src={teacherData.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                سأ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {teacherData.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {teacherData.classroom}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Users className="w-3 h-3 ml-1" />
              {teacherData.childrenCount} طفل
            </Badge>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            التنقل
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/teacher'}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 group"
                      activeClassName="bg-primary/10 text-primary font-medium shadow-sm"
                    >
                      <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 w-full">
                <LogOut className="w-5 h-5" />
                <span>تسجيل الخروج</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
