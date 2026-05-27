"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Image as ImageIcon, 
  Plus, 
  MoreVertical, 
  Eye, 
  Trash2, 
  Upload,
  Filter
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

const Media = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const photos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop', category: 'interior', views: '1.2k', date: '2 days ago' },
    { id: 2, url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop', category: 'food', views: '850', date: '5 days ago' },
    { id: 3, url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=500&fit=crop', category: 'exterior', views: '2.4k', date: '1 week ago' },
    { id: 4, url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&h=500&fit=crop', category: 'food', views: '620', date: '2 weeks ago' },
    { id: 5, url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=500&fit=crop', category: 'interior', views: '1.1k', date: '3 weeks ago' },
    { id: 6, url: 'https://images.unsplash.com/photo-1525610553991-2bede1a233e9?w=500&h=500&fit=crop', category: 'exterior', views: '980', date: '1 month ago' },
  ];

  const handleUpload = () => {
    const toastId = showLoading("Uploading photo to Google...");
    setTimeout(() => {
      dismissToast(toastId);
      showSuccess("Photo uploaded successfully!");
    }, 1500);
  };

  const filteredPhotos = activeTab === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeTab);

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Manager</h1>
          <p className="text-gray-500 mt-1">Manage your business photos and track their performance.</p>
        </div>
        <Button onClick={handleUpload} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11">
          <Upload size={18} className="mr-2" />
          Upload New Photo
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {['all', 'interior', 'exterior', 'food', 'team'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-6 h-9 text-sm capitalize ${
              activeTab === tab ? 'bg-indigo-600' : 'border-gray-200 text-gray-500'
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="group border-none shadow-sm overflow-hidden bg-white">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={photo.url} 
                alt="Business" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button size="icon" variant="secondary" className="rounded-full w-10 h-10">
                  <Eye size={18} />
                </Button>
                <Button size="icon" variant="destructive" className="rounded-full w-10 h-10">
                  <Trash2 size={18} />
                </Button>
              </div>
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md text-gray-700">
                  {photo.category}
                </span>
              </div>
            </div>
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-500">
                  <Eye size={14} />
                  <span className="text-xs font-medium">{photo.views}</span>
                </div>
                <span className="text-[10px] text-gray-400">{photo.date}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem>Edit Caption</DropdownMenuItem>
                  <DropdownMenuItem>Change Category</DropdownMenuItem>
                  <DropdownMenuItem className="text-rose-600">Delete Photo</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
        
        <button 
          onClick={handleUpload}
          className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
            <Plus size={24} />
          </div>
          <span className="text-sm font-medium">Add more photos</span>
        </button>
      </div>
    </AppLayout>
  );
};

export default Media;