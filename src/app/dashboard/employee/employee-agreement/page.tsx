"use client";

import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Clock, 
  ChevronRight, 
  Lock, 
  ExternalLink,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useAgreements } from "@/hooks/useAgreement";

export default function Agreements() {
  const { agreements, loading } = useAgreements();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Verifying Compliance...</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-12 bg-[#F9FAFB] min-h-screen font-sans text-slate-700">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Compliance & Agreements</h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Review and manage your legal documents, corporate policies, and signed contracts.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Status</p>
            <p className="text-sm font-medium text-emerald-600">All Signed & Secured</p>
          </div>
          <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
             <Lock size={20} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Agreements List */}
        <div className="lg:col-span-8 space-y-4">

          <div className="flex items-center gap-2 mb-4">
             <FileText size={18} className="text-slate-400" />
             <h3 className="text-sm font-medium text-slate-800">Your Documents ({agreements?.length || 0})</h3>
          </div>

          {agreements && agreements.length > 0 ? (
            agreements.map((doc: any) => (
              <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">

                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <FileText size={22} />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium uppercase tracking-tighter">
                          {doc.type}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {new Date(doc.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                  </div>

                  <button className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                    <ExternalLink size={18} />
                  </button>

                </div>
                
                {/* Content Preview */}
                <p className="mt-4 text-xs text-slate-500 line-clamp-2 font-normal leading-relaxed">
                  {doc.content}
                </p>

                <div className=" pt-4 border-t border-slate-50 flex justify-between items-center">
                   <div className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] font-bold uppercase">Fully Executed</span>
                   </div>
                   <button className="text-[11px] font-medium text-blue-500 hover:underline flex items-center gap-1">
                     Read Full Document <ChevronRight size={12} />
                   </button>
                </div>

              </div>
            ))
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] py-20 text-center">
              <FileText size={40} className="mx-auto text-slate-200 mb-3" />
              <p className="text-sm text-slate-400 font-medium">No agreements found in your records.</p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Static Info & Guidelines */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Legal Badge Card */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
            <Award className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-800 opacity-50 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-2">Legal Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-normal">
                Your digital signature on these documents is legally binding as per the 2026 Corporate Electronic Governance Act.
              </p>
              <div className="flex items-center gap-3 text-[11px] text-blue-400 font-medium">
                <ShieldCheck size={16} /> Data Encryption Active
              </div>
            </div>
          </div>

          {/* Static Help/Policy Info */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Important Notes</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                <p className="text-[11px] text-slate-500 leading-normal font-normal">
                  All employees must review the **Annual Conduct Policy** by the end of Q1.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                <p className="text-[11px] text-slate-500 leading-normal font-normal">
                  Documents marked as **'Restricted'** cannot be shared outside the organization.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0"></div>
                <p className="text-[11px] text-slate-500 leading-normal font-normal">
                  You can request a physical copy of any agreement via the HR desk.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}