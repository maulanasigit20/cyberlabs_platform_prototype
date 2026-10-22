'use client'

import {
  Activity,
  AlertTriangle,
  Bug,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Database,
  FileCheck2,
  FileSearch,
  FolderLock,
  Globe,
  Search,
  ShieldAlert,
  Target,
  Zap,
} from 'lucide-react'
import FindingsByCategory from './charts/findings-by-category'
import FindingsBySeverity from './charts/findings-by-severity'

interface ExecutiveDashboardProps {
  setCurrentPage: (page: string) => void
}

export default function ExecutiveDashboard({
  setCurrentPage,
}: ExecutiveDashboardProps) {
  // Stat Utama Gabungan
  const stats = [
    {
      label: 'Global Risk Score',
      value: '78 / 100',
      sublabel: 'High Risk Status',
      icon: ShieldAlert,
      color: 'text-amber-400',
    },
    {
      label: 'Assets Monitored (VA)',
      value: '248',
      sublabel: '18 Critical Vulns',
      icon: Globe,
      color: 'text-blue-400',
    },
    {
      label: 'Validated Exploits (PT)',
      value: '6',
      sublabel: 'From 18 Attempts',
      icon: Target,
      color: 'text-cyan-400',
    },
    {
      label: 'Malware Samples (MA)',
      value: '23',
      sublabel: '9 Critical Samples',
      icon: Bug,
      color: 'text-red-400',
    },
  ]

  // Correlated Threat Overview (Sinergi 3 Tools)
  const correlatedThreats = [
    {
      asset: 'api-gateway.example.com',
      vaResult: 'Broken Authentication',
      pentestResult: 'Exploit Validated (JWT Bypass)',
      malwareResult: 'Suspicious Loader Detected',
      overallRisk: 'CRITICAL',
    },
    {
      asset: 'db.example-domain.com',
      vaResult: 'Open DB Port (3306)',
      pentestResult: 'Port Scan & Auth Attempt',
      malwareResult: 'No Malware Sample',
      overallRisk: 'HIGH',
    },
    {
      asset: 'mail.example-domain.com',
      vaResult: 'Outdated TLS Config',
      pentestResult: 'Simulated SSL Exploit',
      malwareResult: 'No Malware Sample',
      overallRisk: 'MEDIUM',
    },
  ]

  return (
    <main className="flex-1 overflow-y-auto bg-[#050b10] text-slate-200">
      {/* ========================================================
          HEADER
      ======================================================== */}
      <header className="px-6 pt-6 pb-4 border-b border-[#162630]">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <div className="flex flex-col min-w-0">
                {/* Container teks dengan huruf X yang lebih besar di tengah */}
                <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-500">
                  <span>I</span>
                  <span>N</span>
                  {/* Huruf X dibuat lebih besar, mencolok, dan diberi efek gradient/warna terang */}
                  <span className="text-[12px] text-cyan-200 mx-0.5 font-extrabold drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                    X
                  </span>
                  <span>PECTOR</span>
                </div>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-white">
              Executive Dashboard
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Integrated Overview of Vulnerability Assessment, Pentest, and Malware Analysis
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 border border-[#162630] bg-[#081118]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] text-slate-400">All Engines</span>
              <span className="text-[10px] font-medium text-green-400">
                Operational
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          CONTENT
      ======================================================== */}
      <div className="p-6 space-y-5">
        
        {/* ======================================================
            GLOBAL STATS
        ====================================================== */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="border border-[#162630] bg-[#081118] px-4 py-4 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
                      {stat.label}
                    </div>
                    <div className={`mt-2 text-2xl font-semibold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] text-slate-500">
                      {stat.sublabel}
                    </div>
                  </div>

                  <div className="p-2 border border-[#1b3440] bg-[#0b1720]">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan-500/20" />
              </div>
            )
          })}
        </div>

        {/* ======================================================
            3-PILLAR QUICK MODULE STATUS CARDS
        ====================================================== */}
        <div className="grid grid-cols-3 gap-5">
          {/* Pillar 1: VA */}
          <div
            onClick={() => setCurrentPage('vulnerability-assessment')}
            className="border border-[#162630] bg-[#081118] p-4 hover:border-cyan-500/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Vulnerability Assessment
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 bg-[#0b1720] p-2.5 border border-[#101d25]">
              <div>
                <span className="block text-slate-600">Total Scans</span>
                <span className="text-slate-200 font-semibold">36 Active</span>
              </div>
              <div>
                <span className="block text-slate-600">Top Severity</span>
                <span className="text-red-400 font-semibold">18 Critical</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Pentest */}
          <div
            onClick={() => setCurrentPage('penetration-testing')}
            className="border border-[#162630] bg-[#081118] p-4 hover:border-cyan-500/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Pentest Automation
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 bg-[#0b1720] p-2.5 border border-[#101d25]">
              <div>
                <span className="block text-slate-600">Active Jobs</span>
                <span className="text-slate-200 font-semibold">4 Running</span>
              </div>
              <div>
                <span className="block text-slate-600">Validation Rate</span>
                <span className="text-cyan-400 font-semibold">33.3% Validated</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Malware */}
          <div
            onClick={() => setCurrentPage('malware-analysis')}
            className="border border-[#162630] bg-[#081118] p-4 hover:border-cyan-500/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4 text-red-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Malware Analysis
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 bg-[#0b1720] p-2.5 border border-[#101d25]">
              <div>
                <span className="block text-slate-600">Analyses Today</span>
                <span className="text-slate-200 font-semibold">248 Samples</span>
              </div>
              <div>
                <span className="block text-slate-600">IOCs Extracted</span>
                <span className="text-red-400 font-semibold">1,842 IOCs</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            CORRELATED THREAT MATRIX (GABUNGAN DATA 3 TOOLS)
        ====================================================== */}
        <div className="border border-[#162630] bg-[#081118] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-medium text-slate-200">
                Correlated Threat Matrix
              </div>
              <div className="mt-0.5 text-[10px] text-slate-600">
                Cross-tool insights linking VA detections, automated exploits, and malware samples
              </div>
            </div>
            <span className="text-[10px] text-cyan-400 font-semibold">
              Multi-Pillar Correlation
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#162630] text-[9px] uppercase tracking-wider text-slate-600 font-medium">
                  <th className="py-2.5 px-3">Target Asset</th>
                  <th className="py-2.5 px-3">VA Finding</th>
                  <th className="py-2.5 px-3">Pentest Validation</th>
                  <th className="py-2.5 px-3">Malware Correlation</th>
                  <th className="py-2.5 px-3">Overall Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#101d25]">
                {correlatedThreats.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#0b1720] transition-colors">
                    <td className="py-2.5 px-3 text-slate-300 text-[10px] font-mono">
                      {item.asset}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[10px]">
                      {item.vaResult}
                    </td>
                    <td className="py-2.5 px-3 text-cyan-400 text-[10px]">
                      {item.pentestResult}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 text-[10px]">
                      {item.malwareResult}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[9px] px-2 py-0.5 border font-semibold ${
                          item.overallRisk === 'CRITICAL'
                            ? 'text-red-400 border-red-500/30 bg-red-500/5'
                            : item.overallRisk === 'HIGH'
                            ? 'text-orange-400 border-orange-500/30 bg-orange-500/5'
                            : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5'
                        }`}
                      >
                        {item.overallRisk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ======================================================
            CHARTS ROW
        ====================================================== */}
        <div className="grid grid-cols-2 gap-5">
          <div className="border border-[#162630] bg-[#081118] p-5">
            <div className="text-xs font-medium text-slate-200 mb-1">
              Findings by Category
            </div>
            <div className="mt-0.5 text-[10px] text-slate-600 mb-4">
              Classification of security issues across all assessment engines
            </div>
            <FindingsByCategory />
          </div>

          <div className="border border-[#162630] bg-[#081118] p-5">
            <div className="text-xs font-medium text-slate-200 mb-1">
              Findings by Severity
            </div>
            <div className="mt-0.5 text-[10px] text-slate-600 mb-4">
              Global threat impact across VA, Pentest, and Malware Analysis
            </div>
            <FindingsBySeverity />
          </div>
        </div>
      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#162630] pt-4 text-xs text-slate-600">
        <span>Oxygen · Executive Dashboard</span>
        <span>Prototype UI · Backend integration pending</span>
      </footer>
      </div>
    </main>
  )
}