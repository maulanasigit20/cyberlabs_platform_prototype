'use client'

import { Settings, Home, Database, Globe, Wifi, Clock, AlertCircle, Eye, Grid, CheckSquare, FileText, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

interface SecondSidebarProps {
  currentModule: string
  setCurrentModule: (module: string) => void

  sidebarCollapsed: boolean
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SecondSidebar({
  currentModule,
  setCurrentModule,
  sidebarCollapsed,
  setSidebarCollapsed,
}: SecondSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assets', label: 'Assets', icon: Database },
    { id: 'web-scanning', label: 'Web Scanning', icon: Globe },
    { id: 'network-scanning', label: 'Network Scanning', icon: Wifi },
    { id: 'api-scanning', label: 'API Scanning', icon: Zap },
    { id: 'scan-history', label: 'Scan History', icon: Clock },
    { id: 'findings', label: 'Findings', icon: AlertCircle },
    { id: 'risk-overview', label: 'Risk Overview', icon: Eye },
    { id: 'raci-matrix', label: 'RACI Matrix', icon: Grid },
    { id: 'compliance', label: 'Compliance', icon: CheckSquare },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="w-56 py-6 bg-[#12181e] border-slate-800 flex flex-col overflow-y-auto">
      {/* Header */}
      
      <div className="p-4 border-b border-slate-800">

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
        >

          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <ChevronLeft className="w-5 h-5 flex-shrink-0" />
          )}

          <span className="text-xs font-semibold">
            Vulnerability Assessment
          </span>

        </button>

      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentModule === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentModule(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Shortcuts Section */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shortcuts</div>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 border border-dashed border-slate-700">
          <span className="text-lg">+</span>
          <span>New Scan</span>
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800">
          <Eye className="w-4 h-4" />
          <span>View All Findings</span>
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800">
          <Database className="w-4 h-4" />
          <span>Manage Assets</span>
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800">
          <FileText className="w-4 h-4" />
          <span>Compliance Report</span>
        </button>
      </div>
    </div>
  )
}
