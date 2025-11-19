import { useState, useCallback } from "react";

/**
 * Custom hook for managing toast notifications
 * Single Responsibility: Handles toast state management
 */
export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "warning" | "error";
    isVisible: boolean;
  }>({
    message: "",
    variant: "success",
    isVisible: false,
  });

  const showToast = useCallback(
    (message: string, variant: "success" | "warning" | "error" = "success") => {
      setToast({ message, variant, isVisible: true });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
