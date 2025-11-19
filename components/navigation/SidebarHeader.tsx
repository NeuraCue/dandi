import Link from "next/link";

interface SidebarHeaderProps {
  onToggle: () => void;
}

/**
 * Sidebar header component
 * Single Responsibility: Renders sidebar header with logo and toggle
 */
export function SidebarHeader({ onToggle }: SidebarHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-orange-500 to-red-500">
          <span className="text-lg font-bold text-white">D</span>
        </div>
        <span className="text-xl font-bold text-gray-900">Dandi AI</span>
      </Link>
      {/* Desktop toggle */}
      <button
        onClick={onToggle}
        className="hidden rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 lg:block"
        aria-label="Toggle sidebar"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
      {/* Mobile close button */}
      <button
        onClick={onToggle}
        className="lg:hidden"
        aria-label="Close sidebar"
      >
        <svg
          className="h-5 w-5 text-gray-500"
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
  );
}
