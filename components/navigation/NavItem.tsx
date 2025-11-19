import Link from "next/link";
import { NavigationItem } from "@/types/navigation";
import { usePathname } from "next/navigation";

interface NavItemProps {
  item: NavigationItem;
}

/**
 * Navigation item component
 * Single Responsibility: Renders a single navigation item
 */
export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const isActive = item.href.startsWith("http")
    ? false
    : pathname === item.href || pathname?.startsWith(item.href + "/");

  const LinkComponent = item.external ? "a" : Link;
  const linkProps = item.external
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: item.href };

  return (
    <LinkComponent
      {...linkProps}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {item.icon}
      <span>{item.label}</span>
      {item.external && (
        <svg
          className="ml-auto h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </LinkComponent>
  );
}
