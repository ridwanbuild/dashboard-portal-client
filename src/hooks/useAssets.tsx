"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export const useAssets = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ডাটা ফেচ করার ফাংশন
  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/assets", {
        credentials: "include", // অথেন্টিকেশন সেশন পাঠানোর জন্য জরুরি
      });
      const result = await response.json();

      if (result.success) {
        setAssets(result.data);
      } else {
        console.error("Failed to fetch assets:", result.message);
      }
    } catch (error) {
      console.error("Assets fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // কম্পোনেন্ট মাউন্ট হলে ডাটা লোড হবে
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return {
    assets,
    loading,
    refreshAssets: fetchAssets,
  };
};

