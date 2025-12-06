import { Home, CheckSquare, BarChart3, Calendar, Settings, Mic } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Tasks', url: '/tasks', icon: CheckSquare },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { isListening, voiceStatus } = useDashboard();

  return (
    <Sidebar className="border-r border-border/50 bg-sidebar">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
            isListening 
              ? "bg-primary text-primary-foreground glow-effect" 
              : "bg-gradient-to-br from-primary to-accent text-primary-foreground"
          )}>
            <Mic className={cn("w-5 h-5", isListening && "animate-pulse")} />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Voice Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              {isListening ? 'Listening...' : 'AI-Powered'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                      activeClassName="bg-primary/10 text-primary border border-primary/20"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              voiceStatus === 'listening' ? "bg-primary animate-pulse" :
              voiceStatus === 'processing' ? "bg-warning animate-pulse" :
              voiceStatus === 'error' ? "bg-destructive" :
              "bg-muted-foreground"
            )} />
            <span className="text-xs font-medium text-foreground">
              {voiceStatus === 'listening' ? 'Listening' :
               voiceStatus === 'processing' ? 'Processing' :
               voiceStatus === 'error' ? 'Error' :
               'Ready'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Say "Hey" to start a command
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
