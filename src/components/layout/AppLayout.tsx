"use client";

import React from 'react';
import Sidebar from './Sidebar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto mt-16 lg:mt-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;