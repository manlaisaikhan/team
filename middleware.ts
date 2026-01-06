import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if Clerk keys are set
const clerkSecretKey = process.env.CLERK_SECRET_KEY;
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const hasClerkKeys = !!(clerkSecretKey && clerkPublishableKey);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If Clerk keys are missing, redirect to setup page
  if (!hasClerkKeys) {
    // Allow access to setup page and static files
    if (
      pathname.startsWith("/setup") ||
      pathname.startsWith("/_next") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/setup", request.url));
  }

  // If Clerk keys are set, use Clerk middleware
  // We need to dynamically import to avoid errors when keys are missing
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { authMiddleware } = require("@clerk/nextjs");
    return authMiddleware({
      publicRoutes: [
        "/",
        "/api/webhooks/clerk",
        "/sign-in",
        "/sign-up",
        "/setup",
      ],
    })(request);
  } catch (error) {
    // If Clerk middleware fails, redirect to setup
    console.error("Clerk middleware error:", error);
    if (!pathname.startsWith("/setup")) {
      return NextResponse.redirect(new URL("/setup", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
