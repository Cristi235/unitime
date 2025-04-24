"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Home/Navbar/Navbar";
import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = ["/", "/login", "/signup", "/forgot-password"].includes(pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main> {/* Asigură-te că conținutul fiecărei pagini se află aici */}
    </>
  );
}
