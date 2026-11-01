import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import home from "@/components/home/home.module.css";
import styles from "@/components/common/info.module.css";

export const metadata: Metadata = {
  title: "Página no encontrada | Fabio Fruto Jimenez",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className={home.root}>
      <article className={styles.page}>
        <header className={styles.head}>
          <div className={styles.headText}>
            <p className={styles.eyebrow}>Error 404</p>
            <h1 className={styles.title}>Página no encontrada</h1>
            <p className={styles.lead}>La dirección que abriste no existe o cambió de lugar. Vuelve al inicio o revisa mis proyectos.</p>
          </div>
        </header>
        <div className={styles.cta}>
          <Link href="/" className={styles.ctaPrimary}>
            Volver al inicio <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
      </article>
    </div>
  );
}
