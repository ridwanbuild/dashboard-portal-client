"use client";

import useRole from "@/hooks/useRole";
import React from "react";
import AdminRoute from "./admin/page";
import ManagerPage from "./manager/page";
import EmployeePage from "./employee/page";




export default function DashboardPage() {
  const { isLoading, role, isAdmin, isManager, isEmployee } = useRole();

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="rounded-md border p-6">

      <h1 className="text-2xl text-teal-700 font-bold ">
        Logged in as {role}
      </h1>
    
      <div className="mt-4">
        {isAdmin && <AdminRoute />}
        {isManager && <ManagerPage />}
        {isEmployee && <EmployeePage />}
      </div>

      <p className="mt-4 text-xs text-slate-400">success dashboard....</p>

    </div>
  );
}