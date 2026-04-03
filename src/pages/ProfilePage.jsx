export default function ProfilePage() {
  return (
    <section className="page-grid">
      <div className="panel p-8">
        <span className="eyebrow">Identity Layer</span>
        <h1 className="mt-5 font-display text-5xl font-black tracking-[-0.05em] text-white">
          Auth, onboarding, and reputation start here
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          The initial user model in the brief includes school, department, level, bio, avatar, and reputation. This route is the placeholder for the authenticated profile and onboarding flow.
        </p>
      </div>
      <div className="panel p-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">Starter profile fields</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["name", "email", "school", "department", "level", "avatar_url", "bio", "rep_points", "is_pro"].map((field) => (
            <div key={field} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 font-mono text-sm text-slate-200">
              {field}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

