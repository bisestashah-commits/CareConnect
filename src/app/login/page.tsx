export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <h1 className="text-2xl font-bold text-slate-900">
            CareConnect
          </h1>
          <p className="text-sm text-slate-500">
            Resident & Care Team Platform
          </p>
        </div>
      </header>

      <section className="flex min-h-[calc(100vh-90px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to your CareConnect account
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              <p className="font-semibold">Demo System</p>
              <p className="mt-1">
                Authentication will be connected to Supabase in a later
                development stage.
              </p>
            </div>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                ← Back to CareConnect
              </a>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            This is an independent academic/portfolio prototype.
            All information is fictional demo data.
          </p>
        </div>
      </section>
    </main>
  );
}