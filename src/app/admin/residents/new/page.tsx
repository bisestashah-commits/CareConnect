"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function NewResidentPage() {
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSubmitted(false);

    const formData = new FormData(event.currentTarget);

    const fullName = formData.get("fullName") as string;
    const residentId = formData.get("residentId") as string;
    const room = formData.get("room") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const emergencyContact = formData.get("emergencyContact") as string;
    const careLevel = formData.get("careLevel") as string;
    const mobility = formData.get("mobility") as string;

    const supabase = createClient();

    const { error } = await supabase.from("residents").insert({
      resident_id: residentId,
      full_name: fullName,
      room: room,
      date_of_birth: dateOfBirth,
      emergency_contact: emergencyContact,
      care_level: careLevel,
      mobility: mobility,
      status: "Active",
    });

    if (error) {
      console.error("Error creating resident:", error);
      setError(error.message);
      setSaving(false);
      return;
    }

    setSubmitted(true);
    setSaving(false);

    setTimeout(() => {
      router.push("/admin/residents");
    }, 1000);
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
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Back */}
        <a
          href="/admin/residents"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Residents
        </a>

        {/* Heading */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Add Resident
          </h2>

          <p className="mt-2 text-slate-500">
            Create a new resident profile.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border bg-white p-6 shadow-sm"
        >
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Personal Information
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter resident's full name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Resident ID */}
              <div>
                <label
                  htmlFor="residentId"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Resident ID
                </label>

                <input
                  id="residentId"
                  name="residentId"
                  type="text"
                  placeholder="e.g. RES-007"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Room */}
              <div>
                <label
                  htmlFor="room"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Room Number
                </label>

                <input
                  id="room"
                  name="room"
                  type="text"
                  placeholder="e.g. 306"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Date of Birth
                </label>

                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Emergency Contact */}
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Emergency Contact
                </label>

                <input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="text"
                  placeholder="Demo contact name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Care Information */}
          <div className="mt-10 border-t pt-8">
            <h3 className="text-lg font-bold text-slate-900">
              Care Information
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Care Level */}
              <div>
                <label
                  htmlFor="careLevel"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Care Level
                </label>

                <select
                  id="careLevel"
                  name="careLevel"
                  defaultValue=""
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Select care level
                  </option>

                  <option value="Standard">Standard</option>
                  <option value="Enhanced">Enhanced</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Mobility */}
              <div>
                <label
                  htmlFor="mobility"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Mobility
                </label>

                <select
                  id="mobility"
                  name="mobility"
                  defaultValue=""
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Select mobility status
                  </option>

                  <option value="Independent">Independent</option>
                  <option value="Requires assistance">
                    Requires assistance
                  </option>
                  <option value="Wheelchair">Wheelchair</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <p className="font-semibold">
                Unable to create resident
              </p>

              <p className="mt-1">{error}</p>
            </div>
          )}

          {/* Success */}
          {submitted && (
            <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">
              <p className="font-semibold">
                Resident created successfully!
              </p>

              <p className="mt-1">
                Returning to Resident Management...
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <a
              href="/admin/residents"
              className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </a>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create Resident"}
            </button>
          </div>
        </form>

        {/* Disclaimer */}
        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-semibold">
            Demo System
          </p>

          <p className="mt-1">
            Please use fictional information only. This prototype is
            not connected to a real healthcare organisation.
          </p>
        </div>
      </div>
    </main>
  );
}