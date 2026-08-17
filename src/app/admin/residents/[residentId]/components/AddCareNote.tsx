"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type AddCareNoteProps = {
  residentId: string;
};

export default function AddCareNote({
  residentId,
}: AddCareNoteProps) {
  const router = useRouter();

  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!note.trim()) {
      setError("Please enter a care note.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase
      .from("care_notes")
      .insert({
        resident_id: residentId,
        note: note.trim(),
      });

    if (error) {
      console.error("Error adding care note:", error);
      setError(error.message);
      setSaving(false);
      return;
    }

    setNote("");
    setSaving(false);

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b bg-slate-50 px-6 py-5"
    >
      <label
        htmlFor="careNote"
        className="block text-sm font-semibold text-slate-700"
      >
        Add Care Note
      </label>

      <textarea
        id="careNote"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Enter a care note..."
        rows={3}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Add Care Note"}
      </button>
    </form>
  );
}