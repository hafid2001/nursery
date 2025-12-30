import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-admin-muted/30">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminNavbar />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
