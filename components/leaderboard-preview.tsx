"use client";

const rows = [
  { name: "Tester Alpha", score: 1240, badge: "Diamond" },
  { name: "Bug Hunter", score: 980, badge: "Gold" },
  { name: "QA Ninja", score: 860, badge: "Silver" },
];

export default function LeaderboardPreview() {
  return (
    <section className="relative w-full bg-black py-16">
      <div className="mx-auto w-full px-6 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Leaderboard Preview
            </h2>
            <p className="mt-3 text-white/70">
              Шилдэг tester-үүд + оноо. (Дараа нь real data-гаар солино.)
            </p>
          </div>

          <div className="hidden md:block">
            <div className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-white/80 text-sm">
              Weekly • Top 3
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-white/80 text-sm">Rank</span>
            <span className="text-white/80 text-sm">Points</span>
          </div>

          {rows.map((r, i) => (
            <div
              key={r.name}
              className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80">
                  {i + 1}
                </div>
                <div>
                  <div className="text-white font-medium">{r.name}</div>
                  <div className="text-white/60 text-sm">{r.badge}</div>
                </div>
              </div>
              <div className="text-white font-semibold">{r.score}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
