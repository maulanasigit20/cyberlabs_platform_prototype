"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Clock3,
  FileSearch,
  Filter,
  FolderOpen,
  Plus,
  Search,
  X,
  UserRound,
  CircleDot,
  ClipboardList,
  Paperclip,
  ExternalLink,
} from "lucide-react";

type CaseStatus = "Open" | "In Progress" | "Under Review" | "Closed";
type Priority = "Critical" | "High" | "Medium" | "Low";
type CaseCategory =
  | "Malware Analysis"
  | "Threat Investigation"
  | "Vulnerability Assessment"
  | "Penetration Testing"
  | "Other";

type CaseItem = {
  id: string;
  title: string;
  category: CaseCategory;
  priority: Priority;
  status: CaseStatus;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  evidenceCount: number;
};

const initialCases: CaseItem[] = [
  {
    id: "CASE-2026-001",
    title: "Suspicious Executable Investigation",
    category: "Malware Analysis",
    priority: "High",
    status: "In Progress",
    assignee: "Security Analyst",
    createdAt: "12 Oct 2026",
    updatedAt: "13 Oct 2026",
    description:
      "Investigate a suspicious executable submitted for malware analysis. Review available analysis results and record relevant indicators.",
    evidenceCount: 3,
  },
  {
    id: "CASE-2026-002",
    title: "Suspicious Domain Investigation",
    category: "Threat Investigation",
    priority: "High",
    status: "Open",
    assignee: "Unassigned",
    createdAt: "12 Oct 2026",
    updatedAt: "12 Oct 2026",
    description:
      "Review a suspicious domain and document available threat intelligence, related indicators, and investigation findings.",
    evidenceCount: 1,
  },
  {
    id: "CASE-2026-003",
    title: "Web Application Security Review",
    category: "Vulnerability Assessment",
    priority: "Medium",
    status: "Under Review",
    assignee: "Security Engineer",
    createdAt: "10 Oct 2026",
    updatedAt: "12 Oct 2026",
    description:
      "Review reported web application security findings and record validation status, supporting evidence, and recommendations.",
    evidenceCount: 5,
  },
  {
    id: "CASE-2026-004",
    title: "External Service Exposure Review",
    category: "Penetration Testing",
    priority: "Medium",
    status: "Open",
    assignee: "Unassigned",
    createdAt: "09 Oct 2026",
    updatedAt: "10 Oct 2026",
    description:
      "Document an authorized security assessment of exposed services and organize the resulting findings.",
    evidenceCount: 2,
  },
  {
    id: "CASE-2026-005",
    title: "Malicious File Follow-up",
    category: "Malware Analysis",
    priority: "Low",
    status: "Closed",
    assignee: "Security Analyst",
    createdAt: "07 Oct 2026",
    updatedAt: "09 Oct 2026",
    description:
      "Record the investigation conclusion and reference the available malware analysis report.",
    evidenceCount: 2,
  },
];

const statusOptions: CaseStatus[] = [
  "Open",
  "In Progress",
  "Under Review",
  "Closed",
];

const priorityOptions: Priority[] = [
  "Critical",
  "High",
  "Medium",
  "Low",
];

const categoryOptions: CaseCategory[] = [
  "Malware Analysis",
  "Threat Investigation",
  "Vulnerability Assessment",
  "Penetration Testing",
  "Other",
];

function statusStyle(status: CaseStatus) {
  switch (status) {
    case "Open":
      return "border-cyan-500/20 bg-cyan-500/10 text-cyan-300";
    case "In Progress":
      return "border-blue-500/20 bg-blue-500/10 text-blue-300";
    case "Under Review":
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";
    case "Closed":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  }
}

function priorityStyle(priority: Priority) {
  switch (priority) {
    case "Critical":
      return "border-rose-500/20 bg-rose-500/10 text-rose-300";
    case "High":
      return "border-orange-500/20 bg-orange-500/10 text-orange-300";
    case "Medium":
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";
    case "Low":
      return "border-[#162630] bg-[#0b1720] text-slate-400";
  }
}

function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 border border-[#162630] bg-[#081118] transition-all">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#162630] px-6 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="border border-[#162630] bg-[#081118] p-6 transition hover:border-cyan-500/50 hover:bg-[#0b1720]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>
        <div className={`border border-[#1b3440] bg-[#0b1720] p-3 ${accent}`}>
          <Icon size={21} />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">{description}</p>
    </div>
  );
}

const inputClass =
  "w-full border border-[#162630] bg-[#0b1720] px-3 py-2.5 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-500";

interface CasesPageProps {
  setCurrentPage: (page: string) => void;
}

export default function CasesPage({ setCurrentPage }: CasesPageProps) {
  const [cases, setCases] = useState<CaseItem[]>(initialCases);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] =
    useState<CaseCategory>("Threat Investigation");
  const [newPriority, setNewPriority] = useState<Priority>("Medium");
  const [newAssignee, setNewAssignee] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const text =
        `${item.id} ${item.title} ${item.category} ${item.assignee}`.toLowerCase();

      return (
        text.includes(query.toLowerCase()) &&
        (statusFilter === "All Statuses" ||
          item.status === statusFilter) &&
        (priorityFilter === "All Priorities" ||
          item.priority === priorityFilter) &&
        (categoryFilter === "All Categories" ||
          item.category === categoryFilter)
      );
    });
  }, [cases, query, statusFilter, priorityFilter, categoryFilter]);

  const selectedCase =
    cases.find((item) => item.id === selectedCaseId) ?? null;

  const openCount = cases.filter((item) => item.status === "Open").length;
  const progressCount = cases.filter(
    (item) => item.status === "In Progress",
  ).length;
  const reviewCount = cases.filter(
    (item) => item.status === "Under Review",
  ).length;
  const closedCount = cases.filter(
    (item) => item.status === "Closed",
  ).length;

  function createCase(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTitle.trim()) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newCase: CaseItem = {
      id: `CASE-DEMO-${String(cases.length + 1).padStart(3, "0")}`,
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      status: "Open",
      assignee: newAssignee.trim() || "Unassigned",
      createdAt: today,
      updatedAt: today,
      description: newDescription.trim() || "No description provided.",
      evidenceCount: 0,
    };

    setCases((previous) => [newCase, ...previous]);
    setSelectedCaseId(newCase.id);
    setShowCreate(false);
    setNewTitle("");
    setNewCategory("Threat Investigation");
    setNewPriority("Medium");
    setNewAssignee("");
    setNewDescription("");
  }

  function updateCaseStatus(id: string, status: CaseStatus) {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setCases((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status, updatedAt: today } : item,
      ),
    );
  }

  function resetFilters() {
    setQuery("");
    setStatusFilter("All Statuses");
    setPriorityFilter("All Priorities");
    setCategoryFilter("All Categories");
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#050b10] text-slate-200">
      <div className="mx-auto max-w-7xl space-y-6 px-8 py-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-cyan-400">
              <FolderOpen size={15} />
              Case Management
            </div>
            <h1 className="text-2xl font-semibold tracking-wide text-white">
              Cases
            </h1>
            <p className="mt-1 text-xs text-slate-400 max-w-xl leading-relaxed">
              Create and organize security investigation cases, track their
              status, and reference related findings and evidence.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center justify-center gap-2 bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#041522] transition hover:bg-cyan-400"
          >
            <Plus size={16} />
            Create Case
          </button>
        </header>

        {/* Metrics */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Cases"
            value={cases.length}
            description="All cases in the current demo dataset"
            icon={FolderOpen}
            accent="text-cyan-400"
          />
          <MetricCard
            title="Open"
            value={openCount}
            description="Cases awaiting investigation"
            icon={CircleDot}
            accent="text-sky-400"
          />
          <MetricCard
            title="In Progress"
            value={progressCount}
            description="Cases marked as being investigated"
            icon={Activity}
            accent="text-blue-400"
          />
          <MetricCard
            title="Under Review"
            value={reviewCount}
            description={`${closedCount} closed cases`}
            icon={ClipboardList}
            accent="text-amber-400"
          />
        </div>

        {/* Cases table */}
        <Panel
          title="Case Register"
          subtitle="Browse, filter, and open investigation records"
          action={
            <span className="border border-[#162630] bg-[#0b1720] px-2.5 py-1 text-[11px] text-slate-400">
              {filteredCases.length} records
            </span>
          }
        >
          <div className="mb-5 space-y-3">
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search case ID, title, category, or assignee..."
                className={`${inputClass} pl-9`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Filter size={14} />
                Filters
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`${inputClass} w-auto min-w-[145px]`}
              >
                <option>All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className={`${inputClass} w-auto min-w-[145px]`}
              >
                <option>All Priorities</option>
                {priorityOptions.map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`${inputClass} w-auto min-w-[190px]`}
              >
                <option>All Categories</option>
                {categoryOptions.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="border border-[#162630] bg-[#0b1720] px-3 py-2 text-xs text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
              >
                Reset filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-xs">
              <thead>
                <tr className="border-b border-[#162630] text-[11px] text-slate-500 uppercase tracking-wider">
                  <th className="px-3 py-3 font-medium">Case</th>
                  <th className="px-3 py-3 font-medium">Category</th>
                  <th className="px-3 py-3 font-medium">Priority</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Assignee</th>
                  <th className="px-3 py-3 font-medium">Created</th>
                  <th className="px-3 py-3 font-medium">Updated</th>
                  <th className="px-3 py-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCases.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#162630]/70 transition hover:bg-white/[0.02]"
                  >
                    <td className="px-3 py-3.5">
                      <button
                        onClick={() => setSelectedCaseId(item.id)}
                        className="text-left"
                      >
                        <p className="font-medium text-slate-200 transition hover:text-cyan-400">
                          {item.title}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                          {item.id}
                        </p>
                      </button>
                    </td>

                    <td className="px-3 py-3.5 text-xs text-slate-400">
                      {item.category}
                    </td>

                    <td className="px-3 py-3.5">
                      <span
                        className={`border px-2 py-0.5 text-[11px] ${priorityStyle(item.priority)}`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="px-3 py-3.5">
                      <span
                        className={`whitespace-nowrap border px-2.5 py-1 text-[11px] ${statusStyle(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-3 py-3.5">
                      <span className="flex items-center gap-2 text-xs text-slate-400">
                        <UserRound size={14} />
                        {item.assignee}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3.5 text-xs text-slate-500">
                      {item.createdAt}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3.5 text-xs text-slate-500">
                      {item.updatedAt}
                    </td>

                    <td className="px-3 py-3.5">
                      <button
                        onClick={() => setSelectedCaseId(item.id)}
                        className="inline-flex items-center gap-1.5 border border-[#162630] bg-[#0b1720] px-2.5 py-1 text-xs text-slate-300 transition hover:border-cyan-500/50 hover:text-cyan-400"
                      >
                        View
                        <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCases.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-3 py-12 text-center text-xs text-slate-500"
                    >
                      No cases match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-[#162630] pt-4 text-xs text-slate-500">
            <span>
              Showing {filteredCases.length} of {cases.length} cases
            </span>
            <span>Demo records · Not connected to a backend</span>
          </div>
        </Panel>

        {/* Create Case Modal */}
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
            <div className="my-auto w-full max-w-2xl border border-[#162630] bg-[#081118] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#162630] px-6 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">Create New Case</h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Add a security investigation record
                  </p>
                </div>
                <button
                  onClick={() => setShowCreate(false)}
                  className="border border-[#162630] bg-[#0b1720] p-2 text-slate-400 hover:text-white"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={createCase} className="space-y-4 p-6">
                <div>
                  <label className="mb-2 block text-xs text-slate-400">
                    Case Title *
                  </label>
                  <input
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Suspicious file investigation"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs text-slate-400">
                      Category *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) =>
                        setNewCategory(e.target.value as CaseCategory)
                      }
                      className={inputClass}
                    >
                      {categoryOptions.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-slate-400">
                      Priority *
                    </label>
                    <select
                      value={newPriority}
                      onChange={(e) =>
                        setNewPriority(e.target.value as Priority)
                      }
                      className={inputClass}
                    >
                      {priorityOptions.map((priority) => (
                        <option key={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-400">
                    Assignee
                  </label>
                  <input
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    placeholder="Name or leave unassigned"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-400">
                    Description
                  </label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe the investigation objective, context, and known findings..."
                    rows={4}
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div className="flex justify-end gap-3 border-t border-[#162630] pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="border border-[#162630] bg-[#0b1720] px-4 py-2 text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#041522] hover:bg-cyan-400"
                  >
                    <Plus size={15} />
                    Create Case
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Case Detail Drawer */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <button
              aria-label="Close case details"
              className="absolute inset-0 cursor-default"
              onClick={() => setSelectedCaseId(null)}
            />

            <aside className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-[#162630] bg-[#081118] shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#162630] bg-[#081118] px-6 py-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <FileSearch size={16} className="text-cyan-400" />
                  Case Details
                </div>
                <button
                  onClick={() => setSelectedCaseId(null)}
                  className="border border-[#162630] bg-[#0b1720] p-2 text-slate-400 hover:text-white"
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-6 p-6">
                <div>
                  <p className="font-mono text-xs text-cyan-400">
                    {selectedCase.id}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-snug text-white">
                    {selectedCase.title}
                  </h2>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">
                    {selectedCase.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`border px-3 py-1 text-xs ${statusStyle(selectedCase.status)}`}
                  >
                    {selectedCase.status}
                  </span>
                  <span
                    className={`border px-3 py-1 text-xs ${priorityStyle(selectedCase.priority)}`}
                  >
                    {selectedCase.priority} Priority
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Category", selectedCase.category],
                    ["Assignee", selectedCase.assignee],
                    ["Created", selectedCase.createdAt],
                    ["Last Updated", selectedCase.updatedAt],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="border border-[#162630] bg-[#0b1720] p-3.5"
                    >
                      <p className="text-[11px] text-slate-500">{label}</p>
                      <p className="mt-1 text-xs text-slate-200">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="border border-[#162630] bg-[#0b1720] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <Paperclip size={15} className="text-cyan-400" />
                      Related Evidence
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {selectedCase.evidenceCount}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Evidence count is sample metadata only. Evidence attachments and management are not connected yet.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Update Case Status
                  </label>
                  <select
                    value={selectedCase.status}
                    onChange={(e) =>
                      updateCaseStatus(
                        selectedCase.id,
                        e.target.value as CaseStatus,
                      )
                    }
                    className={inputClass}
                  >
                    {statusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Changes apply to the current prototype session only.
                  </p>
                </div>

                <div className="border border-[#162630] bg-[#0b1720] p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Clock3 size={15} className="text-cyan-400" />
                    Case Activity
                  </div>
                  <div className="mt-4 flex gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 bg-cyan-400" />
                    <div>
                      <p className="text-xs text-slate-300">
                        Case record created
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {selectedCase.createdAt}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    A complete activity timeline requires backend event recording. This prototype does not yet store a full history of changes.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#162630] pt-4 text-xs text-slate-600">
          <span>Oxygen · Case Management</span>
          <span>Prototype UI · Backend integration pending</span>
        </footer>
      </div>
    </main>
  );
}