"use client";

import { Upload, Search, BadgeCheck } from "lucide-react";

const steps = [
  {
    title: "Project оруулах",
    desc: "Линк + тайлбар + шаардлагатай бол screenshot-оо нэм.",
    Icon: Upload,
  },
  {
    title: "Tester шалгах",
    desc: "Bug олбол алхам, severity, нотолгоо (зураг/видео) үлдээнэ.",
    Icon: Search,
  },
  {
    title: "Approve → Оноо",
    desc: "Owner баталгаажуулна. Зөв бол оноо/coin автоматаар олгоно.",
    Icon: BadgeCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full bg-black py-16">
      <div className="mx-auto w-full px-6 md:px-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Яаж ажилладаг вэ?
          </h2>
          <p className="mt-3 text-white/70">
            3 алхам — submit, test, approve. Ингээд л болоо.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(({ title, desc, Icon }, idx) => (
            <div
              key={title}
              className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-white/60 font-semibold">0{idx + 1}</span>
              </div>

              <h3 className="mt-4 text-white font-semibold text-lg">{title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{desc}</p>

              <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
