"use client";

import { useEffect } from "react";

export default function RefreshRedirect() {
    useEffect(() => {
        // Only redirect if we're NOT already on the homepage
        if (window.location.pathname === "/") return;

        let isReload = false;

        // Modern API (PerformanceNavigationTiming)
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries.length > 0) {
            const navEntry = navEntries[0] as PerformanceNavigationTiming;
            isReload = navEntry.type === "reload";
        }
        // Legacy fallback
        else if (performance.navigation) {
            isReload = performance.navigation.type === 1;
        }

        if (isReload) {
            window.location.replace("/");
        }
    }, []);

    return null;
}
