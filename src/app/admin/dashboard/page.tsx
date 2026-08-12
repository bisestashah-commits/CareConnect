const stats = [
  {
    title: "Total Residents",
    value: "124",
    description: "Currently registered",
  },
  {
    title: "Care Team",
    value: "38",
    description: "Active staff members",
  },
  {
    title: "Open Incidents",
    value: "7",
    description: "Require attention",
  },
  {
    title: "Care Notes",
    value: "286",
    description: "Recorded this month",
  },
];

const recentResidents = [
  {
    name: "Margaret Wilson",
    room: "Room 102",
    status: "Active",
  },
  {
    name: "John Smith",
    room: "Room 118",
    status: "Active",
  },
  {
    name: "Sarah Johnson",
    room: "Room 205",
    status: "Review Required",
  },
  {
    name: "David Brown",
    room: "Room 214",
    status: "Active",
  },
];

const recentActivity = [
  "Care note added for Margaret Wilson",
  "Incident reported for Sarah Johnson",
  "New resident profile created",
  "Family message received",
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              CareConnect
            </h1>

            <p className="text-sm text-slate-500">
              Administrator Portal
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                Admin User
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              AU
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            Welcome back. Here's an overview of CareConnect.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Residents */}
          <section className="rounded-xl border bg-white shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h3 className="font-bold text-slate-900">
                  Recent Residents
                </h3>

                <p className="text-sm text-slate-500">
                  Recently updated resident profiles
                </p>
              </div>

              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View All
              </button>
            </div>

            <div className="divide-y">
              {recentResidents.map((resident) => (
                <div
                  key={resident.name}
                  className="flex items-center justify-between px-6 py-5"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {resident.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {resident.room}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      resident.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {resident.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Activity */}
          <section className="rounded-xl border bg-white shadow-sm">

            <div className="border-b px-6 py-5">
              <h3 className="font-bold text-slate-900">
                Recent Activity
              </h3>

              <p className="text-sm text-slate-500">
                Latest system activity
              </p>
            </div>

            <div className="divide-y">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="px-6 py-5"
                >
                  <p className="text-sm text-slate-700">
                    {activity}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Demo activity
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Quick actions */}
        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

          <h3 className="font-bold text-slate-900">
            Quick Actions
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <button className="rounded-lg border border-slate-200 p-4 text-left hover:bg-slate-50">
              <p className="font-semibold text-slate-900">
                Add Resident
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Create a resident profile
              </p>
            </button>

            <button className="rounded-lg border border-slate-200 p-4 text-left hover:bg-slate-50">
              <p className="font-semibold text-slate-900">
                View Incidents
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Review reported incidents
              </p>
            </button>

            <button className="rounded-lg border border-slate-200 p-4 text-left hover:bg-slate-50">
              <p className="font-semibold text-slate-900">
                Care Notes
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Review recent care notes
              </p>
            </button>

            <button className="rounded-lg border border-slate-200 p-4 text-left hover:bg-slate-50">
              <p className="font-semibold text-slate-900">
                Manage Users
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Manage staff and accounts
              </p>
            </button>

          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="mt-12 border-t bg-white px-6 py-5 text-center text-xs text-slate-500">
        CareConnect — Independent academic/portfolio prototype.
        All information shown is fictional demo data.
      </footer>
    </main>
  );
}