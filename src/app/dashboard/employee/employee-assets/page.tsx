"use client";

import React, { useState } from 'react';
import { 
  Laptop, Hash, Calendar, ShieldCheck, Box, 
  HelpCircle, AlertTriangle, FileText, ChevronRight,
  Plus, Send, Loader2, Monitor, Smartphone, Keyboard
} from 'lucide-react';
import { useAssets } from "@/hooks/useAssets";
import toast from 'react-hot-toast';

export default function My_Assets() {
  const { assets, loading } = useAssets();
  const [isRequesting, setIsRequesting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [requestData, setRequestData] = useState({
    assetType: "",
    reason: "",
    urgency: "Normal"
  });

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequesting(true);
    
    // Mock API Call
    setTimeout(() => {
      toast.success("Request submitted to IT Department");
      setIsRequesting(false);
      setShowForm(false);
      setRequestData({ assetType: "", reason: "", urgency: "Normal" });
    }, 1500);
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-6 md:p-12 bg-[#F9FAFB] min-h-screen font-sans text-slate-700">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Resource Inventory</h1>
          <p className="text-sm text-slate-500 mt-1">Official hardware assigned to your secure profile for 2026.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          {showForm ? "View Inventory" : <><Plus size={16} /> Request New Asset</>}
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Conditional View */}
        <div className="lg:col-span-8 space-y-6">
          
          {showForm ? (
            /* ASSET REQUEST FORM */
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Request New Equipment</h3>
              <p className="text-xs text-slate-400 mb-8 uppercase tracking-widest font-bold">IT Procurement Form</p>
              
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Asset Category</label>
                    <select 
                      required
                      value={requestData.assetType}
                      onChange={(e) => setRequestData({...requestData, assetType: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="Laptop">High-Performance Laptop</option>
                      <option value="Monitor">External Monitor</option>
                      <option value="Mobile">Mobile Device</option>
                      <option value="Peripheral">Peripherals (Keyboard/Mouse)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Urgency Level</label>
                    <select 
                      value={requestData.urgency}
                      onChange={(e) => setRequestData({...requestData, urgency: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                    >
                      <option value="Normal">Normal (3-5 Days)</option>
                      <option value="High">Urgent (Next Day)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Justification / Reason</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Briefly describe why you need this asset..."
                    value={requestData.reason}
                    onChange={(e) => setRequestData({...requestData, reason: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit"
                    disabled={isRequesting}
                    className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-black transition-all flex items-center justify-center gap-2"
                  >
                    {isRequesting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} /> Submit Request</>}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3.5 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ASSET LIST */
            <div className="space-y-4">
              {assets?.length > 0 ? (
                assets.map((asset: any) => (
                  <div key={asset.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                    <div className="flex gap-5 items-center">
                       <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                          <Laptop size={22} />
                       </div>
                       <div>
                          <h4 className="text-sm font-semibold text-slate-800">{asset.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">SN: {asset.serialNo}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Assigned</p>
                       <p className="text-xs font-medium text-slate-600">{new Date(asset.assignedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] py-20 text-center">
                  <Box size={40} className="mx-auto text-slate-200 mb-2" />
                  <p className="text-sm text-slate-400 font-medium">No assets assigned.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Informative Sidebars */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Icons Category */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Available Categories</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <Monitor size={20} className="text-blue-500 mb-2" />
                   <span className="text-[10px] font-medium">Monitors</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <Smartphone size={20} className="text-emerald-500 mb-2" />
                   <span className="text-[10px] font-medium">Mobiles</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <Keyboard size={20} className="text-amber-500 mb-2" />
                   <span className="text-[10px] font-medium">Peripherals</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <Laptop size={20} className="text-indigo-500 mb-2" />
                   <span className="text-[10px] font-medium">Laptops</span>
                </div>
             </div>
          </div>

          {/* Help Card */}
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle size={18} className="text-blue-400" />
              <h3 className="text-sm font-medium">Quick Support</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              Need a repair or have a technical query?
            </p>
            <button className="w-full py-2 bg-slate-800 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-all">
               Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}