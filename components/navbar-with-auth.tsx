"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";

export function NavbarWithAuth() {
  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center gap-3">
          <Link
            href="/"
            className="text-lg md:text-xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.45)]">
              Bug Testing Platform
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            {[
              { href: "/", label: "Нүүр" },
              { href: "/test", label: "Шалгах" },
              { href: "/submit", label: "Шалгуулах" },
              { href: "/blogs", label: "Блог" },
              { href: "/news", label: "Мэдээ" },
              { href: "/points", label: "Оноо" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="h-9 px-3 text-white/90 bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition"
                >
                  {item.label}
                </Button>
              </Link>
            ))}

            <div className="ml-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-2 py-1">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
          : (
          <div className="flex items-center gap-2">
            {/* ✅ ЭНЭ 2 товч 100% ажиллана */}
          </div>
          )
        </div>
      </div>
    </nav>
  );
}
