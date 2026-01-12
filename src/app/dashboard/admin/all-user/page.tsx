"use client";

import React, { useState } from "react";
import {
  Laptop, ShieldCheck, Heart, Mail, ChevronRight,
  User, Search, RefreshCw, DollarSign, Briefcase, 
  MapPin, Calendar, ClipboardCheck
} from "lucide-react";
import Link from "next/link";
import { useEmployees } from "@/hooks/useAllEmployee";

export default function AdminWorkforceOverview() {
  const { employees, loading, refresh } = useEmployees();
  const [search, setSearch] = useState("");

  const filteredData = employees?.filter((user: any) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-slate-500 font-medium">Syncing Intelligence Hub...</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-slate-700">
      
      {/* 2026 Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Workforce Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">Monitoring assignments, compliance, and employee well-being across departments.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-400 transition-all shadow-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => refresh()} 
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            <RefreshCw size={14} /> Update Sync
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-5 text-[11px] font-semibold text-slate-400 uppercase tracking-[1px]">Staff Member</th>
                <th className="p-5 text-[11px] font-semibold text-slate-400 uppercase tracking-[1px]">Contract & Salary</th>
                <th className="p-5 text-[11px] font-semibold text-slate-400 uppercase tracking-[1px]">Hardware Inventory</th>
                <th className="p-5 text-[11px] font-semibold text-slate-400 uppercase tracking-[1px]">Compliance</th>
                <th className="p-5 text-[11px] font-semibold text-slate-400 uppercase tracking-[1px]">Engagement</th>
                <th className="p-5 text-[11px] font-semibold text-slate-400 uppercase tracking-[1px] text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData?.map((user: any) => (
                <tr key={user.id} className="hover:bg-slate-50/40 transition-all group">
                  
                  {/* Staff Info with Profile Image */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 overflow-hidden shadow-sm">
                          {user.image ? <img src={user.image} alt="" className="w-full h-full object-cover" /> : <User size={20} />}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${user.banned ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 leading-none">{user.name || "Unnamed Staff"}</p>
                        <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5 font-normal">
                          <Mail size={12} className="text-slate-300" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Salary & Department (from EmployeeProfile) */}
                  <td className="p-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <Briefcase size={13} className="text-slate-400" /> 
                        {user.employeeProfile?.departments || "Unassigned"}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-semibold border border-blue-100">
                          {user.role}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5">
                          <DollarSign size={10} />{user.employeeProfile?.salary || "0"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Assets Count & Names */}
                  <td className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {user.assets && user.assets.length > 0 ? (
                        <>
                          {user.assets.slice(0, 1).map((asset: any) => (
                            <span key={asset.id} className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-600 text-[10px] px-2.5 py-1 rounded-lg border border-slate-100">
                              <Laptop size={11} className="text-indigo-400" /> {asset.name}
                            </span>
                          ))}
                          {user.assets.length > 1 && (
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg font-medium">
                              +{user.assets.length - 1} more
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[10px] text-slate-300 italic font-normal tracking-wide">No assets assigned</span>
                      )}
                    </div>
                  </td>

                  {/* Agreements/Compliance */}
                  <td className="p-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${user.agreement?.length > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'}`}>
                      <ClipboardCheck size={12} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">
                        {user.agreement?.length > 0 ? `${user.agreement.length} Signed` : "Pending"}
                      </span>
                    </div>
                  </td>

                  {/* Happiness Sentiment Indicator */}
                  <td className="p-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Heart 
                          size={14} 
                          className={user.happinessMessages?.length > 0 ? "text-rose-400 fill-rose-400" : "text-slate-200"} 
                        />
                        <span className="text-xs font-medium text-slate-700">{user.happinessMessages?.length || 0} Logs</span>
                      </div>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-rose-400 rounded-full" 
                          style={{ width: `${Math.min((user.happinessMessages?.length || 0) * 20, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Action Button */}
                  <td className="p-5 text-right">
                    <Link
                      href={`/dashboard/admin/view-details/${user.id}`}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all group-hover:shadow-sm"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData?.length === 0 && (
          <div className="py-20 text-center">
            <User size={40} className="mx-auto text-slate-200 mb-3" />
            <p className="text-sm text-slate-400 font-medium">No workforce records found matching your search.</p>
          </div>
        )}
      </div>

      {/* Insight Footer */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center px-2 gap-4">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-tight">Active Accounts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-tight">Access Restricted</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 font-normal">Data Integrity: Verified Secure Profile © 2026</p>
      </div>
    </div>
  );
}