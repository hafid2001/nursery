import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Home,
  User,
  FileText,
  TrendingUp,
  Calendar,
  FolderOpen,
  Bell,
  CreditCard,
  Baby,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth.context';
import { ParentServices } from '@/schemas/parent.schema';

const navigationItems = [
  { title: 'الرئيسية', url: '/', icon: Home },
  { title: 'ملف الطفل', url: '/child-profile', icon: User },
  { title: 'التقارير اليومية', url: '/daily-reports', icon: FileText },
  { title: 'تقارير التقدم', url: '/progress-reports', icon: TrendingUp },
  { title: 'الحضور', url: '/attendance', icon: Calendar },
  { title: 'المستندات', url: '/documents', icon: FolderOpen },
  { title: 'الإشعارات', url: '/notifications', icon: Bell },
  { title: 'المدفوعات', url: '/payments', icon: CreditCard },
];

export function ParentSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isCollapsed = state === 'collapsed';

  useEffect(() => {
    fetchChildData();
  }, []);

  const fetchChildData = async () => {
    try {
      setLoading(true);
      await ParentServices.getChildDetails({
        onSuccess: (response) => {
          if (response.data && response.data.length > 0) {
            const child = response.data[0]; // Use first child for now
            setChildData({
              name: `${child.first_name} ${child.last_name}`,
              age: calculateAge(child.date_of_birth),
              classroom: child.classroom || 'غير محدد',
              avatar: '',
              isPresent: true, // This would come from attendance API
            });
          }
        },
        onError: (error) => {
          console.error('Failed to fetch child data:', error);
        },
      });
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return 'غير محدد';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    )
      age--;
    return `${age} سنوات`;
  };

  return (
    <Sidebar collapsible="icon" className="border-l border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-primary ring-2 ring-primary/20">
              <AvatarImage src={childData?.avatar || ''} alt={childData?.name || 'Child'} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                <Baby className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            {childData?.isPresent && (
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-sidebar" />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              {loading ? (
                <>
                  <span className="font-semibold text-sidebar-foreground">جاري التحميل...</span>
                  <span className="text-xs text-muted-foreground">يرجى الانتظار</span>
                </>
              ) : childData ? (
                <>
                  <span className="font-semibold text-sidebar-foreground truncate">
                    {childData.name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {childData.classroom}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`mt-1 text-xs w-fit ${
                      childData.isPresent
                        ? 'bg-success/20 text-success-foreground border-success/30'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {childData.isPresent ? 'حاضر اليوم' : 'لم يسجل الحضور'}
                  </Badge>
                </>
              ) : (
                <>
                  <span className="font-semibold text-sidebar-foreground">لا توجد بيانات</span>
                  <span className="text-xs text-muted-foreground">لم يتم العثور على طفل</span>
                </>
              )}
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
            التنقل
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={`
                        group relative rounded-xl transition-all duration-200
                        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                        ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : ''
                        }
                      `}
                    >
                      <NavLink
                        to={item.url}
                        end
                        className="flex items-center gap-3 px-3 py-2.5"
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-primary-foreground' : 'text-primary'}`}
                        />
                        <span
                          className={`font-medium ${isActive ? 'text-primary-foreground' : ''}`}
                        >
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🌈 حضانة النجوم الصغيرة
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
