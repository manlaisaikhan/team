"use client";

import { ShieldCheck, Bug, Coins } from "lucide-react";

const items = [
  {
    title: "Community-р шалгуулах",
    desc: "Веб/апп-аа оруулаад tester-үүдээс бодит bug report ав.",
    Icon: ShieldCheck,
  },
  {
    title: "Bug олж оноо авах",
    desc: "QA хийж bug илрүүлээд оноо, badge цуглуул.",
    Icon: Bug,
  },
  {
    title: "Оноо → Reward",
    desc: "Оноогоо coin болгож, rank ахиулж, урамшуулал ав.",
    Icon: Coins,
  },
];

export default function ValueProps() {
  return (
    <section className="relative w-full bg-black py-16">
      <div className="mx-auto w-full px-6 md:px-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Яагаад энэ платформ вэ?
          </h2>
          <p className="mt-3 text-white/70">
            QA-г community хэлбэрээр хурдасга. Илүү хурдан, илүү бодит feedback.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="
                rounded-2xl p-6
                bg-white/5 border border-white/10
                backdrop-blur-xl
                shadow-[0_25px_70px_rgba(99,102,241,0.12)]
                hover:bg-white/7 transition
              "
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg">{title}</h3>
              </div>
              <p className="mt-3 text-white/70 leading-relaxed">{desc}</p>
              <div className="mt-5 h-[2px] w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-70" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
