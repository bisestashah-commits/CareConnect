"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function EditResidentPage() {
  const params = useParams();
  const router = useRouter();

  const residentId = params.residentId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    room: "",
    dateOfBirth: "",
    emergencyContact: "",
    careLevel: "",
    mobility: "",
    status: "",
  });

  useEffect(() => {
    async function loadResident() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("residents")
        .select(
             "resident_id, full_name, room, status, date_of_birth, care_level, mobility, emergency_contact"
        )
        .eq("resident_id", residentId)
        .maybeSingle();

    console.log("Resident ID:", residentId);
    console.log("Resident data:", data);
    console.log("Resident error:", error);    

      if (error) {
        console.error("Supabase error:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      if(!data){
        setError("Resident could not be found.")
        setLoading(false);
        return
      }

      setFormData({
        fullName: data.full_name || "",
        room: String(data.room) || "",
        dateOfBirth: data.date_of_birth || "",
        emergencyContact: data.emergency_contact || "",
        careLevel: data.care_level || "",
        mobility: data.mobility || "",
        status: data.status || "",
      });

      setLoading(false);
    }

    loadResident();
  }, [residentId]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess(false);

    const supabase = createClient();

    const { error } = await supabase
      .from("residents")
      .update({
        full_name: formData.fullName,
        room: formData.room,
        date_of_birth: formData.dateOfBirth,
        emergency_contact: formData.emergencyContact,
        care_level: formData.careLevel,
        mobility: formData.mobility,
        status: formData.status,
      })
      .eq("resident_id", residentId);

    if (error) {
      console.error("Error updating resident:", error);
      setError(error.message);
      setSaving(false);
      return;
    }

    setSuccess(true);
    setSaving(false);

    setTimeout(() => {
      router.push(`/admin/residents/${residentId}`);
      router.refresh();
    }, 1000);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <p className="text-slate-600">
            Loading resident...
          </p>
        </div>
      </main>
    );
  }

  if (error && !formData.fullName) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Resident Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            {error}
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
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Back */}
        <a
          href={`/admin/residents/${residentId}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Resident Profile
        </a>

        {/* Heading */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Edit Resident
          </h2>

          <p className="mt-2 text-slate-500">
            Update the resident's information.
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
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Resident ID */}
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Resident ID
                </label>

                <input
                  type="text"
                  value={residentId}
                  disabled
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
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
                  value={formData.room}
                  onChange={handleChange}
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
                  value={formData.dateOfBirth}
                  onChange={handleChange}
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
                  value={formData.emergencyContact}
                  onChange={handleChange}
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
                  value={formData.careLevel}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select care level</option>
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
                  value={formData.mobility}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select mobility status
                  </option>

                  <option value="Independent">
                    Independent
                  </option>

                  <option value="Requires assistance">
                    Requires assistance
                  </option>

                  <option value="Wheelchair">
                    Wheelchair
                  </option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Active">Active</option>
                  <option value="Review Required">
                    Review Required
                  </option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <p className="font-semibold">
                Unable to update resident
              </p>

              <p className="mt-1">{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">
              <p className="font-semibold">
                Resident updated successfully!
              </p>

              <p className="mt-1">
                Returning to the resident profile...
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <a
              href={`/admin/residents/${residentId}`}
              className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </a>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Demo Warning */}
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