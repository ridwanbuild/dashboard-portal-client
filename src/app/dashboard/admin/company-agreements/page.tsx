"use client";

import React, { useState } from "react";
import { Send, Loader2, FileText, User, Building2, Type, AlignLeft, ShieldCheck, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { useEmployees } from "@/hooks/useAllEmployee";
import { useAgreements } from "@/hooks/useAgreement";


const DEPARTMENTS = ["IT", "HR", "Sales", "Marketing", "Finance", "Operations"];

export default function AgreementManagement() {
  const { employees } = useEmployees();
  const { agreements, loading, refresh } = useAgreements(); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "Policy",
    userId: "",
    department: "" 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId) return toast.error("Please select an employee");
    if (!formData.department) return toast.error("Please select a department");

    setIsSubmitting(true);
    try {
      // API URL updated to plural as per previous fix
      const response = await fetch("http://localhost:5000/api/agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Document dispatched successfully");
        setFormData({ title: "", content: "", type: "Policy", userId: "", department: "" });
        refresh(); 
      }
    } catch (error) {
      toast.error("Failed to post data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8 bg-slate-50 min-h-screen">
      
      {/* LEFT SIDE: POST FORM */}
      <div className="w-full lg:w-[400px] shrink-0">

        <div className="sticky top-6 w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden font-sans">
          
          <div className="bg-slate-100 border-b border-slate-200 px-6 py-4">
            <h2 className="text-sm font-medium text-black flex items-center gap-2">
              <FileText size={16} className="text-slate-400" />
              Dispatch Agreement
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Recipient Select */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <User size={12} /> Recipient
                </label>
                <select 
                  required
                  value={formData.userId}
                  onChange={(e) => setFormData({...formData, userId: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-slate-900 transition-all bg-white"
                >
                  <option value="">Select User</option>
                  {employees?.map((user: any) => (
                    <option key={user.id} value={user.id}>{user.email}</option>
                  ))}
                </select>
              </div>

              {/* Department Select (Updated) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <Building2 size={12} /> Dept.
                </label>
                <select 
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-slate-900 transition-all bg-white"
                >
                  <option value="">Select Dept</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                <Type size={12} /> Document Title
              </label>
              <input 
                type="text"
                required
                placeholder="Confidentiality Policy 2026"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-slate-900 transition-all"
              />
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                <AlignLeft size={12} /> Terms & Content
              </label>
              <textarea 
                required
                rows={4}
                placeholder="Brief description of terms..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-slate-900 transition-all resize-none bg-slate-50/30"
              />
            </div>

            {/* Type Toggle */}
            <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200">
              {["Policy", "Agreement"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({...formData, type: t})}
                  className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold uppercase transition-all ${
                    formData.type === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 cursor-pointer text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <><Send size={14} /> Dispatch Data</>}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE: DATA CARDS */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" />
            Live Agreements
          </h3>
          <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
            {agreements?.length || 0} Records
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agreements?.map((item: any) => (
              <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl hover:border-slate-400 transition-all shadow-sm flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${item.type === 'Policy' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                      {item.type}
                    </span>
                    <Clock size={12} className="text-slate-300" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 truncate mb-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {item.content}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <User size={10} strokeWidth={3} />
                    <span className="text-[10px] font-bold truncate max-w-[100px]">{item.user?.email || "General"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Building2 size={10} />
                    <span className="text-[9px] font-bold uppercase">{item.department || "N/A"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}