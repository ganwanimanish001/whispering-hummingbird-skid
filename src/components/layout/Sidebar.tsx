"use client";

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Search, 
  Settings as SettingsIcon, 
  BarChart3,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Sparkles, label: 'AI Post Creator', path: '/posts' },
    { icon: MessageSquare, label: 'Review Assistant', path: '/reviews' },
    { icon: Search, label: 'SEO Audit', path: '/seo' },
    { icon: BarChart3, label: 'Insights', path: '/insights' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full">
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
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 group",
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
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-50">
        <button 
          onClick={() => handleNavigate('/settings')}
          className={cn(
            "flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all",
            location.pathname === '/settings' 
              ? "bg-indigo-50 text-indigo-600" 
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <SettingsIcon size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-100 h-screen flex-col sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles className="text-white" size={18} />
          </div>
          <span className="font-bold text-lg text-gray-900">GMB AI</span>
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-none">
            <SidebarContent onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;