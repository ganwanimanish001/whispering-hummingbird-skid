"use client";

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

const StatCard = ({ title, value, change, isPositive, icon: Icon }: StatCardProps) => {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          </div>
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Icon className="text-indigo-600" size={20} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className={cn(
            "flex items-center text-xs font-bold px-2 py-1 rounded-full",
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
            {change}
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

import { cn } from '@/lib/utils';
export default StatCard;