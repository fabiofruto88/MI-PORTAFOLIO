"use client";

import type { ReactNode } from "react";
import HomeNav from "@/components/home/HomeNav";

/** Todas las páginas comparten la barra del home (incluida la 404). */
export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <HomeNav />
      <main>{children}</main>
    </>
  );
}
