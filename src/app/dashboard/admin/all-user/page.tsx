"use client";

import React, { useEffect, useState } from "react";
import {
  User, Briefcase, Laptop, FileText,
  Heart, Mail, Phone, MapPin, Loader2,
  Calendar, CheckCircle2, XCircle, ShieldCheck,
  TrendingUp, Award
} from "lucide-react";

export default function All_user_Info() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employee", {
          credentials: "include",
        });
        
        const result = await response.json();
        if (result.success) {
          setUserData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFullProfile();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-4" />
        <p className="text-slate-500 font-medium">Loading 2026 Workspace...</p>
      </div>
    </div>
  );

  if (!userData) return <div className="p-10 text-center">User not found.</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 bg-slate-50/50 min-h-screen">
      
      {/* --- TOP HEADER & QUICK STATS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
              <User size={56} className="-rotate-3" />
            </div>
            {userData.emailVerified && (
              <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                <CheckCircle2 className="text-emerald-500 w-6 h-6" />
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{userData.name}</h1>
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-lg border border-teal-200 uppercase tracking-wider">
                {userData.role}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1.5"><Mail size={16} /> {userData.email}</span>
              <span className="flex items-center gap-1.5"><Calendar size={16} /> Joined {new Date(userData.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Insight Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <TrendingUp className="text-teal-500 mb-2" size={24} />
            <span className="text-2xl font-bold text-slate-800">{userData.assets?.length || 0}</span>
            <span className="text-xs text-slate-400 font-medium">Active Assets</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <Award className="text-orange-500 mb-2" size={24} />
            <span className="text-2xl font-bold text-slate-800">{userData.agreement?.length || 0}</span>
            <span className="text-xs text-slate-400 font-medium">Agreements</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Work & Salary Details */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Briefcase className="text-teal-600" size={18} /> Work Profile</h2>
            <ShieldCheck size={16} className="text-slate-300" />
          </div>
          <div className="p-6  text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Primary Department</span>
              <span className="font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">{userData.employeeProfile?.departments || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Monthly Remuneration</span>
              <span className="font-bold text-teal-600 text-lg">${userData.employeeProfile?.salary || "0"}</span>
            </div>
            <div className="pt-4 space-y-3 border-t border-slate-50">
               <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-100 rounded-lg"><Phone size={14} /></div>
                  <span>{userData.employeeProfile?.phone || "No phone added"}</span>
               </div>
               <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-100 rounded-lg"><MapPin size={14} /></div>
                  <span className="truncate">{userData.employeeProfile?.address || "No address provided"}</span>
               </div>
            </div>
          </div>
        </div>

        {/* 2. Inventory & Hardware */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2"><Laptop className="text-teal-600" size={18} /> Assets Assigned</h2>
            <span className="text-[10px] font-bold bg-teal-600 text-white px-1.5 py-0.5 rounded uppercase">Inv v2.0</span>
          </div>
          <div className="p-6">
            {userData.assets?.length > 0 ? (
              <div className="space-y-3">
                {userData.assets.map((asset: any) => (
                  <div key={asset.id} className="group p-3 hover:bg-teal-50 border border-slate-100 rounded-xl transition-all cursor-default">
                    <p className="text-sm font-semibold text-slate-700">{asset.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">S/N: {asset.serialNo}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-300">
                  <Laptop size={20} />
                </div>
                <p className="text-xs text-slate-400">No company hardware assigned.</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. Compliance & Feedback (Right Column) */}
        <div className="space-y-6">
          {/* Agreements Sub-card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2"><FileText size={16} className="text-orange-500" /> Compliance</h3>
             </div>
             <div className="p-4 max-h-48 overflow-y-auto space-y-3">
                {userData.agreement?.map((item: any) => (
                  <div key={item.id} className="p-3 bg-orange-50/30 border-l-2 border-orange-400 rounded-r-lg">
                    <p className="text-xs font-bold text-slate-700">{item.title}</p>
                    <p className="text-[10px] text-orange-600/70 font-medium uppercase mt-0.5">{item.type}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* Feedback Sub-card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2"><Heart size={16} className="text-pink-500" /> Happiness</h3>
             </div>
             <div className="p-4 space-y-4">

                {userData.happinessMessages?.slice(0, 2).map((msg: any) => (
                  <div key={msg.id} className="relative pl-4 border-l border-pink-100">
                    <p className="text-[11px] font-bold text-slate-800">{msg.title}</p>
                    <p className="text-[10px] text-slate-500 italic mt-1">"{msg.message.substring(0, 60)}..."</p>
                  </div>
                ))}


             </div>
          </div>
        </div>

      </div>
    </div>
  );
}