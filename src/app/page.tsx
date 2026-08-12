export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              CareConnect
            </h1>
            <p className="text-sm text-slate-500">
              Resident & Care Team Platform
            </p>
          </div>

          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            DEMO SYSTEM
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center px-6 py-16">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left side */}
          <div>
            <p className="mb-4 font-semibold text-blue-600">
              DIGITAL CARE MANAGEMENT
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Better communication.
              <br />
              Better connected care.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              CareConnect is a digital prototype designed to help
              residents, families and care teams stay connected and
              coordinate everyday care activities.
            </p>

            <div className="mt-8 flex gap-4">
              <a 
              href="/login" 
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Sign In
              </a>
              

              <button className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100">
                Learn More
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              CareConnect Portal
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Select your portal to continue.
            </p>

            <div className="mt-6 space-y-4">
              <button className="w-full rounded-xl border border-slate-200 p-5 text-left hover:bg-slate-50">
                <p className="font-semibold text-slate-900">
                  👩‍⚕️ Care Team
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Manage residents, care notes and incidents.
                </p>
              </button>

              <button className="w-full rounded-xl border border-slate-200 p-5 text-left hover:bg-slate-50">
                <p className="font-semibold text-slate-900">
                  👨‍💼 Administrator
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Manage users, residents and system activity.
                </p>
              </button>

              <button className="w-full rounded-xl border border-slate-200 p-5 text-left hover:bg-slate-50">
                <p className="font-semibold text-slate-900">
                  👨‍👩‍👧 Family
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  View approved updates and stay connected.
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="border-t bg-white px-6 py-5 text-center text-xs text-slate-500">
        CareConnect is an independent academic/portfolio prototype.
        All information shown is fictional demo data.
      </footer>
    </main>
  );
}