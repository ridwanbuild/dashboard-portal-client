"use client";

import { useState, useEffect, useCallback } from "react";

export const useAgreements = () => {
  const [agreements, setAgreements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgreements = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/agreement", {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setAgreements(result.data);
      }
    } catch (error) {
      console.error("Error fetching agreements:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgreements();
  }, [fetchAgreements]);

  return { agreements, loading, refresh: fetchAgreements };
};