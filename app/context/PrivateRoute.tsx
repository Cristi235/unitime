"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./UserContext";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; 
  }

  return <>{children}</>;
};