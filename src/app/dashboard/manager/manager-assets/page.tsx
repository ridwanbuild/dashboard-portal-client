"use client";

import React from 'react';
import { 
  Laptop, 
  Search, 
  Filter, 
  Monitor, 
  Hash,
  User,
  Info,
  Package
} from 'lucide-react';
import { useEmployees } from "@/hooks/useAllEmployee";

export default function ManagerAssets() {
  const { employees, loading } = useEmployees();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <p className="text-[12px] text-gray-700 font-normal uppercase tracking-tight">Accessing Inventory Data...</p>
    </div>
  );

  const totalAssetsCount = employees?.reduce((acc: number, curr: any) => acc + (curr.assets?.length || 0), 0);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white font-sans text-gray-700">
      
      {/* Tight Official Header */}
      <header className="border-b border-gray-100 pb-2 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-gray-400" />
          <h1 className="text-[13px] font-normal uppercase tracking-normal text-gray-700">Team Resource Inventory</h1>
        </div>
        <div className="text-[11px] text-gray-700 font-normal border border-gray-100 px-2 py-0.5 rounded">
          Total Deployment: {totalAssetsCount} Units
        </div>
      </header>

      {/* Utility Bar */}
      <div className="flex justify-between items-center mb-3">
        <div className="relative">
          <Search size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="pl-7 pr-3 py-1 bg-gray-50 border border-gray-200 rounded text-[12px] outline-none w-48 font-normal text-gray-700"
          />
        </div>
        <div className="flex gap-4">
          <button className="text-[11px] font-normal text-gray-700 uppercase flex items-center gap-1 hover:text-gray-900 transition-colors">
            <Filter size={12} /> Filter
          </button>
        </div>
      </div>

      {/* Asset Table (High Density) */}
      <div className="border border-gray-100 rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-2 text-[10px] font-normal text-gray-500 uppercase">Assigned User</th>
              <th className="p-2 text-[10px] font-normal text-gray-500 uppercase">Hardware Item</th>
              <th className="p-2 text-[10px] font-normal text-gray-500 uppercase">Serial Number</th>
              <th className="p-2 text-[10px] font-normal text-gray-500 uppercase">Status</th>
              <th className="p-2 text-[10px] font-normal text-gray-500 uppercase text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees?.map((member: any) => (
              member.assets?.length > 0 ? (
                member.assets.map((asset: any) => (
                  <tr key={asset.id} className="hover:bg-gray-50/50">
                    <td className="p-2 text-[12px] font-normal text-gray-700">{member.name}</td>
                    <td className="p-2 text-[12px] font-normal text-gray-700">{asset.name}</td>
                    <td className="p-2 text-[11px] font-normal text-gray-700 font-mono uppercase tracking-tighter">
                       {asset.serialNo}
                    </td>
                    <td className="p-2">
                       <span className="text-[10px] font-normal text-gray-700 uppercase border border-gray-200 px-1.5 py-0.5 rounded">Active</span>
                    </td>
                    <td className="p-2 text-[11px] font-normal text-gray-700 text-right">
                      {new Date(asset.assignedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={member.id}>
                  <td className="p-2 text-[12px] font-normal text-gray-700">{member.name}</td>
                  <td className="p-2 text-[12px] font-normal text-gray-300 italic" colSpan={3}>No assets assigned to this personnel</td>
                  <td className="p-2 text-right">
                    <span className="text-[10px] font-normal text-gray-300 uppercase">N/A</span>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <footer className="mt-3 p-3 bg-gray-50/50 border border-gray-100 rounded flex items-start gap-2">
        <Info size={12} className="text-gray-400 mt-0.5" />
        <div className="flex flex-col">
          <p className="text-[10px] font-normal text-gray-500 uppercase mb-0.5 tracking-tight">Oversight Policy</p>
          <p className="text-[12px] bg-red-100 px-3 rounded-full font-normal text-gray-700 italic">
            Asset verification must be conducted at the end of each quarter. Ensure all physical serial numbers match the digital records listed above.
          </p>
        </div>
      </footer>
    </div>
  );
}