"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "aa_scroll_restore";

/**
 * ScrollPositionManager
 *
 * Persists scroll position across full-page refreshes only.
 * Does NOT affect client-side navigation between pages.
 *
 * How it works:
 * - `beforeunload` fires on full-page refresh (F5 / Ctrl+R), external navigation,
 *   and tab close — NOT on Next.js internal client-side navigation.
 * - So saving on `beforeunload` naturally scopes to refresh-only scenarios.
 * - On mount, if the stored path matches the current path, we restore and clear.
 * - The restore is delayed past the Preloader duration (2200ms display + 600ms
 *   fade transition = 2800ms) so the restored position is visible once the
 *   overlay clears, not while it is still on screen.
 */
export default function ScrollPositionManager() {
    const pathname = usePathname();

    // ── Save ──────────────────────────────────────────────────────────────────
    // Register a beforeunload listener that snapshots the current scroll position.
    // Fires only on full-page refresh/close — never on SPA navigation.
    useEffect(() => {
        const handleBeforeUnload = () => {
            const y = window.scrollY;
            if (y > 0) {
                try {
                    sessionStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify({ path: pathname, y })
                    );
                } catch {
                    // sessionStorage may be unavailable in certain contexts — fail silently.
                }
            } else {
                sessionStorage.removeItem(STORAGE_KEY);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [pathname]);

    // ── Restore ───────────────────────────────────────────────────────────────
    // On mount (or pathname change), check if there is a saved position for the
    // current path. If so, restore after the Preloader has fully faded out.
    useEffect(() => {
        let raw: string | null = null;
        try {
            raw = sessionStorage.getItem(STORAGE_KEY);
        } catch {
            return; // sessionStorage unavailable — nothing to do.
        }

        if (!raw) return;

        let saved: { path: string; y: number } | null = null;
        try {
            saved = JSON.parse(raw);
        } catch {
            sessionStorage.removeItem(STORAGE_KEY);
            return;
        }

        if (!saved || saved.path !== pathname || saved.y <= 0) {
            // Different page (client navigation) or no useful scroll value.
            // Do NOT restore — leave normal top-of-page behavior in place.
            return;
        }

        // Same path → this is a full-page refresh.
        // Clear immediately so subsequent visits start fresh.
        sessionStorage.removeItem(STORAGE_KEY);

        const targetY = saved.y;

        // Delay past Preloader: 2200ms (display) + 600ms (fade transition) + 100ms buffer.
        const timer = setTimeout(() => {
            window.scrollTo({ top: targetY, behavior: "instant" });
        }, 2900);

        return () => clearTimeout(timer);
    }, [pathname]);

    // No visual output — purely behavioural.
    return null;
}
