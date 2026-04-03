export default function SectionCard({ title, body, meta }) {
  return (
    <article className="panel p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
        {meta ? <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber">{meta}</span> : null}
      </div>
      <p className="text-sm leading-7 text-slate-300">{body}</p>
    </article>
  );
}

