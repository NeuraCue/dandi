"use client";

import { useEffect, useState } from "react";
import { ToastProps } from "@/types/toast";

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 3000,
  variant = "success",
}: ToastProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setTimeout(() => onClose(), 200); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !shouldRender) return null;

  // Define styles based on variant
  const variantStyles = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  // Define icon based on variant
  const getIcon = () => {
    if (variant === "success") {
      return (
        <svg
          className="h-5 w-5 flex-shrink-0 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    } else if (variant === "warning") {
      return (
        <svg
          className="h-5 w-5 flex-shrink-0 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    } else {
      // error variant
      return (
        <svg
          className="h-5 w-5 flex-shrink-0 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
  };

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transform transition-all duration-300 ${
        shouldRender
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className={`flex items-center gap-3 rounded-lg ${variantStyles[variant]} px-4 py-3 shadow-lg`}>
        {/* Icon */}
        {getIcon()}
        {/* Message */}
        <span className="text-sm font-medium text-white">{message}</span>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="ml-2 flex-shrink-0 text-white/80 transition-colors hover:text-white"
          aria-label="Close notification"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
