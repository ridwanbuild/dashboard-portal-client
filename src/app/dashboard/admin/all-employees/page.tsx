"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  ShieldCheck,
  Mail,
  Building2,
  Banknote,
  Package,
  MoreVertical,
  Ban,
  Eye,
  Trash2,
  UserCog,
  Search
} from "lucide-react";
import Link from "next/link";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  role: string | null;
  departments: string | null;
  salary: string | null;
  banned: boolean | null;
  _count?: {
    assets: number;
  };
}

export default function AllEmployeesPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Search State
  const [searchRole, setSearchRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("dashboard-portal-server-production.up.railway.app/admin/all-users");
        const result = await response.json();
        if (result.success) setUsers(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter Logic based on Role
  const filteredUsers = users.filter((user) =>
    (user.role || "").toLowerCase().includes(searchRole.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center animate-pulse">Loading...</div>;

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <Users className="text-teal-100 w-12 h-12" />
            <ShieldCheck className="absolute text-teal-600 w-6 h-6 mt-4 ml-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">All Employees</h1>
            <p className="text-sm text-slate-500 font-normal">Total {filteredUsers.length} filtered results</p>
          </div>
        </div>

        {/* Search Input for Role */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role (Admin, Employee...)"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
          
          <Link
            href={"/dashboard/admin/add-new"}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 text-center"
          >
            + Add New
          </Link>
        </div>
      </header>

      {/* Table Section */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="bg-slate-50/80 text-slate-500 text-[11px] uppercase tracking-wider">
              <th className="p-4 border-b font-medium">Employee</th>
              <th className="p-4 border-b font-medium">Role & Dept</th>
              <th className="p-4 border-b font-medium text-center">Salary</th>
              <th className="p-4 border-b text-center font-medium">Assets</th>
              <th className="p-4 border-b text-right font-medium">Action</th>
            </tr>
          </thead>


          <tbody className="divide-y divide-slate-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-400 italic">No matching roles found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-medium text-slate-600 border border-white shadow-sm ring-1 ring-slate-100">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 text-sm leading-none flex items-center gap-1.5">
                          {user.name || "N/A"}
                          {user.banned && <Ban className="w-3 h-3 text-red-500" />}
                        </div>
                        <span className="text-[11px] text-slate-400">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-medium uppercase border ${
                        user.role === "ADMIN" ? "bg-purple-50 text-purple-700 border-purple-100" :
                        user.role === "MANAGER" ? "bg-blue-50 text-blue-700 border-blue-100" :
                        "bg-slate-50 text-slate-600 border-slate-100"
                      }`}>
                        {user.role}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                         <Building2 className="w-2.5 h-2.5" /> {user.departments || "N/A"}
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1 text-slate-700 font-normal bg-green-50/40 px-2.5 py-1 rounded-full border border-green-100/50 text-xs">
                      <Banknote className="w-3.5 h-3.5 text-green-600/70" />
                      {user.salary || "0"}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-medium">
                      <Package className="w-3.5 h-3.5" />
                      {user._count?.assets || 0}
                    </div>
                  </td>

                  <td className="p-4 text-right relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {activeDropdown === user.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                        <div className="absolute right-4 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2.5">
                            <Eye className="w-4 h-4 text-slate-400" /> View
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2.5">
                            <UserCog className="w-4 h-4 text-slate-400" /> Edit
                          </button>
                          <div className="h-px bg-slate-100 my-1 mx-2"></div>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2.5 font-medium">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>



        </table>
      </div>
    </div>
  );
}