"use client";

import React, { useState, useRef } from "react";
import { useAssets } from "@/hooks/useAssets";
import { useEmployees } from "@/hooks/useAllEmployee";
import {
  Laptop,
  Plus,
  Mail,
  Hash,
  Trash2,
  Loader2,
  Package,
  UserPlus,
  ArrowDown,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Assets_managements() {
  const { assets, loading: assetsLoading, refreshAssets } = useAssets();
  const { employees } = useEmployees();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    serialNo: "",
    userId: "",
    department: "Engineering",
  });

  const departments = [
    "Engineering",
    "Marketing",
    "HR",
    "Sales",
    "Design",
    "Product",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId) return toast.error("Please select an employee");

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Asset assigned successfully! ✨");
        setFormData({ ...formData, name: "", serialNo: "" });
        refreshAssets();
      }
    } catch (error) {
      toast.error("Failed to assign asset");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 md:p-10 bg-white min-h-screen text-gray-800 relative">
      <Toaster />

      {/* Header */}
      <div className="mb-10 flex items-center justify-between">

        <div>
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
            Workforce Asset Control
          </h1>
          <p className="text-sm text-gray-800 mt-1">
            Efficiently manage and distribute hardware inventory.
          </p>
        </div>

        <div>
          <div className="">
            <button
              onClick={scrollToForm}
              className="bg-gray-800 text-white flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl hover:bg-gray-900 transition-all hover:scale-105 active:scale-95"
            >
              <Plus size={18} />
              <span className="text-sm font-medium">New Asset</span>
            </button>
          </div>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* LEFT: Assignment Form */}
        <div ref={formRef} className="w-full lg:w-95 sticky top-6 shrink-0">
          <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl sticky top-10">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-widest mb-6 flex items-center gap-2">
              <UserPlus size={14} /> Assign New Asset
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-800 uppercase">
                  Target Employee
                </label>
                <select
                  required
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                  className="w-full border border-gray-200 bg-white p-2.5 rounded-lg text-sm text-gray-800 outline-none focus:border-gray-400 transition-all"
                >
                  <option value="">Select email address</option>
                  {employees.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-800 uppercase">
                  Hardware Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="MacBook, Dell, Thinkpad..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-200 bg-white p-2.5 rounded-lg text-sm text-gray-800 outline-none focus:border-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-800 uppercase">
                  Serial Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="SN-2026-XXXX"
                  value={formData.serialNo}
                  onChange={(e) =>
                    setFormData({ ...formData, serialNo: e.target.value })
                  }
                  className="w-full border border-gray-200 bg-white p-2.5 rounded-lg text-sm text-gray-800 outline-none focus:border-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-800 uppercase">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full border border-gray-200 bg-white p-2.5 rounded-lg text-sm text-gray-800 outline-none focus:border-gray-400"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-800 text-white p-3 rounded-xl text-sm font-medium hover:bg-gray-900 transition-all flex items-center justify-center gap-2 mt-2 shadow-sm"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Confirm & Assign"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Assets Grid View */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-6">
            <Package size={16} className="text-gray-700" />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-widest">
              Active Inventory ({assets?.length || 0})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assetsLoading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-36 bg-gray-50  rounded-xl animate-pulse"
                  />
                ))
              : assets.map((asset: any) => (
                  <div
                    key={asset.id}
                    className="p-4  cursor-pointer rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-700 group-hover:bg-gray-100 transition-colors">
                          <Laptop size={18} />
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-50 text-gray-700 rounded-md border border-gray-100">
                          {asset.department || "IT Dept"}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-800">
                        {asset.name}
                      </h3>
                      <p className="text-[11px] text-gray-700 font-mono mt-1">
                        SN: {asset.serialNo}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-800 truncate max-w-[200px]">
                        <Mail size={12} className="text-gray-300 shrink-0" />
                        <span className="truncate">
                          {asset.user?.email || "N/A"}
                        </span>
                      </div>

                      <button className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* BOTTOM: Floating Add Button */}
    </div>
  );
}
