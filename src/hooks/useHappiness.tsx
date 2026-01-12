import { useState, useEffect, useCallback } from "react";

export const useHappiness = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ডাটা লোড করার ফাংশন
  const loadHappinessData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/happinessMessage", {
        credentials: "include", // অথেনটিকেশনের জন্য
      });
      const result = await response.json();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // পেজ লোড হওয়ার সময় কল হবে
  useEffect(() => {
    loadHappinessData();
  }, [loadHappinessData]);

  return { messages, isLoading, refreshData: loadHappinessData };
};