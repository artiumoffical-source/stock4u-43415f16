import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Gift, 
  Users, 
  Shield, 
  FileText, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Package, label: 'הזמנות', path: '/admin/orders' },
  { icon: Gift, label: 'מתנות', path: '/admin/gifts' },
  { icon: Users, label: 'לקוחות', path: '/admin/customers' },
  { icon: Shield, label: 'מנהלים', path: '/admin/users' },
  { icon: FileText, label: 'יומן פעולות', path: '/admin/logs' },
  { icon: Settings, label: 'הגדרות', path: '/admin/settings' },
];

export function AdminSidebar({ isOpen, onToggle, mobileOpen, onMobileClose }: AdminSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed left-0 top-0 h-screen bg-card border-l border-border transition-all duration-300 z-40",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="h-20 flex items-center justify-between px-4 border-b border-border">
            {isOpen && (
              <div>
                <h2 className="font-bold text-xl text-primary">Stock4U</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
            <button
              onClick={onToggle}
              className={cn(
                "p-2 hover:bg-muted rounded-lg transition-colors",
                !isOpen && "mx-auto"
              )}
            >
              <ChevronRight 
                className={cn(
                  "h-5 w-5 transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    "hover:bg-muted",
                    isActive && "bg-primary/10 text-primary font-medium",
                    !isActive && "text-muted-foreground",
                    !isOpen && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onMobileClose}
          />
          <aside className="lg:hidden fixed right-0 top-16 bottom-0 w-64 bg-card border-l border-border z-50">
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      "hover:bg-muted",
                      isActive && "bg-primary/10 text-primary font-medium",
                      !isActive && "text-muted-foreground"
                    )
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
