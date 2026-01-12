import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export const useEmployees = (employeeId?: string) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // সব ডাটা ফেচ করার মূল ফাংশন
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      // যদি ID থাকে তবে নির্দিষ্ট ইউজার, নাহলে সব ইউজার
      const url = employeeId 
        ? `http://localhost:5000/api/employee/${employeeId}` 
        : "http://localhost:5000/api/employee";

      const response = await fetch(url, { credentials: "include" });
      const result = await response.json();

      if (result.success) {
        // ডাটাবেজ থেকে আসা Assets, Agreements সহ ডাটা সেট করা

        setEmployees(Array.isArray(result.data) ? result.data : [result.data]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { 
    employees, 
    loading, 
    refresh: fetchEmployees, // এটি কল করলে ডাটা লেটেস্ট হয়ে যাবে
    setEmployees 
  };
};



