"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { BarChart3, Users, MousePointer2, Phone } from 'lucide-react';

const data = [
  { name: 'Mon', views: 400, clicks: 24, calls: 12 },
  { name: 'Tue', views: 300, clicks: 13, calls: 8 },
  { name: 'Wed', views: 200, clicks: 98, calls: 22 },
  { name: 'Thu', views: 278, clicks: 39, calls: 15 },
  { name: 'Fri', views: 189, clicks: 48, calls: 10 },
  { name: 'Sat', views: 239, clicks: 38, calls: 18 },
  { name: 'Sun', views: 349, clicks: 43, calls: 21 },
];

const Insights = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Performance Insights</h1>
        <p className="text-gray-500 mt-1">Deep dive into your Google Business Profile metrics and customer behavior.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Users size={16} className="text-indigo-600" />
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,954</div>
            <p className="text-xs text-emerald-600 font-bold mt-1">+12.5% from last week</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <MousePointer2 size={16} className="text-indigo-600" />
              Website Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-emerald-600 font-bold mt-1">+5.2% from last week</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Phone size={16} className="text-indigo-600" />
              Call Button Taps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">106</div>
            <p className="text-xs text-rose-600 font-bold mt-1">-2.1% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Visibility Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Customer Actions</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} dot={{r: 4}} />
                  <Line type="monotone" dataKey="calls" stroke="#f59e0b" strokeWidth={2} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Search Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { query: 'coffee shop near me', volume: '1.2k', trend: '+15%' },
                  { query: 'best espresso in town', volume: '840', trend: '+8%' },
                  { query: 'organic coffee beans', volume: '620', trend: '+22%' },
                  { query: 'quiet place to work', volume: '450', trend: '-3%' },
                  { query: 'fresh pastries', volume: '310', trend: '+12%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <span className="text-sm font-medium text-gray-700">{item.query}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">{item.volume}</span>
                      <span className={`text-xs font-bold ${item.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Insights;