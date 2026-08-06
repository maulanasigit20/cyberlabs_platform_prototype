'use client'

import { Bell, Calendar, Grid3x3, Search, Settings, User } from 'lucide-react'
import MetricCard from './metric-card'
import FindingsByCategory from './charts/findings-by-category'
import FindingsBySeverity from './charts/findings-by-severity'
import RecentActivities from './recent-activities'
import AssessmentModules from './assessment-modules'

interface ExecutiveDashboardProps {
  setCurrentPage: (page: string) => void
}

export default function ExecutiveDashboard({
  setCurrentPage,
}: ExecutiveDashboardProps) {
  return (
    <div className="flex-1 overflow-auto bg-[#12181e]">
      {/* Header */}
      <header className="bg-[#12181e] border-b border-slate-800 px-8 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Executive Dashboard</h1>
          <p className="text-sm text-slate-400">Cyber Lab Overview</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets, cases, findings, reports..."
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-xs">/</span>
          </div>
          <button className="relative p-2 hover:bg-slate-800 rounded">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="relative p-2 hover:bg-slate-800 rounded">
            <Calendar className="w-5 h-5 text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <Grid3x3 className="w-5 h-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div className="text-sm">
              <div className="text-white font-semibold">Admin</div>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-6">
          <MetricCard
            title="Total Assessments"
            value="58"
            change="+15%"
            subtitle="vs last month"
            icon="📋"
            color="bg-blue-600"
          />
          <MetricCard
            title="Active Cases"
            value="13"
            change="+8%"
            subtitle="vs last month"
            icon="🔐"
            color="bg-purple-600"
          />
          <MetricCard
            title="Critical Findings"
            value="18"
            change="+12%"
            subtitle="vs last month"
            icon="⚠️"
            color="bg-red-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <MetricCard
            title="Risk Score"
            value="78"
            maxValue="/100"
            subtitle="High Risk"
            icon="🛡️"
            color="bg-orange-600"
            layout="vertical"
          />
          <MetricCard
            title="Assets Monitored"
            value="1,248"
            change="+3%"
            subtitle="vs last month"
            icon="📊"
            color="bg-teal-600"
            layout="vertical"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Findings by Category</h2>
            </div>
            <FindingsByCategory />
          </div>
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Findings by Severity</h2>
            </div>
            <FindingsBySeverity />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Activities</h2>
            <button className="text-blue-500 hover:text-blue-400 text-sm font-semibold">
              View All
            </button>
          </div>
          <RecentActivities />
        </div>

        {/* Assessment Modules */}
        <AssessmentModules setCurrentPage={setCurrentPage}/>

        {/* Tabs at bottom */}
        {/* <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded text-blue-400 font-semibold">
              <span>1</span>
              <span>EXECUTIVE DASHBOARD</span>
              <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">RegAscan AZURE Cyber Lab</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded text-slate-400">
              <span>VA Dashboard</span>
              <span className="text-xs">May 2 - Mar 31, 2025</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded text-slate-400">
              <span>Perfect Dashboard</span>
              <span className="text-xs">May 2 - Mar 31, 2025</span>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  )
}
