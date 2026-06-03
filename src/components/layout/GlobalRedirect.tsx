"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isFirstLoad = !sessionStorage.getItem("session_started");
    
    // Check if the current document load was triggered by a hard refresh
    const navEntries = window.performance.getEntriesByType("navigation");
    let isReload = false;
    if (navEntries.length > 0) {
      isReload = (navEntries[0] as PerformanceNavigationTiming).type === "reload";
    }

    if (isFirstLoad) {
      // First time opening the tab
      sessionStorage.setItem("session_started", "true");
      if (window.location.pathname !== "/") {
        router.replace("/");
      }
    } else if (isReload) {
      // User performed a hard refresh
      if (window.location.pathname !== "/") {
        router.replace("/");
      }
    }
  }, [router]);

  return null;
}
