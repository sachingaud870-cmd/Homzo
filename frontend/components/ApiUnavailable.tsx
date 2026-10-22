export default function ApiUnavailable() {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-center"
    >
      <h2 className="text-lg font-semibold text-[color:var(--heading)]">
        Property listings are temporarily unavailable
      </h2>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
        The listings service isn&apos;t responding. Please try again in a
        moment.
      </p>
      <a
        href=""
        className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg border border-[color:var(--border-strong)] px-4 py-2 text-sm font-semibold text-[color:var(--heading)] transition hover:bg-[color:var(--surface-hover)]"
      >
        Retry
      </a>
    </div>
  );
}
