"use client";

import React from 'react';
import { 
  User, Laptop, ShieldCheck, Heart, 
  DollarSign, Briefcase, Calendar, 
  CheckCircle2, TrendingUp, FileText,
  LayoutDashboard, ArrowUpRight, Activity
} from 'lucide-react';
import { useEmployees } from "@/hooks/useAllEmployee";

export default function Reports() {
  const { employees, loading } = useEmployees();
  

  const user = employees?.[0]; 

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-md animate-spin"></div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Generating Live Report...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 font-sans text-slate-700 bg-[#F9FAFB] min-h-screen">
      
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Activity Analytics Report</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time status of assets, agreements, and workplace engagement.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-white border border-slate-200 rounded-md shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-md bg-emerald-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-slate-600 uppercase">Live Update: Jan 2026</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 1. Identity & Finance Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100 rounded-md p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-4 overflow-hidden shadow-inner">
                {user?.image ? <img src={user.image} alt="" className="w-full h-full object-cover" /> : <User size={32} />}
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{user?.name || "Verified Employee"}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{user?.role}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 space-y-5">
              <div className="flex justify-between items-center">
                 <span className="text-[11px] font-medium text-slate-400 uppercase">Department</span>
                 <span className="text-xs font-semibold text-slate-700">{user?.employeeProfile?.departments || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[11px] font-medium text-slate-400 uppercase">Salary Package</span>
                 <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                    <DollarSign size={14} /> {user?.employeeProfile?.salary || "0"}
                 </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-4">
             <div className="bg-slate-900 rounded-md p-6 text-white flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inventory</p>
                   <p className="text-xl font-semibold mt-1">{user?.assets?.length || 0} Assets</p>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center"><Laptop size={20} className="text-blue-400" /></div>
             </div>
             <div className="bg-white border border-slate-100 rounded-md p-6 flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sentiment</p>
                   <p className="text-xl font-semibold mt-1 text-slate-800">{user?.happinessMessages?.length || 0} Updates</p>
                </div>
                <div className="w-10 h-10 bg-rose-50 rounded-md flex items-center justify-center"><Heart size={20} className="text-rose-500" /></div>
             </div>
          </div>
        </div>

        {/* 2. Dynamic Activity Logs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Assets (Hardware) */}
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-sm font-semibold flex items-center gap-2"><LayoutDashboard size={18} className="text-indigo-500" /> Assigned Resources</h3>
              <ArrowUpRight size={16} className="text-slate-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.assets?.map((asset: any) => (
                <div key={asset.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-indigo-100 transition-all">
                   <div className="w-10 h-10 bg-slate-50 rounded-md flex items-center justify-center text-slate-400"><Laptop size={18} /></div>
                   <div>
                      <p className="text-xs font-semibold text-slate-800">{asset.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-tighter">SN: {asset.serialNo}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Compliance (Agreements) */}
          <div className="bg-white border border-slate-100 rounded-md p-8">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-6"><ShieldCheck size={18} className="text-emerald-500" /> Agreement & Compliance</h3>

            <div className="space-y-4">
              {user?.agreement?.map((agg: any) => (
                <div key={agg.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 group">
                   <div className="flex items-center gap-3">
                      <FileText size={16} className="text-slate-300 group-hover:text-blue-500" />
                      <div className="flex flex-col">
                         <span className="text-xs font-semibold text-slate-700">{agg.title}</span>
                         <span className="text-[10px] text-slate-400 mt-0.5">{agg.type} • {new Date(agg.createdAt).toLocaleDateString()}</span>
                      </div>
                   </div>
                   <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
              ))}
            </div>

          </div>

          {/* Section: Happiness (Culture) */}
          <div className="bg-indigo-50/30 border border-indigo-100 rounded-md p-8">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-6"><Activity size={18} className="text-indigo-600" /> Happiness Feed Updates</h3>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-indigo-100">
              {user?.happinessMessages?.map((msg: any) => (
                <div key={msg.id} className="relative pl-8">
                   <div className="absolute left-0 top-1.5 w-4 h-4 rounded-md bg-white border-2 border-indigo-400"></div>
                   <h4 className="text-xs font-bold text-slate-800">{msg.title}</h4>
                   <p className="text-xs text-slate-500 mt-2 font-normal italic leading-relaxed">"{msg.message}"</p>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* Report Footer */}
      <div className="mt-16 text-center">
         <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[6px]">
           © 2026 Live Activity Report Hub
         </p>
      </div>


    </div>
  );
}