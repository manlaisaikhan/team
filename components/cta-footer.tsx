"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaFooter() {
  return (
    <section className="relative w-full bg-black py-16">
      <div className="mx-auto w-full px-6 md:px-10">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-violet-600/20 border border-white/10 backdrop-blur-xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Ready to test?
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl">
            Project-оо оруулаад community-р шалгуул, эсвэл tester болж оноо
            цуглуул.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/test">
              <Button className="h-11 px-6 text-white font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:brightness-110 shadow-[0_12px_35px_rgba(79,70,229,0.45)] active:scale-[0.98] transition">
                Шалгах
              </Button>
            </Link>

            <Link href="/submit">
              <Button
                variant="secondary"
                className="h-11 px-6 text-white bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-md"
              >
                Шалгуулах
              </Button>
            </Link>
          </div>
        </div>

        <footer className="mt-10 flex items-center justify-between text-white/50 text-sm">
          <span>© {new Date().getFullYear()} Bug Testing Platform</span>
          <div className="flex gap-4">
            <Link className="hover:text-white/80 transition" href="/blogs">
              Blog
            </Link>
            <Link className="hover:text-white/80 transition" href="/news">
              News
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
