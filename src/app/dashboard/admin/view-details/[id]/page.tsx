"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  User, Mail, Building2, Banknote, Calendar, 
  Phone, MapPin, Laptop, FileText, Heart, 
  ArrowLeft, Loader2, ShieldCheck, CheckCircle,
  ExternalLink, Printer
} from "lucide-react";
import Link from "next/link";

export default function OfficialEmployeeView() {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employee/${id}`, {
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) setEmployee(result.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEmployeeDetails();
  }, [id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-12">
      {/* Top Bar - Minimal Official */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard/admin/all-employees" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Back to Directory
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg transition-all">
              <Printer size={16} />
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-all">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        
        {/* Profile Identity Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
            <User size={48} strokeWidth={1.5} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{employee?.name}</h1>
              <CheckCircle size={18} className="text-blue-500" />
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 text-sm">
              <span className="flex items-center gap-1.5"><Mail size={14}/> {employee?.email}</span>
              <span className="flex items-center gap-1.5"><Building2 size={14}/> {employee?.employeeProfile?.departments || "N/A"}</span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase text-[10px] tracking-wider">{employee?.role}</span>
            </div>
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. Core Information */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Professional Profile</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoBox label="Base Salary" value={`$${employee?.employeeProfile?.salary}`} highlight />
                <InfoBox label="Joining Date" value={new Date(employee?.createdAt).toLocaleDateString()} />
                <InfoBox label="Mobile Number" value={employee?.employeeProfile?.phone || "Not Set"} />
                <InfoBox label="Office Address" value={employee?.employeeProfile?.address || "Remote"} />
              </div>
            </section>

            {/* Assets Table Style */}
            <section className="  border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Assigned Assets</h3>
                <span className="text-base font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{employee?.assets?.length || 0} Items</span>
              </div>
              <div className="p-0  py-4 overflow-x-auto">
                <table className="w-full  text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3">Asset Name</th>
                      <th className="px-6 py-3">Serial Number</th>
                      <th className="px-6 py-3 text-right">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y  divide-slate-100">
                    {employee?.assets?.length > 0 ? employee.assets.map((asset: any) => (
                      <tr key={asset.id} className="text-sm text-slate-600">
                        <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2"><Laptop size={14} className="text-slate-400"/> {asset.name}</td>
                        <td className="px-6 py-4 font-mono text-xs">{asset.serialNo}</td>
                        <td className="px-6 py-4 text-right"><span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active</span></td>
                      </tr>
                    )) : (
                      <tr><td colSpan={3} className="px-6 py-10 text-center text-slate-400 italic text-xs">No company assets assigned.</td></tr>
                    )}
                  </tbody>
                  

                </table>
              </div>
            </section>
          </div>

          {/* 2. Side Information (Agreements & Happiness) */}
          <div className="space-y-6">
            
            {/* Agreements */}
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Legal Compliance</h3>
              </div>
              <div className="p-4 space-y-2">
                {employee?.agreement?.length > 0 ? employee.agreement.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg hover:border-slate-300 transition-all cursor-default">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-700">{doc.title}</span>
                    </div>
                    <ExternalLink size={12} className="text-slate-300" />
                  </div>
                )) : <p className="text-base text-slate-400 text-center py-4 italic">No documents signed.</p>}
              </div>
            </section>

            {/* Happiness Feedback */}
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Employee Pulse</h3>
              </div>

              <div className="p-6 space-y-6">
                {employee?.happinessMessages?.length > 0 ? employee.happinessMessages.map((msg: any) => (
                  <div key={msg.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">{msg.title}</span>
                       <Heart size={12} className="text-pink-400 fill-pink-400" />
                    </div>
                    <p className="text-base text-slate-600 leading-relaxed border-l-2 border-slate-100 pl-3 italic">"{msg.message}"</p>
                  </div>
                )) : <p className="text-base text-slate-400 text-center py-4 italic">No recent feedback entries.</p>}
              </div>

            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

function InfoBox({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (

    <div className="space-y-1">
      <p className="text-[12px] font-semibold text-slate-600 uppercase ">{label}</p>
      <p className={`text-sm font-medium ${highlight ? "text-blue-600 font-bold text-lg" : "text-slate-900"}`}>
        {value || "—"}
      </p>
    </div>
  );
}