export default function BuilderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-bg-subtle text-text-primary">
      <div className="max-w-xl text-center space-y-4 bg-white p-8 rounded-2xl border border-border shadow-sm">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent-dark text-white">
          Milestone 0 — Project Setup
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          monis.rent Workspace Builder
        </h1>
        <p className="text-sm text-text-secondary">
          Environment Next.js 14 + TypeScript + Tailwind CSS berhasil disiapkan dengan font Inter.
        </p>
        <div className="pt-4 flex justify-center gap-2">
          <span className="px-2.5 py-1 text-xs rounded-md bg-emerald-50 text-accent-green font-medium border border-emerald-200">
            ✓ Inter Font Active
          </span>
          <span className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-text-secondary font-medium border border-border">
            ✓ Data JSON Loaded
          </span>
        </div>
      </div>
    </main>
  );
}
