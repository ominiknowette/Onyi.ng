const features = [
  "Twitter-style timeline feed",
  "Structured post types: tip, review, material, question, experience",
  "Course tags linked to course pages",
  "Bookmarks, comments, reposts, and search",
];

export default function FeedPage() {
  return (
    <section className="page-grid">
      <div className="panel p-8">
        <span className="eyebrow">Feed MVP</span>
        <h1 className="mt-5 font-display text-5xl font-black tracking-[-0.05em] text-white">
          Timeline and posting foundation
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          The documentation treats the feed as the product heartbeat. This page is the placeholder where the authenticated timeline, composer, and post interactions will land.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature} className="panel p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber">MVP feature</p>
            <p className="mt-3 text-lg font-bold text-white">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

