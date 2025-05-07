import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./layout-wrapper";
import Footer from "./Footer";
import { UserProvider } from "./context/UserContext";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniTime",
  description: "Student planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased flex flex-col min-h-screen`}>
        <UserProvider>
          <LayoutWrapper className="flex-grow">{children}</LayoutWrapper>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
