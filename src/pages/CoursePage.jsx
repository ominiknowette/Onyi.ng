const courseFeatures = [
  "Dedicated page per course code",
  "Ratings for difficulty, usefulness, and lecturer quality",
  "Past question uploads by school and year",
  "Searchable course-specific discussion",
];

export default function CoursePage() {
  return (
    <section className="page-grid">
      <div className="panel p-8">
        <span className="eyebrow">Course Intelligence</span>
        <h1 className="mt-5 font-display text-5xl font-black tracking-[-0.05em] text-white">
          Structured academic context
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          Course pages are one of the strongest differentiators in the brief. They turn the product from a generic social app into a student tool with Nigerian campus context.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {courseFeatures.map((feature) => (
          <div key={feature} className="panel p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber">Course page</p>
            <p className="mt-3 text-lg font-bold text-white">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

