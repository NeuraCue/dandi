import { ReactNode } from "react";

export interface NavigationItem {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
}
