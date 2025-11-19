"use client";

import Sidebar from "@/components/Sidebar";
import SidebarToggle from "@/components/SidebarToggle";
import { useSidebar } from "@/contexts/SidebarContext";

export default function BillingPage() {
  const { isOpen, close } = useSidebar();
  
  return (
    <div className="flex min-h-screen">
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={close}
        />
      )}
      <Sidebar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-8 flex items-center gap-4">
            <SidebarToggle />
            <div>
              <p className="text-sm text-gray-600">Pages / Billing</p>
              <h1 className="text-3xl font-bold text-white">Billing</h1>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-gray-600">Billing content coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
