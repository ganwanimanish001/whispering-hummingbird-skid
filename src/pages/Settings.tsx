"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Phone, 
  Save,
  ShieldCheck,
  Key
} from 'lucide-react';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

const Settings = () => {
  const [businessData, setBusinessData] = useState({
    name: 'My Local Business',
    category: 'Coffee Shop',
    address: '123 Main St, Anytown, USA',
    website: 'https://example.com',
    phone: '(555) 123-4567',
    description: 'The best local coffee shop in town serving organic beans and fresh pastries.'
  });

  const handleSave = () => {
    const toastId = showLoading("Saving your profile settings...");
    
    // Simulate saving
    setTimeout(() => {
      dismissToast(toastId);
      showSuccess("Settings updated successfully!");
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your Google Business Profile details and AI preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Building2 className="text-indigo-600" size={20} />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name</Label>
                  <Input 
                    id="name" 
                    value={businessData.name} 
                    onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Primary Category</Label>
                  <Input 
                    id="category" 
                    value={businessData.category} 
                    onChange={(e) => setBusinessData({...businessData, category: e.target.value})}
                    className="rounded-xl border-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input 
                    id="address" 
                    value={businessData.address} 
                    onChange={(e) => setBusinessData({...businessData, address: e.target.value})}
                    className="pl-10 rounded-xl border-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
                    <Input 
                      id="website" 
                      value={businessData.website} 
                      onChange={(e) => setBusinessData({...businessData, website: e.target.value})}
                      className="pl-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <Input 
                      id="phone" 
                      value={businessData.phone} 
                      onChange={(e) => setBusinessData({...businessData, phone: e.target.value})}
                      className="pl-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description (SEO Optimized)</Label>
                <Textarea 
                  id="description" 
                  value={businessData.description} 
                  onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                  className="min-h-[120px] rounded-xl border-gray-200"
                />
                <p className="text-xs text-gray-400">This description will be used by the AI to generate relevant posts and responses.</p>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50/50 border-t border-gray-100 p-6 rounded-b-xl">
              <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl ml-auto">
                <Save size={18} className="mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="text-indigo-600" size={20} />
                GMB API Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-emerald-800">Connected to Google Business Profile API</span>
                </div>
                <Button variant="outline" size="sm" className="text-xs rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                  Refresh Token
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Location ID</Label>
                <div className="flex gap-2">
                  <Input value="loc_9823471239" readOnly className="bg-gray-50 rounded-xl border-gray-200 font-mono text-xs" />
                  <Button variant="ghost" size="sm" className="text-indigo-600">Copy</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Key className="text-indigo-600" size={20} />
                AI Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Tone of Voice</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Professional', 'Friendly', 'Casual', 'Excited'].map((tone) => (
                    <Button 
                      key={tone} 
                      variant={tone === 'Friendly' ? 'default' : 'outline'}
                      className={cn(
                        "text-xs rounded-xl h-9",
                        tone === 'Friendly' ? "bg-indigo-600" : "border-gray-200"
                      )}
                    >
                      {tone}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Auto-Response</Label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Respond to 5-star reviews</span>
                  <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

import { cn } from '@/lib/utils';
export default Settings;