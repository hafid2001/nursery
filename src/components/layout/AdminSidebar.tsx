import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  CreditCard,
  Shield,
  Globe,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';

const mainNavItems = [
  { title: 'لوحة التحكم', url: '/admin', icon: LayoutDashboard },
  { title: 'أولياء الأمور', url: '/admin/users', icon: Users },
  { title: 'المعلمات', url: '/admin/teachers', icon: GraduationCap },
  { title: 'الفصول', url: '/admin/classrooms', icon: Building2 },
];

const managementItems = [
  { title: 'المدفوعات', url: '/admin/payments', icon: CreditCard },
  { title: 'الموقع', url: '/admin/website', icon: Globe },
];


const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className="border-l border-admin-accent/50 bg-admin-sidebar">
      <SidebarHeader className="p-4 border-b border-admin-accent/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-admin flex items-center justify-center shadow-md">
            <Shield className="w-5 h-5 text-admin-foreground" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-admin-sidebar-foreground">
              لوحة الإدارة
            </h2>
            <p className="text-xs text-admin-muted-foreground">إدارة النظام</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-admin-muted-foreground text-xs font-semibold uppercase tracking-wider px-3 mb-2">
            الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-all duration-200 ${
                      isActive(item.url)
                        ? 'bg-admin text-admin-foreground shadow-md'
                        : 'text-admin-sidebar-foreground hover:bg-admin-accent hover:text-admin-accent-foreground'
                    }`}
                  >
                    <NavLink to={item.url} end={item.url === '/admin'}>
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-admin-muted-foreground text-xs font-semibold uppercase tracking-wider px-3 mb-2">
            الإدارة
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-all duration-200 ${
                      isActive(item.url)
                        ? 'bg-admin text-admin-foreground shadow-md'
                        : 'text-admin-sidebar-foreground hover:bg-admin-accent hover:text-admin-accent-foreground'
                    }`}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-admin-accent/50">
        <div className="text-xs text-admin-muted-foreground text-center">
          © 2024 حضانة النجوم الصغيرة
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
