"use client";

import React from 'react';
import { 
  Bell, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  MailOpen,
  ShieldAlert
} from 'lucide-react';

export default function Notification() {
  // Static informative data for better feel
  const notifications = [
    {
      id: 1,
      type: "Policy",
      title: "Annual Conduct Policy Update",
      message: "The 2026 corporate governance policy has been updated. Please review the agreement section.",
      time: "2h ago",
      priority: "High",
      icon: <ShieldAlert className="text-amber-500" size={18} />
    },
    {
      id: 2,
      type: "Asset",
      title: "New Asset Assigned",
      message: "A new MacBook Pro (SN: 2026-X90) has been assigned to your inventory profile.",
      time: "1d ago",
      priority: "Normal",
      icon: <Info className="text-blue-500" size={18} />
    },
    {
      id: 3,
      type: "System",
      title: "Profile Verification Complete",
      message: "Your employee profile and happiness log sync was successful.",
      time: "2d ago",
      priority: "Low",
      icon: <CheckCircle2 className="text-emerald-500" size={18} />
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12 min-h-screen font-sans text-slate-700 bg-white">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-6 mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">System Notifications</h1>
          <p className="text-xs text-slate-400 mt-1 font-normal uppercase tracking-wider">Activity Inbox • Jan 2026</p>
        </div>
        <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1.5">
          <MailOpen size={14} /> Mark all as read
        </button>
      </div>

      {/* Notification Feed */}
      <div className="space-y-4">
        {notifications.map((item) => (
          <div 
            key={item.id} 
            className="group flex gap-5 p-5 rounded-2xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-300"
          >
            {/* Icon Column */}
            <div className="mt-1">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                {item.icon}
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
                  {item.priority === "High" && (
                    <span className="text-[8px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">Urgent</span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock size={10} /> {item.time}
                </span>
              </div>
              <p className="text-[13px] text-slate-500 font-normal leading-relaxed">
                {item.message}
              </p>
              
              <div className="mt-3 flex items-center gap-4">
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{item.type}</span>
                <button className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-900">
                  Dismiss
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="self-center">
              <MoreHorizontal size={16} className="text-slate-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Mockup */}
      {notifications.length === 0 && (
        <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-3xl">
          <Bell size={40} className="mx-auto text-slate-100 mb-3" />
          <p className="text-sm text-slate-300 font-medium">Your inbox is clear.</p>
        </div>
      )}

      {/* Footer Informative Note */}
      <div className="mt-12 p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
        <Info size={16} className="text-slate-400 mt-0.5 shrink-0" />
        <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
          Notifications are automatically cleared after 30 days. For critical security alerts or asset retrieval, 
          please check your <span className="font-semibold text-slate-700 underline cursor-pointer">Official Report</span> section.
        </p>
      </div>

    </div>
  );
}