"use client";

import React from 'react';
import { 
  Users, 
  UserPlus, 
  Laptop, 
  Heart, 
  ShieldCheck, 
  Search, 
  Filter,
  ChevronRight,
  MoreVertical,
  Mail,
  Activity
} from 'lucide-react';
import { useEmployees } from "@/hooks/useAllEmployee";

export default function My_Team() {
  const { employees, loading } = useEmployees();
  
  // ম্যানেজারের টিমের জন্য ফিল্টার করা ডাটা (Mock Filter)
  const teamMembers = employees || []; 

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white font-sans text-xs uppercase  text-slate-700">
      Syncing Team Data...
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 bg-[#F9FAFB] min-h-screen font-sans text-slate-700">
      
      {/* 1. Team Strategy Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Team Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your direct reports, track resources, and monitor team well-being.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700" />
             <input 
               type="text" 
               placeholder="Search team..." 
               className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 transition-all w-64"
             />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
             <Filter size={16} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* 2. Team Health & Resource Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
           <p className="text-[13px] font-semibold text-slate-700 uppercase ">Total Members</p>
           <h3 className="text-2xl font-semibold text-slate-900 mt-1">{teamMembers.length}</h3>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
           <p className="text-[13px] font-semibold text-slate-700 uppercase ">Team Happiness</p>
           <h3 className="text-2xl font-semibold text-rose-500 mt-1 flex items-center gap-2">
             High <Activity size={18} />
           </h3>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
           <p className="text-[13px] font-semibold text-slate-700 uppercase ">Asset Coverage</p>
           <h3 className="text-2xl font-semibold text-blue-600 mt-1">98%</h3>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl shadow-lg shadow-slate-200 flex items-center justify-between">
           <div>
             <p className="text-[13px] font-semibold text-slate-500 uppercase ">New Requests</p>
             <h3 className="text-xl font-semibold text-white mt-1">02 Pending</h3>
           </div>
           <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
             <ChevronRight size={20} />
           </button>
        </div>
      </div>

      {/* 3. Team Directory (Informative List) */}
      <div className="bg-white border border-slate-100 rounded-md overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[13px] font-semibold text-slate-700 uppercase ">Employee</th>
              <th className="p-6 text-[13px] font-semibold text-slate-700 uppercase ">Role & Dept</th>
              <th className="p-6 text-[13px] font-semibold text-slate-700 uppercase ">Assets</th>
              <th className="p-6 text-[13px] font-semibold text-slate-700 uppercase ">Well-being</th>
              <th className="p-6 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {teamMembers.map((member: any) => (
              <tr key={member.id} className="group hover:bg-slate-50/50 transition-all">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">
                       {member.image ? <img src={member.image} className="rounded-xl" /> : member.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{member.name}</p>
                      <p className="text-[11px] text-slate-700 mt-0.5">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <p className="text-xs font-medium text-slate-700">{member.role}</p>
                  <p className="text-[13px] text-slate-700 uppercase mt-1">{member.employeeProfile?.departments || "Engineering"}</p>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {member.assets?.slice(0, 2).map((a: any) => (
                        <div key={a.id} className="w-7 h-7 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center text-slate-700 shadow-sm" title={a.name}>
                          <Laptop size={12} />
                        </div>
                      ))}
                    </div>
                    <span className="text-[13px] text-slate-700 font-semibold">+{member.assets?.length || 0}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                     <Heart size={14} className="text-rose-500 fill-rose-500" />
                     <span className="text-xs font-medium text-slate-600">Stable</span>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <button className="px-4 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg text-[13px] font-semibold uppercase  transition-all">
                    View Details
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Team Success Tip (Informative) */}
      <div className="mt-8 p-6 bg-indigo-50/50 border border-indigo-100 rounded-md flex items-center gap-4">
         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600 shrink-0">
            <ShieldCheck size={24} />
         </div>
         <p className="text-xs text-indigo-900 leading-relaxed">
            **Manager Insight:** Regular 1:1 syncs and monitoring the happiness feed helps reduce team burnout by 40%. Ensure your team has updated their compliance agreements for the new quarter.
         </p>
      </div>


    </div>
  );
}