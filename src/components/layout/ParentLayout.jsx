import { SidebarProvider } from '@/components/ui/sidebar';
import { ParentSidebar } from './ParentSidebar';
import { ParentNavbar } from './ParentNavbar';

export function ParentLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ParentSidebar />
        <div className="flex-1 flex flex-col">
          <ParentNavbar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto animate-fade-in">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
