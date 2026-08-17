"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type DeactivateButtonProps = {
  residentId: string;
};

export default function DeactivateButton({
  residentId,
}: DeactivateButtonProps) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  async function handleDeactivate() {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this resident?"
    );

    if (!confirmed) {
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const { error } = await supabase
      .from("residents")
      .update({
        status: "Inactive",
      })
      .eq("resident_id", residentId);

    if (error) {
      console.error("Error deactivating resident:", error);
      alert(`Unable to deactivate resident: ${error.message}`);
      setSaving(false);
      return;
    }

    console.log("Resident deactivated successfully");

    router.refresh();
    setSaving(false);
  }

  return (
    <button
      type="button"
      onClick={handleDeactivate}
      disabled={saving}
      className="rounded-lg border-0 bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm outline-none transition hover:bg-red-700 focus:border-0 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {saving ? "Deactivating..." : "Deactivate"}
    </button>
  );
}