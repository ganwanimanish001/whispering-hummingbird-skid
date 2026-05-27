"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PenTool, 
  MessageSquare, 
  Search, 
  Settings, 
  BarChart3,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Sparkles, label: 'AI Post Creator', path: '/posts' },
    { icon: MessageSquare, label: 'Review Assistant', path: '/reviews' },
    { icon: Search, label: 'SEO Audit', path: '/seo' },
    { icon: BarChart3, label: 'Insights', path: '/insights' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 h-screen flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
          <Sparkles className="text-white" size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">GMB AI</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-50 text-indigo-600" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-colors",
                isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"
              )} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;