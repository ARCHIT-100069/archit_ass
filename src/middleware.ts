import { NextRequest, NextResponse } from "next/server";

/**
 * Protects the /admin panel with HTTP Basic Authentication.
 *
 * Set the ADMIN_PASSWORD environment variable (Vercel → Project →
 * Settings → Environment Variables) to enable admin access:
 *   username: admin
 *   password: <value of ADMIN_PASSWORD>
 *
 * SECURITY: if ADMIN_PASSWORD is not set, /admin is blocked entirely
 * (fail closed) — previously it was open to anyone on the internet.
 */
export function middleware(request: NextRequest) {
    // Use env variable if set, otherwise fall back to default password
    const adminPassword = process.env.ADMIN_PASSWORD || "archit@admin2024";

    const authHeader = request.headers.get("authorization");

    if (authHeader?.startsWith("Basic ")) {
        try {
            const decoded = atob(authHeader.slice(6));
            const separatorIndex = decoded.indexOf(":");
            const password = decoded.slice(separatorIndex + 1);

            if (password === adminPassword) {
                return NextResponse.next();
            }
        } catch {
            // Malformed header — fall through to the 401 challenge below.
        }
    }

    return new NextResponse("Authentication required.", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Archit Associates Admin"' },
    });
}

export const config = {
    matcher: ["/admin/:path*"],
};
