import { SidebarProvider } from '@/components/ui/sidebar';
import { TeacherSidebar } from './TeacherSidebar';
import { TeacherNavbar } from './TeacherNavbar';

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <TeacherSidebar />
        <div className="flex-1 flex flex-col">
          <TeacherNavbar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto animate-fade-in">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
