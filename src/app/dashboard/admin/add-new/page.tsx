"use client";

import React, { useState } from 'react';
import { 
  UserPlus, 
  ArrowLeft, 
  User, 
  Mail, 
  Building2, 
  Banknote, 
  ShieldCheck,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddNewEmployee() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form States based on your Prisma Schema
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'USER',
    departments: '',
    salary: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('dashboard-portal-server-production.up.railway.app/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        router.push('/dashboard/admin/all-employees'); // Success হলে লিস্টে পাঠিয়ে দিবে
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="">
      
      {/* Navigation Header */}
      <div className="mb-4 flex items-center justify-between">

        <Link 
          href="/dashboard/admin/all-employees" 
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Employees
        </Link>

      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        
        {/* Card Header with Double Icon */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <UserPlus className="text-teal-100 w-10 h-10" />
              <ShieldCheck className="absolute text-teal-600 w-5 h-5 mt-3 ml-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">Register Employee</h1>
              <p className="text-xs text-slate-500 font-normal mt-0.5">Setup a new member for the 2026 workforce</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
            </label>
            <input
              required
              type="email"
              placeholder="name@company.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400" /> Department
              </label>
              <input
                type="text"
                placeholder="e.g. Marketing"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                onChange={(e) => setFormData({...formData, departments: e.target.value})}
              />
            </div>

            {/* Salary */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Banknote className="w-3.5 h-3.5 text-slate-400" /> Monthly Salary
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> System Role
            </label>
            <select
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all appearance-none cursor-pointer"
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              defaultValue="USER"
            >
              <option value="USER">Standard Employee</option>
              <option value="MANAGER">Department Manager</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">


            <button
              disabled={loading}
              type="submit"
              className="w-full bg-teal-600 cursor-pointer hover:bg-teal-700 text-white py-3 rounded-xl text-sm font-medium shadow-sm transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> 
                  Registering...
                </>
              ) : (
                'Create Employee Account'
              )}
            </button>



          </div>
        </form>
      </div>
    </div>
  );
}