"use client";

const posts = [
  { title: "How to write a perfect bug report", tag: "Blog" },
  { title: "Top 10 UI bugs in production apps", tag: "Blog" },
  { title: "IT News: new framework release", tag: "News" },
  { title: "Security: common auth pitfalls", tag: "News" },
  { title: "QA checklist for startups", tag: "Blog" },
  { title: "Performance tips for Next.js", tag: "News" },
];

export default function CommunityFeedPreview() {
  return (
    <section className="relative w-full bg-black py-16">
      <div className="mx-auto w-full px-6 md:px-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Community feed
          </h2>
          <p className="mt-3 text-white/70">
            Блог, IT мэдээ, хэлэлцүүлэг — нэг дор.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/7 transition"
            >
              <div className="inline-flex items-center rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs text-white/80">
                {p.tag}
              </div>
              <h3 className="mt-3 text-white font-semibold leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-white/60 text-sm">
                Preview content… (дараа нь DB-гээс татна)
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
