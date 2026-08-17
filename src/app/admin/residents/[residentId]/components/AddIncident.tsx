"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type AddIncidentProps = {
  residentId: string;
};

export default function AddIncident({
  residentId,
}: AddIncidentProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Please complete all incident fields.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase
      .from("incidents")
      .insert({
        resident_id: residentId,
        title: title.trim(),
        description: description.trim(),
        severity,
      });

    if (error) {
      console.error("Error adding incident:", error);
      setError(error.message);
      setSaving(false);
      return;
    }

    setTitle("");
    setDescription("");
    setSeverity("Low");
    setSaving(false);

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b bg-slate-50 px-6 py-5"
    >
      <label
        htmlFor="incidentTitle"
        className="block text-sm font-semibold text-slate-700"
      >
        Incident Title
      </label>

      <input
        id="incidentTitle"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter incident title"
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <label
        htmlFor="incidentDescription"
        className="mt-4 block text-sm font-semibold text-slate-700"
      >
        Description
      </label>

      <textarea
        id="incidentDescription"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Describe what happened..."
        rows={3}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <label
        htmlFor="incidentSeverity"
        className="mt-4 block text-sm font-semibold text-slate-700"
      >
        Severity
      </label>

      <select
        id="incidentSeverity"
        value={severity}
        onChange={(event) => setSeverity(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Add Incident"}
      </button>
    </form>
  );
}