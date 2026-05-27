"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import StatCard from '@/components/dashboard/StatCard';
import { Eye, MousePointer2, MessageSquare, Star, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's how your business is performing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Views" 
          value="12,482" 
          change="+14.2%" 
          isPositive={true} 
          icon={Eye} 
        />
        <StatCard 
          title="Website Clicks" 
          value="842" 
          change="+5.7%" 
          isPositive={true} 
          icon={MousePointer2} 
        />
        <StatCard 
          title="New Reviews" 
          value="24" 
          change="-2.1%" 
          isPositive={false} 
          icon={MessageSquare} 
        />
        <StatCard 
          title="Avg. Rating" 
          value="4.8" 
          change="+0.2" 
          isPositive={true} 
          icon={Star} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Optimization Health</CardTitle>
            <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-100 hover:bg-indigo-50">
              Run Full Audit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8 mb-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-100"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 * (1 - 0.85)}
                    className="text-indigo-600"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">85%</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Score</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Profile Completeness</span>
                    <span className="text-indigo-600 font-bold">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Keyword Optimization</span>
                    <span className="text-indigo-600 font-bold">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Review Response Rate</span>
                    <span className="text-indigo-600 font-bold">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900">Critical Actions</h4>
              <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <AlertCircle className="text-amber-600" size={18} />
                <p className="text-sm text-amber-800">3 reviews haven't been responded to in over 48 hours.</p>
                <Button variant="ghost" size="sm" className="ml-auto text-amber-700 hover:bg-amber-100">Fix Now</Button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                <CheckCircle2 className="text-indigo-600" size={18} />
                <p className="text-sm text-indigo-800">Your business hours are up to date for the upcoming holiday.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { type: 'post', text: 'AI generated a new "Special Offer" post', time: '2h ago' },
                { type: 'review', text: 'New 5-star review from Sarah J.', time: '5h ago' },
                { type: 'update', text: 'Profile description updated with SEO keywords', time: '1d ago' },
                { type: 'photo', text: '3 new photos uploaded to gallery', time: '2d ago' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 rounded-xl">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;