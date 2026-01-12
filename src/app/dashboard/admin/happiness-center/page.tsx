"use client";

import React, { useState } from "react";
import { Send, Loader2, Heart, Building2, Type, AlignLeft, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { useHappiness } from "@/hooks/useHappiness";

const DEPARTMENTS = ["IT", "HR", "Sales", "Marketing", "Finance", "Operations"];

export default function HappinessPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { messages, isLoading, refreshData } = useHappiness();

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    department: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.department) return toast.error("Please select department");

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/happinessMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Feedback Posted!");
        setFormData({ title: "", message: "", department: "" });
        refreshData(); 
      } else {
        toast.error(result.message || "Error");
      }
    } catch (error) {
      toast.error("Server is not responding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 flex flex-col md:flex-row gap-10 font-sans text-slate-700">
      
      {/* LEFT SIDE: FORM */}
      <div className="w-full md:w-[360px] shrink-0">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-10">
          <div className="bg-blue-500 px-6 py-5 text-white">
            <h2 className="text-base font-medium flex items-center gap-2">
              <Heart size={18} fill="white" />
              Happiness Feedback
            </h2>
            <p className="text-blue-100 text-[11px] mt-1">Share your thoughts for 2026</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 uppercase tracking-wide flex items-center gap-2">
                <Building2 size={12} /> Department
              </label>
              <select 
                required
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition-all bg-white"
              >
                <option value="">Choose Dept</option>
                {DEPARTMENTS.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 uppercase tracking-wide flex items-center gap-2">
                <Type size={12} /> Title
              </label>
              <input 
                type="text" required placeholder="Short title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 uppercase tracking-wide flex items-center gap-2">
                <AlignLeft size={12} /> Message
              </label>
              <textarea 
                required rows={4} placeholder="Describe your feedback..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition-all resize-none"
              />
            </div>

            <button 
              type="submit" disabled={isSubmitting}
              className="w-full bg-slate-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE: CLEAN SHORT CARDS */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-6">
           <MessageSquare size={20} className="text-blue-500" />
           <h3 className="text-lg font-medium">Recent Activity</h3>
           <span className="text-xs text-slate-400 ml-auto">{messages?.length || 0} posts</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-300" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {messages?.map((msg: any) => (
              <div key={msg.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-200 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    {msg.department}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {new Date(msg.sentAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-slate-800 mb-1">{msg.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                  {msg.message}
                </p>
              </div>
            ))}
            
            {!isLoading && messages?.length === 0 && (
              <div className="col-span-full text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-xs">No entries found.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}