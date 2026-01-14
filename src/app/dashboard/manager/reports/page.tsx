"use client";

import React from 'react';
import { 
  Users, Laptop, ShieldCheck, 
  FileText, Activity, ClipboardList, Info
} from 'lucide-react';
import { useEmployees } from "@/hooks/useAllEmployee";

export default function My_Team_Report() {
  const { employees, loading } = useEmployees();
  
  const totalSalary = employees?.reduce((acc: number, curr: any) => acc + (curr.employeeProfile?.salary || 0), 0);
  const totalAssets = employees?.reduce((acc: number, curr: any) => acc + (curr.assets?.length || 0), 0);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <p className="text-[10px] text-slate-700 font-normal uppercase tracking-wide">Syncing Records...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white font-sans text-slate-700">
      
      {/* Compact Header */}
      <header className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-[13px] font-medium uppercase tracking-wider text-slate-700">Team Strategic Report</h1>
          <p className="text-[12px] text-slate-500 font-normal uppercase">Fiscal 2026 • Confidential</p>
        </div>
        <div className="text-right">
          <p className="text-[12px] text-slate-400 font-medium uppercase">Date: {new Date().toLocaleDateString()}</p>
          <p className="text-[10px] font-normal text-slate-700 tracking-tighter">ID: #TR-26-041</p>
        </div>
      </header>

      {/* 1. Quick Metrics (Tight Grid) */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 border border-slate-100 rounded-lg">
          <p className="text-[12px] font-medium text-slate-400 uppercase mb-1">Payroll</p>
          <p className="text-[12px] font-medium text-slate-700">${totalSalary?.toLocaleString()}</p>
        </div>
        <div className="p-3 border border-slate-100 rounded-lg">
          <p className="text-[12px] font-medium text-slate-400 uppercase mb-1">Inventory</p>
          <p className="text-[12px] font-medium text-slate-700">{totalAssets} Units</p>
        </div>
        <div className="p-3 border border-slate-100 rounded-lg">
          <p className="text-[12px] font-medium text-slate-400 uppercase mb-1">Wellness</p>
          <p className="text-[12px] font-medium text-slate-700">8.4 / 10</p>
        </div>
      </div>

      {/* 2. Personnel Audit Table (Dense) */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3 border-b border-slate-50 pb-1">
          <ClipboardList size={12} className="text-slate-400" />
          <h3 className="text-[10px] font-medium text-slate-700 uppercase tracking-tight">Resource Audit Log</h3>
        </div>
        <div className="border border-slate-50 rounded-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-100">
                <th className="p-2 text-[12px] font-medium text-slate-500 uppercase">Employee</th>
                <th className="p-2 text-[12px] font-medium text-slate-500 uppercase">Asset Count</th>
                <th className="p-2 text-[12px] font-medium text-slate-500 uppercase text-right">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {employees?.map((member: any) => (
                <tr key={member.id} className="hover:bg-slate-50/50">
                  <td className="p-2 text-[13px] font-normal text-slate-700">{member.name}</td>
                  <td className="p-2 text-[13px] font-normal text-slate-500">{member.assets?.length || 0} Assigned</td>
                  <td className="p-2 text-[12px] font-normal text-slate-500 text-right uppercase">
                    {member.agreement?.length > 0 ? "Verified" : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Short Narrative (Compact) */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Info size={12} className="text-slate-400" />
          <h3 className="text-[10px] font-medium text-slate-700 uppercase tracking-tight">Executive Summary</h3>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
          <p className="text-[13px] font-normal text-slate-600 italic">
            Performance indicators confirm stable team output. Hardware distribution is at optimal capacity. Compliance verification for Q1 2026 is currently 92% complete.
          </p>
        </div>
      </section>

      {/* 4. Small Footer Section */}
      <footer className="pt-4 border-t border-slate-100 flex justify-between items-center opacity-70">
        <div className="flex gap-4">
           <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-700 uppercase tracking-tighter">
              <ShieldCheck size={10} /> Secure
           </div>
           <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-700 uppercase tracking-tighter">
              <Activity size={10} /> Live Data
           </div>
        </div>
        <p className="text-[12px] text-slate-400 font-medium uppercase">
          End of Document
        </p>
      </footer>
    </div>
  );
}