const messageNotes = [
  "Public key per user stored in the database",
  "Private key stays on the device",
  "Ciphertext and nonce stored server-side",
  "Decryption happens client-side only",
];

export default function MessagesPage() {
  return (
    <section className="page-grid">
      <div className="panel p-8">
        <span className="eyebrow">Encrypted DMs</span>
        <h1 className="mt-5 font-display text-5xl font-black tracking-[-0.05em] text-white">
          Zero-knowledge messaging foundation
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          The documentation is unusually explicit here, so the crypto helper layer and schema were scaffolded to match a public-key messaging model.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {messageNotes.map((note) => (
          <div key={note} className="panel p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber">Encryption note</p>
            <p className="mt-3 text-lg font-bold text-white">{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

