import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  ServerCrash,
  Settings,
  Shield,
  Menu,
  X,
  Globe,
  Bell
} from 'lucide-react';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Secrecy Rates', icon: LineChart, path: '/secrecy-rates' },
    { name: 'System Status', icon: ServerCrash, path: '/system-status' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold">MISO Twin</span>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-2 py-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">MISO Security System</p>
              <p className="text-xs text-gray-400">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button 
                className="text-gray-400 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-lg font-semibold">
                  {navigation.find(nav => isActive(nav.path))?.name || 'MISO Digital Twin'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-400 hover:text-white">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium">AD</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;