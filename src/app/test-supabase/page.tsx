"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function SupabaseTestPage() {
  const [message, setMessage] = useState("Testing connection...");

  useEffect(() => {
    async function testConnection() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("residents")
        .select("resident_id, full_name")
        .limit(3);

      if (error) {
        setMessage(`Connection failed: ${error.message}`);
        return;
      }

      setMessage(
        `Connection successful! Found ${data.length} resident records.`
      );
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Supabase Connection Test
        </h1>

        <p className="mt-4 text-slate-600">
          {message}
        </p>
      </div>
    </main>
  );
}