"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import ResponsiveNavbar from "@/components/Home/Navbar/ResponsiveNavbar";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = ["/", "/login", "/signup", "/forgot-password"].includes(pathname);

  return (
    <>
      {!hideNavbar && <ResponsiveNavbar />}
      <main>{children}</main> {/* Asigură-te că conținutul fiecărei pagini se află aici */}
    </>
  );
}
