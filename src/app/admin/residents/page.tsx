"use client";
import { useState } from "react";
const residents = [
  {
    id: "RES-001",
    name: "Margaret Wilson",
    room: "102",
    status: "Active",
    lastUpdated: "Today",
  },
  {
    id: "RES-002",
    name: "John Smith",
    room: "118",
    status: "Active",
    lastUpdated: "Today",
  },
  {
    id: "RES-003",
    name: "Sarah Johnson",
    room: "205",
    status: "Review Required",
    lastUpdated: "Yesterday",
  },
  {
    id: "RES-004",
    name: "David Brown",
    room: "214",
    status: "Active",
    lastUpdated: "2 days ago",
  },
  {
    id: "RES-005",
    name: "Emily Davis",
    room: "221",
    status: "Active",
    lastUpdated: "2 days ago",
  },
  {
    id: "RES-006",
    name: "Robert Taylor",
    room: "305",
    status: "Inactive",
    lastUpdated: "5 days ago",
  },
];

export default function ResidentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.id.toLowerCase().includes(searchTerm.toLowerCase())
);
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

        {/* Page Heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Resident Management
            </h2>

            <p className="mt-2 text-slate-500">
              View and manage resident profiles.
            </p>
          </div>

          <a 
          href="/admin/residents/new"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Resident
          </a>

        </div>

        {/* Search */}
        <div className="mt-8 rounded-xl border bg-white p-5 shadow-sm">

          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search Residents
          </label>

          <input
            id="search"
            type="text"
            placeholder="Search by name or resident ID..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Resident Table */}
        <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="border-b bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Resident
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Resident ID
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Room
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Last Updated
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {filteredResidents.map((resident) => (

                  <tr
                    key={resident.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">

                      <p className="font-semibold text-slate-900">
                        {resident.name}
                      </p>

                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {resident.id}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      Room {resident.room}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          resident.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : resident.status === "Review Required"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {resident.status}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {resident.lastUpdated}
                    </td>

                    <td className="px-6 py-5">

                      <a 
                      href={`/admin/residents/${resident.id}`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View profile
                      </a>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">

          <p className="font-semibold">
            Demo Data
          </p>

          <p className="mt-1">
            All residents shown are fictional and are used only
            for this academic/portfolio prototype.
          </p>

        </div>

      </div>

    </main>
  );
}