"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Search, MapPin, Globe, Phone } from 'lucide-react';

const SEO = () => {
  const auditItems = [
    {
      title: "Business Name",
      status: "success",
      description: "Your business name is clear and doesn't contain keyword stuffing.",
      icon: Search
    },
    {
      title: "NAP Consistency",
      status: "warning",
      description: "Address format on your website differs slightly from your GMB profile.",
      icon: MapPin
    },
    {
      title: "Website Link",
      status: "success",
      description: "Your website is verified and uses HTTPS.",
      icon: Globe
    },
    {
      title: "Primary Category",
      status: "success",
      description: "You are listed in the most relevant primary category for your industry.",
      icon: Search
    },
    {
      title: "Phone Number",
      status: "success",
      description: "Local area code detected, which helps with local ranking.",
      icon: Phone
    },
    {
      title: "Description Keywords",
      status: "warning",
      description: "Missing 2 high-volume local keywords in your business description.",
      icon: Search
    }
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SEO Audit</h1>
        <p className="text-gray-500 mt-1">Analyze your local search visibility and fix ranking issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Audit Results</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50">
                {auditItems.map((item, i) => (
                  <div key={i} className="p-6 flex gap-4 items-start">
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      item.status === 'success' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        {item.status === 'success' ? (
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        ) : (
                          <AlertCircle size={16} className="text-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    {item.status === 'warning' && (
                      <Button variant="outline" size="sm" className="rounded-xl text-xs border-amber-200 text-amber-700 hover:bg-amber-50">
                        Fix Issue
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-indigo-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Local Rank Tracker</h3>
              <p className="text-indigo-100 text-sm mb-6">See where you rank in the "Local Pack" for your top keywords.</p>
              <div className="space-y-4">
                {[
                  { kw: 'Coffee Shop Near Me', rank: '#2' },
                  { kw: 'Best Espresso', rank: '#5' },
                  { kw: 'Local Cafe', rank: '#1' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/10 p-3 rounded-xl">
                    <span className="text-sm font-medium">{item.kw}</span>
                    <span className="font-bold">{item.rank}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold">
                View Full Report
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Competitor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">You are currently outranking 3 out of 5 local competitors.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Your Business</span>
                  <div className="w-24 h-2 bg-indigo-600 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Competitor A</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Competitor B</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full" />
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
export default SEO;