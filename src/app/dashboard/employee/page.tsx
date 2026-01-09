"use client";

import useRole from '@/hooks/useRole';
import Link from 'next/link';
import React from 'react';

export default function EmployeePage() {
  const { user, role, isLoading } = useRole();

  if (isLoading) return <p className="p-6 text-center animate-pulse">Loading Employee Data...</p>;

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
      
   
      <header className="mb-8">
        <h1 className="text-xl font-bold text-slate-800">Employee Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Hello, <span className="text-teal-600 font-medium">{user?.name}</span>! Here is your daily overview.
        </p>
      </header>

 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        
     
        <div className="p-5 border rounded-md bg-slate-50 hover:bg-slate-100 transition">

          <h2 className="text-xs font-bold text-slate-700 uppercase ">My Profile</h2>

          <div className="mt-3 space-y-1">
            <p className="text-slate-700 text-sm md:text-sm"><strong>Name:</strong> {user?.name}</p>
            <p className="text-slate-700 text-sm md:text-sm truncate"><strong>Email:</strong> {user?.email}</p>
            <p className="text-slate-700 text-sm md:text-sm"><strong>Access:</strong> <span className="text-blue-600">{role}</span></p>
          </div>

        </div>

     
        <div className="p-5 border rounded-md bg-orange-50 border-orange-100 shadow-sm">
          <h2 className="text-xs font-bold text-orange-500 ">Tasks & Alerts</h2>
          <div className="mt-3 space-y-2">

            <Link href="/dashboard/employee/employee-agreement" className="block text-sm text-orange-800 hover:underline">
              • Review your latest agreement →
            </Link>

            <Link href="/dashboard/employee/employee-happiness" className="block text-sm text-orange-800 hover:underline">
              • Check new happiness messages →
            </Link>

          </div>
        </div>

      </div>

  
      <div className="bg-slate-50 p-6 rounded-md border">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Access Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <Link href="/dashboard/employee/employee-assets" className="flex flex-col p-4 bg-white border rounded hover:border-teal-400 hover:shadow-sm transition group">
            <span className="text-teal-500 font-bold group-hover:scale-110 transition-transform text-lg">📦</span>
            <span className="text-sm font-semibold text-slate-700 mt-2">My Assets</span>
          </Link>

          <Link href="/dashboard/employee/employee-happiness" className="flex flex-col p-4 bg-white border rounded hover:border-pink-400 hover:shadow-sm transition group">
            <span className="text-pink-500 font-bold group-hover:scale-110 transition-transform text-lg">😊</span>
            <span className="text-sm font-semibold text-slate-700 mt-2">Happiness</span>
          </Link>

          <Link href="/dashboard/employee/employee-agreement" className="flex flex-col p-4 bg-white border rounded hover:border-blue-400 hover:shadow-sm transition group">
            <span className="text-blue-500 font-bold group-hover:scale-110 transition-transform text-lg">📄</span>
            <span className="text-sm font-semibold text-slate-700 mt-2">Agreements</span>
          </Link>

        </div>
      </div>
    </div>
  );
}