import {
  Users,
  GraduationCap,
  BookOpen,
  BookMarked,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'profile', label: 'View Profile', icon: User },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'instructors', label: 'Instructors', icon: GraduationCap },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'enrolled', label: 'Enrolled Courses', icon: BookMarked },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setIsMobileOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-300 z-40 flex flex-col shadow-2xl
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          {!isCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-fade-in">
              Admin Panel
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-2 rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all duration-200"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
          <div className={`mb-6 ${isCollapsed ? 'px-2' : 'px-4'} py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm`}>
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                  A
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              {!isCollapsed && (
                <div className="flex-1 animate-fade-in">
                  <h3 className="font-semibold text-white">Admin User</h3>
                  <p className="text-xs text-slate-400">admin@example.com</p>
                </div>
              )}
            </div>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 blur-xl opacity-30 animate-pulse"></div>
                )}
                <Icon size={20} className={`relative z-10 ${isActive ? 'animate-bounce-slow' : 'group-hover:scale-110 transition-transform'}`} />
                {!isCollapsed && (
                  <span className="relative z-10 font-medium animate-fade-in">{item.label}</span>
                )}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={() => handleSectionChange('logout')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden w-full
              text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/20
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            {!isCollapsed && (
              <span className="font-medium animate-fade-in">Logout</span>
            )}
            {isCollapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 animate-fade-in"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </>
  );
};
