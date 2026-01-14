"use client";

import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Laptop, 
  Filter,
  Info,
  User
} from 'lucide-react';

export default function Approvals() {
  // Static Informative Data (Mocking Pending Requests)
  const pendingRequests = [
    {
      id: "REQ-001",
      employee: "Rahat Kabir",
      type: "Asset Request",
      item: "Dell UltraSharp 27 Monitor",
      date: "2026-01-12",
      icon: <Laptop size={14} />
    },
    {
      id: "REQ-002",
      employee: "Sultana Ahmed",
      type: "Agreement Update",
      item: "Remote Work Policy V2",
      date: "2026-01-13",
      icon: <FileText size={14} />
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white font-sans text-gray-700">
      
      {/* Official Header */}
      <header className="border-b border-gray-100 pb-2 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-[13px] font-normal uppercase tracking-normal text-gray-700">Pending Approvals</h1>
          <p className="text-[13px] text-gray-500 font-normal">Review and authorize team requests for 2026</p>
        </div>
        <div className="text-[13px] text-gray-700 font-normal border border-gray-100 px-2 py-0.5 rounded flex items-center gap-2">
          <Clock size={12} className="text-orange-400" />
          {pendingRequests.length} Pending Actions
        </div>
      </header>

      {/* List Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[13px] font-normal text-gray-400 uppercase tracking-tight">Authorization Queue</h3>
        <button className="text-[10px] font-normal text-gray-700 uppercase flex items-center gap-1 hover:underline">
          <Filter size={12} /> Filter by type
        </button>
      </div>

      {/* Approval List (High Density) */}
      <div className="space-y-2">
        {pendingRequests.map((req) => (
          <div 
            key={req.id} 
            className="flex items-center justify-between p-3 border border-gray-100 rounded hover:bg-gray-50/50 transition-colors"
          >
            {/* Request Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400">
                {req.icon}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Requester</p>
                  <p className="text-[12px] font-normal text-gray-700">{req.employee}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Type</p>
                  <p className="text-[13px] font-normal text-gray-700">{req.type}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Item / Detail</p>
                  <p className="text-[13px] font-normal text-gray-700 truncate">{req.item}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[9px] text-gray-400 uppercase">Submission</p>
                  <p className="text-[13px] font-normal text-gray-700">{req.date}</p>
                </div>
              </div>
            </div>

            {/* Compact Action Buttons */}
            <div className="flex items-center gap-2 ml-4">
              <button className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded text-[10px] font-normal uppercase text-gray-700 hover:bg-gray-50 transition-colors">
                <XCircle size={12} className="text-gray-400" /> Decline
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-white rounded text-[10px] font-normal uppercase hover:bg-gray-800 transition-colors">
                <CheckCircle size={12} className="text-white/80" /> Approve
              </button>
            </div>
          </div>
        ))}

        {pendingRequests.length === 0 && (
          <div className="py-12 text-center border border-dashed border-gray-100 rounded-lg">
             <p className="text-[13px] text-gray-400 font-normal uppercase">No pending approvals found</p>
          </div>
        )}
      </div>

      {/* Formality Note */}
      <footer className="mt-6 p-3 bg-gray-50/50 border border-gray-100 rounded flex items-start gap-2">
        <Info size={12} className="text-gray-400 mt-0.5" />
        <p className="text-[13px] font-normal text-gray-700 italic">
          Managerial approval is recorded as an electronic signature. Once approved, resource deployment or policy updates are initiated automatically by the system.
        </p>
      </footer>
    </div>
  );
}