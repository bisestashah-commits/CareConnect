const residentData = {
  "RES-001": {
    name: "Margaret Wilson",
    room: "102",
    status: "Active",
    careLevel: "Standard",
    primaryCarer: "Emma Thompson",
    mobility: "Independent",
    emergencyContact: "Robert Wilson",
    dateOfBirth: "14 March 1942",
  },

  "RES-002": {
    name: "John Smith",
    room: "118",
    status: "Active",
    careLevel: "Standard",
    primaryCarer: "James Anderson",
    mobility: "Requires assistance",
    emergencyContact: "Sarah Smith",
    dateOfBirth: "8 July 1940",
  },

  "RES-003": {
    name: "Sarah Johnson",
    room: "205",
    status: "Review Required",
    careLevel: "Enhanced",
    primaryCarer: "Olivia Martin",
    mobility: "Requires assistance",
    emergencyContact: "Michael Johnson",
    dateOfBirth: "22 November 1945",
  },

  "RES-004": {
    name: "David Brown",
    room: "214",
    status: "Active",
    careLevel: "Standard",
    primaryCarer: "Daniel Harris",
    mobility: "Independent",
    emergencyContact: "Linda Brown",
    dateOfBirth: "3 February 1941",
  },

  "RES-005": {
    name: "Emily Davis",
    room: "221",
    status: "Active",
    careLevel: "Standard",
    primaryCarer: "Sophie Wilson",
    mobility: "Independent",
    emergencyContact: "Mark Davis",
    dateOfBirth: "17 September 1943",
  },

  "RES-006": {
    name: "Robert Taylor",
    room: "305",
    status: "Inactive",
    careLevel: "Standard",
    primaryCarer: "No current allocation",
    mobility: "Requires assistance",
    emergencyContact: "Jennifer Taylor",
    dateOfBirth: "29 January 1939",
  },
};

const careNotes = [
  {
    date: "12 August 2026",
    note: "Morning care routine completed.",
  },
  {
    date: "12 August 2026",
    note: "Breakfast and hydration recorded.",
  },
  {
    date: "11 August 2026",
    note: "Mobility exercise completed with care team.",
  },
];

export default async function ResidentProfile({
  params,
}: {
  params: Promise<{ residentId: string }>;
}) {
  const { residentId } = await params;

  const resident =
    residentData[residentId as keyof typeof residentData];

  if (!resident) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Resident Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            The requested resident profile does not exist in the demo
            system.
          </p>

          <a
            href="/admin/residents"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ← Back to Residents
          </a>
        </div>
      </main>
    );
  }

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

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            AU
          </div>

        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Back */}
        <a
          href="/admin/residents"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Residents
        </a>

        {/* Profile Header */}
        <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                {resident.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {resident.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Resident ID: {residentId}
                </p>

                <p className="text-sm text-slate-500">
                  Room {resident.room}
                </p>
              </div>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                resident.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : resident.status === "Review Required"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {resident.status}
            </span>

          </div>

        </section>

        {/* Information */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          {/* Personal Information */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">

            <h3 className="text-lg font-bold text-slate-900">
              Personal Information
            </h3>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Full Name
                </p>

                <p className="mt-1 text-slate-900">
                  {resident.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Date of Birth
                </p>

                <p className="mt-1 text-slate-900">
                  {resident.dateOfBirth}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Room
                </p>

                <p className="mt-1 text-slate-900">
                  Room {resident.room}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Emergency Contact
                </p>

                <p className="mt-1 text-slate-900">
                  {resident.emergencyContact}
                </p>
              </div>

            </div>

          </section>

          {/* Care Information */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">

            <h3 className="text-lg font-bold text-slate-900">
              Care Information
            </h3>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Care Level
                </p>

                <p className="mt-1 text-slate-900">
                  {resident.careLevel}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Primary Carer
                </p>

                <p className="mt-1 text-slate-900">
                  {resident.primaryCarer}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Mobility
                </p>

                <p className="mt-1 text-slate-900">
                  {resident.mobility}
                </p>
              </div>

            </div>

          </section>

        </div>

        {/* Care Notes */}
        <section className="mt-8 rounded-xl border bg-white shadow-sm">

          <div className="border-b px-6 py-5">

            <h3 className="text-lg font-bold text-slate-900">
              Recent Care Notes
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Fictional demonstration notes
            </p>

          </div>

          <div className="divide-y">

            {careNotes.map((note, index) => (
              <div
                key={index}
                className="px-6 py-5"
              >

                <p className="text-sm font-medium text-slate-900">
                  {note.note}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {note.date}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* Demo Warning */}
        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">

          <p className="font-semibold">
            Demo Data
          </p>

          <p className="mt-1">
            This resident profile contains fictional information
            created for the CareConnect academic/portfolio prototype.
            It is not connected to a real healthcare organisation.
          </p>

        </div>

      </div>

    </main>
  );
}