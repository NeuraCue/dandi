"use client";

import { useState } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { NavItem } from "@/components/navigation/NavItem";
import { SidebarHeader } from "@/components/navigation/SidebarHeader";

/**
 * Sidebar component
 * Single Responsibility: Renders the sidebar UI
 * Uses composition with smaller components
 */
export default function Sidebar() {
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const { isOpen, toggle } = useSidebar();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out lg:relative lg:z-auto ${
        isOpen
          ? "translate-x-0 w-64"
          : "-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden lg:border-0"
      }`}
    >
      <div className="flex h-full w-64 flex-col p-4">
        <SidebarHeader onToggle={toggle} />

        {/* Personal Dropdown */}
        <div className="mb-4">
          <button
            onClick={() => setIsPersonalOpen(!isPersonalOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <span>Personal</span>
            <svg
              className={`h-4 w-4 transition-transform ${
                isPersonalOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col space-y-1">
          {NAVIGATION_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Profile Section */}
        <div className="mt-auto border-t border-gray-200 pt-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <svg
                className="h-4 w-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                support@neuracue.com
              </p>
            </div>
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}
