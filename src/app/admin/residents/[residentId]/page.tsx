import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";

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

  const supabase = createClient();

  const { data: resident, error } = await supabase
    .from("residents")
    .select("*")
    .eq("resident_id", residentId)
    .single();

  if (error || !resident) {
    notFound();
  }

  const formattedDateOfBirth = resident.date_of_birth
    ? new Date(resident.date_of_birth).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

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
                {resident.full_name
                  .split(" ")
                  .map((name: string) => name[0])
                  .join("")}
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {resident.full_name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Resident ID: {resident.resident_id}
                </p>

                <p className="text-sm text-slate-500">
                  Room {resident.room}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
              <a
              href={`/admin/residents/${resident.resident_id}/edit`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Edit Resident
              </a>
            </div>
            
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
                  {resident.full_name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Date of Birth
                </p>
                <p className="mt-1 text-slate-900">
                  {formattedDateOfBirth}
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
                  {resident.emergency_contact}
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
                  {resident.care_level}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Primary Carer
                </p>
                <p className="mt-1 text-slate-900">
                  Not assigned in V1
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
              <div key={index} className="px-6 py-5">
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
          <p className="font-semibold">Demo Data</p>

          <p className="mt-1">
            This resident profile contains fictional information created
            for the CareConnect academic/portfolio prototype. It is not
            connected to a real healthcare organisation.
          </p>
        </div>
      </div>
    </main>
  );
}