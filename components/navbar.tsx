"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavbarWithAuth } from "./navbar-with-auth";

// Check if Clerk is configured (this will be replaced at build time)
const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function Navbar() {
  // If Clerk is set up, render auth navbar (it handles errors gracefully)
  try {
    if (CLERK_PUBLISHABLE_KEY) {
      return <NavbarWithAuth />;
    }
  } catch {
    // fall through
  }

  // ✅ Minimal navbar (Home-той адил neon/glass)
  return (
    <nav className="sticky top-0 z-50  bg-black ">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            href="/setup"
            className="text-lg md:text-xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.45)]">
              Bug Testing Platform
            </span>
          </Link>

          <Link href="/setup">
            <Button
              className="
                h-10 px-4 text-white font-semibold
                bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
                shadow-[0_10px_28px_rgba(79,70,229,0.45)]
                hover:shadow-[0_12px_36px_rgba(79,70,229,0.65)]
                hover:brightness-110
                active:scale-[0.98]
                transition
              "
            >
              Тохируулга
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
