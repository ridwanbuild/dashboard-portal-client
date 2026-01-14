"use client";

import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { useEmployees } from "@/hooks/useAllEmployee";

export default function ManagerAgreements() {
  const { employees, loading } = useEmployees();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <p className="text-[12px] text-gray-700 font-normal uppercase">Accessing Legal Records...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white font-sans text-gray-700">
      
      {/* Official Header */}
      <header className="border-b border-gray-100 pb-3 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-[13px] font-normal uppercase tracking-wide">Compliance Oversight</h1>
          <p className="text-[13px] text-gray-500 font-normal">Team Agreements & Policy Verification</p>
        </div>
        <div className="text-[13px] text-gray-500 font-normal border border-gray-100 px-3 py-1 rounded">
          Total Employees: {employees?.length || 0}
        </div>
      </header>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-3">
        <div className="relative">
          <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-700" />
          <input 
            type="text" 
            placeholder="Search team member..." 
            className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-[12px] outline-none w-64 font-normal"
          />
        </div>
        <button className="text-[13px] font-normal text-gray-500 uppercase flex items-center gap-1 hover:text-gray-800 transition-colors">
          <Filter size={13} /> Filter Status
        </button>
      </div>

      {/* Agreement Table */}
      <div className="border border-gray-100 rounded shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="p-2 text-[13px] font-normal text-gray-500 uppercase">Employee</th>
              <th className="p-2 text-[13px] font-normal text-gray-500 uppercase">Document Title</th>
              <th className="p-2 text-[13px] font-normal text-gray-500 uppercase">Type</th>
              <th className="p-2 text-[13px] font-normal text-gray-500 uppercase">Date</th>
              <th className="p-2 text-[13px] font-normal text-gray-500 uppercase text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees?.map((member: any) => (
              member.agreement?.length > 0 ? (
                member.agreement.map((doc: any) => (
                  <tr key={doc.id} className="hover:bg-gray-50/50">
                    <td className="p-2 text-[12px] font-normal text-gray-700">{member.name}</td>
                    <td className="p-2 text-[12px] font-normal text-gray-600">{doc.title}</td>
                    <td className="p-2 text-[13px] font-normal text-gray-700 uppercase">{doc.type}</td>
                    <td className="p-2 text-[13px] font-normal text-gray-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-emerald-600">
                        <CheckCircle size={12} />
                        <span className="text-[13px] font-normal uppercase tracking-tight">Verified</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={member.id}>
                  <td className="p-2 text-[12px] font-normal text-gray-700">{member.name}</td>
                  <td className="p-2 text-[12px] font-normal text-gray-300 italic" colSpan={3}>Pending execution of corporate agreement</td>
                  <td className="p-2 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-orange-400">
                      <AlertCircle size={12} />
                      <span className="text-[13px] font-normal uppercase tracking-tight">Pending</span>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {/* Informative Footer */}
      <footer className="mt-4 p-4 bg-gray-50/50 border border-gray-100 rounded">
        <p className="text-[13px] font-normal text-gray-700 uppercase mb-1">Manager Note</p>
        <p className="text-[12px] font-normal text-gray-600 italic">
          Verification status is updated automatically upon digital signature. Documents marked as 'Pending' require immediate follow-up to ensure 2026 compliance standards are met.
        </p>
      </footer>
    </div>
  );
}