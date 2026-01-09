"use client";

import useRole from '@/hooks/useRole';
import Link from 'next/link'; 
import React from 'react';

export default function AdminRoute() {
  const { user, role, isLoading } = useRole();

  if (isLoading) return <p className="p-6">Loading Admin Data...</p>;

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
      
    
      <header className="mb-6 border-b pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">Admin Control Center</h1>
        <p className="text-sm md:text-base text-slate-500">
          Welcome back, {user?.name}. You are logged in as <span className="font-bold text-teal-600 uppercase">{role}</span>.
        </p>
      </header>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        
        <Link href="/dashboard/admin/company-assets" className="p-4 bg-blue-50 border border-blue-100 rounded-md hover:shadow-md transition">

          <h3 className="font-semibold text-blue-800">Manage Assets</h3>
          <p className="text-xs text-blue-600 mt-1">View and edit system assets</p>

        </Link>

      
        <Link href="/dashboard/admin/company-agreements" className="p-4 bg-green-50 border border-green-100 rounded-md hover:shadow-md transition">
          <h3 className="font-semibold text-green-800">Agreements</h3>
          <p className="text-xs text-green-600 mt-1">Review user legal documents</p>
        </Link>

       
        <Link href="/dashboard/admin/happiness-center" className="p-4 bg-purple-50 border border-purple-100 rounded-md hover:shadow-md transition">
          <h3 className="font-semibold text-purple-800">Happiness Center</h3>
          <p className="text-xs text-purple-600 mt-1">Check employee feedback</p>
        </Link>

      </div>

     
      <div className="mt-8 bg-slate-50 p-4 rounded-md border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-3 text-center md:text-left">Admin Privileges</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
          <li className="flex items-center gap-2">✓ Full System Management</li>
          <li className="flex items-center gap-2">✓ User Role Overriding</li>
          <li className="flex items-center gap-2">✓ Database Access & Logs</li>
          <li className="flex items-center gap-2">✓ Approval Controls</li>
        </ul>
      </div>

    </div>
  );
}