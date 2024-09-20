"use client";

import StateProvider from "src/modules/StateProvider";
import Image from "next/image";
import Toolbar from "src/components/toolbar";
import Drawing from "src/components/drawing";
import styles from "./page.module.css";

export default function Home() {
  return (
    <StateProvider>
      <main className={styles.main}>
        <div className={styles.code}>
          <p>Frontend Engineer Take Home Project</p>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/classkick.png"
            alt="Classkick Logo"
            width={200}
            height={50}
            priority
          />
        </div>

        <div>
          <Toolbar />
          <Drawing />
        </div>
      </main>
    </StateProvider>
  );
}
