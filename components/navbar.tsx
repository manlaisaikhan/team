"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";

const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function Navbar() {
  const clerkEnabled = Boolean(CLERK_PUBLISHABLE_KEY);

  const NAV_BG = "bg-[#0b1220]/75 backdrop-blur-xl border-b border-white/10";

  // Clerk байхгүй үед
  if (!clerkEnabled) {
    return (
      <nav className={`sticky top-0 z-50 ${NAV_BG}`}>
        <div className="w-full px-6 md:px-10 h-14 flex items-center justify-between">
          {/* LEFT — TITLE */}
          <Link
            href="/setup"
            className="text-lg md:text-xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]">
              Bug Testing Platform
            </span>
          </Link>

          {/* RIGHT — SETUP */}
          <Link href="/setup">
            <Button className="h-9 px-4 text-white font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:brightness-110 shadow-[0_10px_28px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_36px_rgba(79,70,229,0.65)] active:scale-[0.98] transition">
              Тохируулга
            </Button>
          </Link>
        </div>
      </nav>
    );
  }

  // Clerk байгаа үед
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <nav className={`sticky top-0 z-50 ${NAV_BG}`}>
        <div className="w-full px-6 md:px-10 h-14 flex items-center justify-between">
          <div className="h-6 w-44 rounded bg-white/10" />
          <div className="w-28 h-9 rounded bg-white/10" />
        </div>
      </nav>
    );
  }

  return (
    <nav className={`sticky top-0 z-50 ${NAV_BG}`}>
      {/* 🔥 EDGE-TO-EDGE */}
      <div className="w-full px-6 md:px-10 h-14 flex items-center justify-between">
        {/* LEFT — TITLE */}
        <Link
          href="/"
          className="text-lg md:text-xl font-extrabold tracking-tight"
        >
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]">
            Bug Testing Platform
          </span>
        </Link>

        {/* RIGHT — USER / AUTH */}
        {isSignedIn ? (
          <div className="rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-2 py-1">
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button
                variant="secondary"
                className="h-9 px-4 text-white bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/15 hover:border-white/30 transition"
              >
                Нэвтрэх
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="h-9 px-4 text-white font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_10px_28px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_36px_rgba(79,70,229,0.65)] hover:brightness-110 active:scale-[0.98] transition">
                Бүртгүүлэх
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
