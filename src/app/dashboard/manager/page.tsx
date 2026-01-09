"use client";

import useRole from '@/hooks/useRole';
import Link from 'next/link';
import React from 'react';

export default function ManagerPage() {
  const { user, role, isLoading } = useRole();

  if (isLoading) return <p className="p-6 text-center animate-pulse">Loading Managerial Data...</p>;

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
      
      {/* Header Section */}
      <header className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Manager Dashboard</h1>

        <p className="text-slate-500  text-sm md:text-[12px]">
          Department Oversight | Logged in as: <span className="text-indigo-600">{user?.name}</span>
        </p>
      </header>

      {/* Stats and Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        
        {/* Link to Assets */}
        <Link href="/dashboard/manager/manager-assets" className="p-4 bg-indigo-50 border border-indigo-100 rounded-md hover:shadow-md transition group">
          <h3 className="text-sm font-semibold text-indigo-700 ">Team Assets</h3>
          <p className="text-xl font-medium text-indigo-900 group-hover:translate-x-1 transition-transform">Active Tracking →</p>
        </Link>
        
        {/* Link to Agreements */}
        <Link href="/dashboard/manager/manager-agreements" className="p-4 bg-teal-50 border border-teal-100 rounded-md hover:shadow-md transition group">
          <h3 className="text-sm font-semibold text-teal-700 ">Agreements</h3>
          <p className="text-xl font-medium text-teal-900 group-hover:translate-x-1 transition-transform">Pending Review →</p>
        </Link>

        {/* Link to Reports (Placeholder Link) */}
        <Link href="/dashboard/manager/reports" className="p-4 bg-amber-50 border border-amber-100 rounded-md hover:shadow-md transition group">
          <h3 className="text-sm font-semibold text-amber-700 ">Reports</h3>
          <p className="text-xl font-medium text-amber-900 group-hover:translate-x-1 transition-transform">Weekly Summary →</p>
        </Link>

      </div>

      {/* Responsibilities Section */}
      <div className="rounded-md border p-5 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Managerial Responsibilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded border shadow-sm">
            <h4 className="font-bold text-slate-700 underline flex items-center gap-2">
              <span>🛡️</span> Asset Control
            </h4>
            <p className="text-sm text-slate-600 mt-2">Review and monitor hardware/software assets assigned to your department members.</p>
          </div>
          <div className="bg-white p-4 rounded border shadow-sm">
            <h4 className="font-bold text-slate-700 underline flex items-center gap-2">
              <span>📊</span> Happiness Insights
            </h4>
            <p className="text-sm text-slate-600 mt-2">Analyze employee feedback and collective happiness trends to improve team morale.</p>
          </div>
        </div>
      </div>

      {/* System Footer Note */}
      <footer className="mt-8 border-t pt-4">
        <p className="text-xs text-slate-400 italic text-center">
          Note: You have management level access. For user role escalations or permission changes, please contact the System Administrator.
        </p>
      </footer>
    </div>
  );
}