"use client";

import React from 'react';
import { Heart, Sparkles, Smile, Megaphone, Calendar } from 'lucide-react';
import { useHappiness } from "@/hooks/useHappiness";

export default function EmployeeHappiness() {
  const { messages, isLoading } = useHappiness();

  if (isLoading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="w-5 h-5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12 font-sans">
      
      {/* Small & Simple Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-rose-500 mb-2">
          <Heart size={18} fill="currentColor" />
          <span className="text-[10px] font-bold uppercase tracking-[2px]">Culture Feed</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Happiness Hub</h1>
        <p className="text-sm text-slate-500 mt-1">Positive updates and messages from the organization.</p>
      </header>

      {/* Main Feed */}
      <div className="space-y-6">
        
        {/* Simple Static Informative Box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-4 items-start">
          <Sparkles className="text-blue-500 shrink-0" size={20} />
          <div>
            <p className="text-xs font-medium text-blue-800 leading-relaxed">
              **2026 Focus:** We are committed to a healthy work-life balance. Remember to take short breaks and stay hydrated today!
            </p>
          </div>
        </div>

        {/* Dynamic Messages from Company */}
        {messages?.length > 0 ? (
          messages.map((msg: any) => (
            <div key={msg.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm transition-hover hover:border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <Megaphone size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800">{msg.title}</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {new Date(msg.sentAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-11">
                {msg.message}
              </p>
            </div>
          ))
        ) : (
          <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Smile size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">No new messages yet</p>
          </div>
        )}

        {/* Small Bottom Note */}
        <div className="pt-8 text-center">
           <p className="text-[10px] text-slate-300 font-medium uppercase tracking-[1px]">
             Powered by Employee Success Team • 2026
           </p>
        </div>
      </div>
    </div>
  );
}