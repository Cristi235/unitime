"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import ResponsiveNavbar from "@/components/Home/Navbar/ResponsiveNavbar";

export default function LayoutWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const hideNavbar = ["/", "/login", "/signup", "/forgot-password"].includes(pathname);

  return (
    <>
      {!hideNavbar && <ResponsiveNavbar />}
      <main className={className}>{children}</main> {/* Asigură-te că conținutul fiecărei pagini se află aici */}
    </>
  );
}