"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Image as ImageIcon, Calendar } from 'lucide-react';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

const Posts = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');

  const handleGenerate = () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    const toastId = showLoading("AI is crafting your post...");
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPost(`🚀 Big news! We're excited to announce our latest update at the shop. ${prompt} \n\nWhether you're a long-time customer or visiting for the first time, we can't wait to see you. \n\n📍 Visit us today!\n#LocalBusiness #GMB #Update`);
      setIsGenerating(false);
      dismissToast(toastId);
      showSuccess("Post generated successfully!");
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Post Creator</h1>
        <p className="text-gray-500 mt-1">Generate high-engaging GMB posts in seconds using AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={20} />
              What's the update?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="e.g., We are having a 20% off sale this weekend on all coffee beans..."
              className="min-h-[150px] rounded-xl border-gray-200 focus:ring-indigo-500"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex gap-3">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl h-12"
              >
                {isGenerating ? "Generating..." : "Generate AI Post"}
              </Button>
              <Button variant="outline" className="rounded-xl h-12 border-gray-200">
                <Calendar size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-indigo-50/30 border-dashed border-2 border-indigo-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedPost ? (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <p className="font-bold text-sm">Your Business Name</p>
                    <p className="text-xs text-gray-400">Just now • Google</p>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap mb-4">{generatedPost}</p>
                <div className="aspect-video bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-200 text-gray-400">
                  <ImageIcon size={32} className="mb-2" />
                  <p className="text-sm">Add an image to boost engagement</p>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl">
                    <Send size={18} className="mr-2" />
                    Publish to GMB
                  </Button>
                  <Button variant="outline" className="rounded-xl border-gray-200">
                    Edit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
                <Sparkles size={48} className="mb-4 opacity-20" />
                <p>Your AI-generated post will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Posts;