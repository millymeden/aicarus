// Home page. The previous version is archived in app/_archive/.

const STEPS = [
  {
    title: "Start from the policy need",
    body: "We start with the needs of policymakers to direct research.",
  },
  {
    title: "Develop technical solutions",
    body: "We develop specific technical solutions that enable technically enforceable AI legislation.",
  },
  {
    title: "Deliver policy proposals",
    body: "We package and deliver the results as policy proposals.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-100 pt-[112px] md:pt-[156px] bg-gradient-to-b from-[var(--aicarus-blue-soft)] via-white to-white">
        {/* faint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(81,151,216,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(81,151,216,0.12)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        />
        {/* sun glow, echoing the logo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.22),transparent_62%)] blur-2xl"
        />
        {/* soft blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(81,151,216,0.18),transparent_65%)] blur-2xl"
        />

        <div className="relative mx-auto flex min-h-[68vh] max-w-5xl flex-col justify-center px-6 py-20 md:px-10 md:py-28">
          <div className="kicker flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--aicarus-accent)]" />
            Aicarus
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Making AI policy technically grounded and enforceable
          </h1>
          <div className="mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--aicarus-blue)] to-[var(--aicarus-blue-dark)]" />
          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-700 md:text-xl md:leading-9">
            Aicarus is a research and policy organisation doing policy-directed
            technical research that enables specific and technically enforceable
            AI policies.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
            Starting from the specific policy need, Aicarus produces technical
            solutions and delivers a policy proposal ready for policymakers to
            use.
          </p>

        </div>
      </section>

      <div className="site-main page">
      {/* The problem */}
      <section id="the-problem" className="scroll-mt-8">
        <div className="kicker">The problem</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
          Policy is only as effective as it is enforceable
        </h2>

        <div className="mt-6 space-y-5 text-gray-700 leading-7">
          <p>
            AI risks are no longer just theory, but manifesting in the real
            world with cyberattacks and AI incidents becoming more frequent. The
            need for AI governance is increasing, but the challenges to
            technically enforce policy remain a problem.
          </p>
          <p>
            Failing to create technically grounded legislation, or needing to
            postpone regulation adoption due to a lack of technical solutions,
            could seriously endanger individuals and our society.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="panel p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--aicarus-blue)]">
              Not technically grounded
            </div>
            <p className="mt-2 font-medium text-gray-900">
              Article 50 of the EU AI Act
            </p>
          </div>
          <div className="panel p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--aicarus-blue)]">
              Postponed for lack of technology
            </div>
            <p className="mt-2 font-medium text-gray-900">
              Seismic verification technology for the CTB in 1996
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border-l-4 border-[var(--aicarus-blue)] bg-[var(--aicarus-blue-soft)]/60 px-6 py-5 text-gray-800 leading-7">
          Targeted policy that is technically grounded and enforceable is
          needed, but this requires policy-directed research into the specific
          solutions that would enable such regulation.{" "}
          <span className="font-semibold text-[var(--aicarus-blue-dark)]">
            There is currently a gap between technical research and
            policymakers, hindering this work from being done.
          </span>
        </div>
      </section>

      <div className="divider" />

      {/* What Aicarus does */}
      <section>
        <div className="kicker">What Aicarus does</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
          From policy need to enforceable policy
        </h2>
        <p className="mt-4 text-gray-700 leading-7">
          Aicarus is an organisation that closes the gap between governance and
          technical research to make policy enforceable and technically
          grounded.
        </p>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="panel relative p-6 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(81,151,216,0.35)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--aicarus-blue-soft)] text-sm font-semibold text-[var(--aicarus-blue-dark)]">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-6">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      </div>
    </>
  );
}
