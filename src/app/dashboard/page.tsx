"use client";

import useRole from "@/hooks/useRole";
import React from "react";

export default function DashboardPage() {
  const { isLoading, role } = useRole();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rounded-md border  p-6">
      
      <h1 className="text-2xl text-teal-700 font-bold">Logged in as {role}</h1>
      <p>success dashboard....</p>

    </div>
  );
}
