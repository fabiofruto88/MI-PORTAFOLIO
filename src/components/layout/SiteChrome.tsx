"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeNav from "@/components/home/HomeNav";

/** El home usa su propia barra y pie cinematográficos; el resto, el layout MUI. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/proyectos";

  if (isHome) {
    return (
      <>
        <HomeNav />
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: "100dvh", paddingTop: "64px" }}>{children}</main>
      <Footer />
    </>
  );
}
