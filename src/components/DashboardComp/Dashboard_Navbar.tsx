"use client";

import React, { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";

import {
  Sun,
  User,
  LogOut,
  Settings,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/auth/uth_client";
import useRole from "@/hooks/useRole";

export default function Dashboard_Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { user, isLoading, role } = useRole();

  if (isLoading) return <div>Loading...</div>;

  const handlerLogout = async () => {
    await authClient.signOut();
    router.push("/auth/login");
    toast.success("Logged out successfully. Please log in again.");
  };

  return (
    <nav className="flex items-center justify-between w-full   relative">
      <div className="text-sm font-medium text-slate-500">Dashboard</div>

      <div className="flex items-center gap-4">
        {/* Profile Section */}
        <div className="relative border-l pl-4">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium capitalize text-slate-800 leading-none">
                Name:{user?.name}
              </p>
              <p className="text-xs text-slate-500 capitalize"> {role} </p>
            </div>

            {/* Profile Circle */}
            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <User className="h-5 w-5 text-slate-600" />
            </div>

            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* টগল মেনু (ইউজার ইনফো) */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-3 border-b bg-slate-50/50">
                <p className="text-sm font-bold text-slate-900 capitalize"> {user?.name} </p>
                <p className="text-xs text-slate-500"> {user?.email} </p>
              </div>

              <div className="p-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>

                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
                  <ShieldCheck className="h-4 w-4" />
                  Role: {role}
                </button>
              </div>

              <div className="p-1 border-t">
                <button
                  onClick={handlerLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <div className=" text-slate-500 hover:text-slate-600 transition-all p-1">
          <Link className="" href={"/"}>
            {" "}
            <MdKeyboardBackspace size={25} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
