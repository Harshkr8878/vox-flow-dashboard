import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 p-4 md:hidden">
            <SidebarTrigger />
          </div>
          <div className="p-6 md:p-8 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
