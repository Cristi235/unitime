"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import ResponsiveNavbar from "@/components/Home/Navbar/ResponsiveNavbar";
import { useUser } from "./context/UserContext";

export default function LayoutWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const publicRoutes = ["/", "/login", "/signup", "/forgot-password"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const hideNavbar = isPublicRoute;

  useEffect(() => {
    if (!user && !isPublicRoute) {
      router.push("/login");
    }
  }, [user, isPublicRoute, router]);

  return (
    <>
      {!hideNavbar && <ResponsiveNavbar />}
      <main className={className}>{children}</main>
    </>
  );
}