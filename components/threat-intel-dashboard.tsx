"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Database,
  ExternalLink,
  Globe,
  Hash,
  Layers3,
  Network,
  RefreshCw,
  Rss,
  Search,
  ShieldAlert,
  ShieldCheck,
  Wifi,
} from "lucide-react";

type IOCType = "IP Address" | "Domain" | "URL" | "File Hash";
type IOC = {
  id: number;
  indicator: string;
  type: IOCType;
  source: string;
  confidence: number;
  severity: "High" | "Medium" | "Low";
  date: string;
};

const initialIOCs: IOC[] = [
  {
    id: 1,
    indicator: "185.199.110.42",
    type: "IP Address",
    source: "Manual Import",
    confidence: 92,
    severity: "High",
    date: "12 Oct 2026, 09:42",
  },
  {
    id: 2,
    indicator: "update-check.example.com",
    type: "Domain",
    source: "Threat Feed A",
    confidence: 85,
    severity: "High",
    date: "12 Oct 2026, 09:18",
  },
  {
    id: 3,
    indicator: "a91f7d2c...8e31",
    type: "File Hash",
    source: "Malware Analysis",
    confidence: 88,
    severity: "High",
    date: "12 Oct 2026, 08:56",
  },
  {
    id: 4,
    indicator: "https://example.org/payload",
    type: "URL",
    source: "Threat Feed B",
    confidence: 72,
    severity: "Medium",
    date: "11 Oct 2026, 16:24",
  },
  {
    id: 5,
    indicator: "192.0.2.45",
    type: "IP Address",
    source: "Manual Import",
    confidence: 61,
    severity: "Medium",
    date: "11 Oct 2026, 14:10",
  },
];

const activities = [
  {
    title: "New IOC added",
    detail: "IP Address · Manual Import",
    time: "09:42",
    icon: ShieldAlert,
    color: "text-amber-300",
  },
  {
    title: "Indicator imported",
    detail: "Domain · Threat Feed A",
    time: "09:18",
    icon: Database,
    color: "text-cyan-300",
  },
  {
    title: "Analysis finding recorded",
    detail: "File Hash · Malware Analysis",
    time: "08:56",
    icon: Layers3,
    color: "text-violet-300",
  },
  {
    title: "Feed synchronization completed",
    detail: "Threat Feed B · Import successful",
    time: "Yesterday",
    icon: CheckCircle2,
    color: "text-emerald-300",
  },
];

const distribution = [
  { label: "IP Address", count: 42, color: "bg-cyan-400", icon: Network },
  { label: "Domain", count: 28, color: "bg-violet-400", icon: Globe },
  { label: "URL", count: 18, color: "bg-amber-400", icon: ExternalLink },
  { label: "File Hash", count: 12, color: "bg-emerald-400", icon: Hash },
];

const feeds = [
  {
    name: "Threat Feed A",
    provider: "External IOC Source",
    status: "Connected",
    lastSync: "12 Oct, 09:18",
    count: "124",
  },
  {
    name: "Threat Feed B",
    provider: "External IOC Source",
    status: "Connected",
    lastSync: "11 Oct, 16:24",
    count: "86",
  },
  {
    name: "Manual Import",
    provider: "Local Indicator Import",
    status: "Available",
    lastSync: "12 Oct, 09:42",
    count: "32",
  },
];

const filters = ["All", "IP Address", "Domain", "URL", "File Hash"];

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
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  trend?: string;
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
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        {trend && (
          <span className="flex items-center gap-1 text-cyan-400">
            <ArrowUpRight size={13} />
            {trend}
          </span>
        )}
        <span className="text-slate-500">{description}</span>
      </div>
    </div>
  );
}

interface ThreatIntelDashboardProps {
  setCurrentPage: (page: string) => void;
}

export default function ThreatIntelDashboard({ setCurrentPage }: ThreatIntelDashboardProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [lastRefresh, setLastRefresh] = useState("Just now");
  const [showAllFeeds, setShowAllFeeds] = useState(false);

  const filteredIOCs = useMemo(() => {
    return initialIOCs.filter((ioc) => {
      const matchesType =
        activeFilter === "All" || ioc.type === activeFilter;

      const searchText =
        `${ioc.indicator} ${ioc.type} ${ioc.source} ${ioc.severity}`.toLowerCase();

      return matchesType && searchText.includes(query.toLowerCase());
    });
  }, [activeFilter, query]);

  function refreshDemo() {
    setLastRefresh("Just now");
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#050b10] text-slate-200">
      <div className="mx-auto max-w-7xl space-y-6 px-8 py-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-cyan-400">
              <ShieldCheck size={15} />
              Threat Intelligence
            </div>
            <h1 className="text-2xl font-semibold tracking-wide text-white">
              Threat Dashboard
            </h1>
            <p className="mt-1 text-xs text-slate-400 max-w-xl leading-relaxed">
              Overview of threat indicators, registered feeds, and recorded intelligence activity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* <span className="inline-flex items-center gap-2 border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Demo data
            </span> */}
            <button
              onClick={refreshDemo}
              className="inline-flex items-center gap-2 border border-[#162630] bg-[#081118] px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-500/50 hover:text-cyan-400"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            <button
              onClick={() => window.location.assign("../ioc-management")}
              className="inline-flex items-center gap-2 bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#041522] transition hover:bg-cyan-400"
            >
              <ShieldAlert size={14} />
              IOC Management
            </button>
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 border border-amber-500/20 bg-amber-500/[0.04] px-4 py-3">
          {/* <div className="flex items-start gap-3">
            <AlertTriangle
              size={17}
              className="mt-0.5 shrink-0 text-amber-300"
            />
            <p className="text-xs leading-relaxed text-slate-400">
              Demonstration data only. Indicators, feed statuses, and activity records are illustrative and are not verified live threat intelligence.
            </p>
          </div> */}
          <span className="shrink-0 text-xs text-slate-500">
            Last refresh: {lastRefresh}
          </span>
        </div>

        {/* Metrics */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Threat Indicators"
            value="258"
            description="Total indicators in demo dataset"
            icon={Database}
            accent="text-cyan-400"
          />
          <MetricCard
            title="High Severity"
            value="34"
            description="Indicators labelled high"
            icon={ShieldAlert}
            accent="text-rose-400"
          />
          <MetricCard
            title="Registered Feeds"
            value="3"
            description="Illustrative configured sources"
            icon={Rss}
            accent="text-violet-400"
          />
          <MetricCard
            title="Recorded Activities"
            value="47"
            description="Illustrative activity records"
            icon={Activity}
            accent="text-emerald-400"
          />
        </div>

        {/* Distribution + Feed status */}
        <div className="grid gap-6 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <Panel
              title="Indicator Distribution"
              subtitle="Breakdown by indicator type in the demo dataset"
              action={
                <span className="border border-[#162630] bg-[#0b1720] px-2 py-1 text-[11px] text-slate-400">
                  By type
                </span>
              }
            >
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-semibold text-white">100</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Sample indicators
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  Distribution
                  <p className="mt-1 text-sm text-slate-300">100%</p>
                </div>
              </div>

              <div className="mb-6 flex h-2 overflow-hidden bg-[#0b1720] border border-[#162630]">
                {distribution.map((item) => (
                  <div
                    key={item.label}
                    className={item.color}
                    style={{ width: `${item.count}%` }}
                  />
                ))}
              </div>

              <div className="space-y-5">
                {distribution.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <Icon size={14} className="text-slate-400" />
                          {item.label}
                        </div>
                        <span className="text-xs font-medium text-slate-200">
                          {item.count}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden bg-[#0b1720] border border-[#162630]">
                        <div
                          className={`h-full ${item.color}`}
                          style={{ width: `${item.count}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          <div className="xl:col-span-3">
            <Panel
              title="Threat Feed Status"
              subtitle="Registered sources and their illustrative import status"
              action={
                <button
                  onClick={() => setShowAllFeeds((v) => !v)}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                >
                  {showAllFeeds ? "Show less" : "View feeds"}
                  <ExternalLink size={13} />
                </button>
              }
            >
              <div className="space-y-3">
                {feeds.slice(0, showAllFeeds ? feeds.length : 2).map((feed) => (
                  <div
                    key={feed.name}
                    className="border border-[#162630] bg-[#0b1720] p-4"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="flex items-start gap-3">
                        <div className="border border-[#1b3440] bg-[#050b10] p-2.5 text-cyan-400">
                          <Rss size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white">
                            {feed.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {feed.provider}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex w-fit items-center gap-2 border px-2.5 py-1 text-xs ${
                          feed.status === "Connected"
                            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
                            : "border-cyan-500/20 bg-cyan-500/5 text-cyan-300"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 bg-current" />
                        {feed.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#162630] pt-3 sm:grid-cols-3">
                      <div>
                        <p className="text-[11px] text-slate-500">Indicators</p>
                        <p className="mt-1 text-xs text-slate-200">
                          {feed.count}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500">Last import</p>
                        <p className="mt-1 text-xs text-slate-200">
                          {feed.lastSync}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-[11px] text-slate-500">Source type</p>
                        <p className="mt-1 text-xs text-slate-200">IOC Feed</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Feed connectivity and synchronization require actual source configuration and backend verification.
              </p>
            </Panel>
          </div>
        </div>

        {/* Recent IOCs */}
        <Panel
          title="Recent Indicators"
          subtitle="Latest indicators recorded in the illustrative dataset"
          action={
            <button
              onClick={() => window.location.assign("../ioc-management")}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
            >
              Open IOC Management
              <ExternalLink size={13} />
            </button>
          }
        >
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search indicator, type, source..."
                className="w-full border border-[#162630] bg-[#0b1720] py-2 pl-9 pr-3 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-3 py-1.5 text-xs transition ${
                    activeFilter === filter
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                      : "border-[#162630] bg-[#0b1720] text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-xs">
              <thead>
                <tr className="border-b border-[#162630] text-[11px] text-slate-500 uppercase tracking-wider">
                  <th className="px-3 py-3 font-medium">Indicator</th>
                  <th className="px-3 py-3 font-medium">Type</th>
                  <th className="px-3 py-3 font-medium">Source</th>
                  <th className="px-3 py-3 font-medium">Confidence</th>
                  <th className="px-3 py-3 font-medium">Severity</th>
                  <th className="px-3 py-3 font-medium">Recorded</th>
                </tr>
              </thead>
              <tbody>
                {filteredIOCs.map((ioc) => (
                  <tr
                    key={ioc.id}
                    className="border-b border-[#162630]/70 transition hover:bg-white/[0.02]"
                  >
                    <td className="px-3 py-3.5">
                      <span className="font-mono text-xs text-cyan-400">
                        {ioc.indicator}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-slate-300">{ioc.type}</td>
                    <td className="px-3 py-3.5 text-slate-400">{ioc.source}</td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden bg-[#0b1720] border border-[#162630]">
                          <div
                            className="h-full bg-cyan-400"
                            style={{ width: `${ioc.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-300">
                          {ioc.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={`border px-2 py-0.5 text-[11px] ${
                          ioc.severity === "High"
                            ? "border-rose-500/20 bg-rose-500/5 text-rose-300"
                            : ioc.severity === "Medium"
                            ? "border-amber-500/20 bg-amber-500/5 text-amber-300"
                            : "border-[#162630] text-slate-400"
                        }`}
                      >
                        {ioc.severity}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-xs text-slate-500">
                      {ioc.date}
                    </td>
                  </tr>
                ))}
                {filteredIOCs.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-10 text-center text-xs text-slate-500"
                    >
                      No indicators match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Showing {filteredIOCs.length} of {initialIOCs.length} sample indicators
            </span>
            <span>Demo dataset · Not live threat intelligence</span>
          </div>
        </Panel>

        {/* Recent activity */}
        <div className="grid gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <Panel
              title="Recent Threat Activity"
              subtitle="Illustrative record of platform activity"
              action={
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 size={13} />
                  Recent
                </span>
              }
            >
              <div className="space-y-0">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.title}
                      className={`flex items-start gap-3 py-3.5 ${
                        index !== activities.length - 1
                          ? "border-b border-[#162630]"
                          : ""
                      }`}
                    >
                      <div className="border border-[#162630] bg-[#0b1720] p-2.5">
                        <Icon size={16} className={activity.color} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-200">
                          {activity.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {activity.detail}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-slate-500">
                        {activity.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          <div className="xl:col-span-2">
            <Panel
              title="Intelligence Overview"
              subtitle="Summary of recorded indicator classifications"
              action={
                <Activity size={16} className="text-cyan-400" />
              }
            >
              <div className="space-y-4">
                <div className="border border-[#162630] bg-[#0b1720] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <ShieldAlert size={16} className="text-rose-400" />
                      High severity
                    </div>
                    <span className="text-lg font-semibold text-white">34</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Illustrative count based on sample classification labels.
                  </p>
                </div>

                <div className="border border-[#162630] bg-[#0b1720] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Wifi size={16} className="text-cyan-400" />
                      Source availability
                    </div>
                    <span className="text-lg font-semibold text-white">3</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Registered example sources, not verified connections.
                  </p>
                </div>

                <button
                  onClick={() => window.location.assign("../threat-feeds")}
                  className="flex w-full items-center justify-between border border-[#162630] bg-[#0b1720] px-4 py-2.5 text-xs text-slate-300 transition hover:border-cyan-500/50 hover:text-cyan-400"
                >
                  Manage Threat Feeds
                  <ExternalLink size={14} />
                </button>
              </div>
            </Panel>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#162630] pt-4 text-xs text-slate-600">
          <span>Danawa Cyber Lab · Threat Intelligence</span>
          <span>Prototype UI · Backend integration pending</span>
        </footer>
      </div>
    </main>
  );
}