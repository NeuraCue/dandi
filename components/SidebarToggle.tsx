"use client";

import { useSidebar } from "@/contexts/SidebarContext";

export default function SidebarToggle() {
  const { toggle, isOpen } = useSidebar();

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
      aria-label="Toggle sidebar"
    >
      {isOpen ? (
        <svg
          className="h-6 w-6"
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
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
}
