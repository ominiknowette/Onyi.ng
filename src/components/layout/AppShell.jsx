import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Overview" },
  { to: "/feed", label: "Feed" },
  { to: "/courses", label: "Courses" },
  { to: "/messages", label: "Messages" },
  { to: "/profile", label: "Profile" },
];

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#08080ad9] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div>
            <p className="font-display text-2xl font-black tracking-[-0.08em] text-white">
              Onyi<span className="ml-1 text-amber">.ng</span>
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              Campus Social Network
            </p>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "rounded-full px-4 py-2 text-sm font-bold transition",
                    isActive
                      ? "bg-amber text-black"
                      : "text-slate-300 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 md:py-12">{children}</main>
    </div>
  );
}

