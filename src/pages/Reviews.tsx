"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Sparkles, Check } from 'lucide-react';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Sarah Jenkins",
      rating: 5,
      text: "Absolutely loved the service here! The staff was incredibly helpful and the atmosphere was perfect. Will definitely be coming back.",
      date: "2 days ago",
      replied: false,
      aiResponse: ""
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      text: "Great experience overall. The only minor issue was the wait time, but the quality made up for it.",
      date: "4 days ago",
      replied: true,
      aiResponse: "Thank you for the feedback, Michael! We're working on improving our wait times."
    },
    {
      id: 3,
      author: "David Wilson",
      rating: 5,
      text: "Best in town, hands down. Highly recommend to anyone looking for quality work.",
      date: "1 week ago",
      replied: false,
      aiResponse: ""
    }
  ]);

  const generateResponse = (id: number) => {
    const toastId = showLoading("AI is analyzing the review...");
    
    setTimeout(() => {
      setReviews(prev => prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            aiResponse: `Hi ${r.author.split(' ')[0]}, thank you so much for the ${r.rating}-star review! We're thrilled you enjoyed your experience with us. We look forward to seeing you again soon!`
          };
        }
        return r;
      }));
      dismissToast(toastId);
      showSuccess("AI response generated!");
    }, 1500);
  };

  const handlePostResponse = (id: number) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) return { ...r, replied: true };
      return r;
    }));
    showSuccess("Response posted to Google!");
  };

  return (
    <AppLayout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Review Assistant</h1>
          <p className="text-gray-500 mt-1">Manage and respond to customer feedback with AI assistance.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Response Rate</p>
            <p className="text-2xl font-bold text-indigo-600">88%</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
            <p className="text-2xl font-bold text-amber-500">4.8</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    {review.author[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.author}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
                {review.replied && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <Check size={12} /> Replied
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{review.text}</p>

              {!review.replied ? (
                <div className="space-y-4">
                  {review.aiResponse ? (
                    <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                      <div className="flex items-center gap-2 mb-2 text-indigo-600">
                        <Sparkles size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">AI Suggested Response</span>
                      </div>
                      <p className="text-sm text-gray-800 italic mb-4">"{review.aiResponse}"</p>
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handlePostResponse(review.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-9 text-xs"
                        >
                          Post Response
                        </Button>
                        <Button variant="outline" className="rounded-xl h-9 text-xs border-gray-200">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => generateResponse(review.id)}
                      variant="outline" 
                      className="w-full border-indigo-100 text-indigo-600 hover:bg-indigo-50 rounded-xl"
                    >
                      <Sparkles size={16} className="mr-2" />
                      Generate AI Response
                    </Button>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Your Response</p>
                  <p className="text-sm text-gray-600">{review.aiResponse}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default Reviews;