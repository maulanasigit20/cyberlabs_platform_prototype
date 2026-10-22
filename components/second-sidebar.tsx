'use client'

import {
  Settings,
  Home,
  Database,
  Globe,
  Wifi,
  Clock,
  AlertCircle,
  Eye,
  Grid,
  CheckSquare,
  FileText,
  Zap,
  ChevronLeft,
  ChevronRight,
  Plus,
  Target,
  Play,
  Workflow,
  History,
  Bug,
  FileSearch,
  ShieldCheck,
} from 'lucide-react'

interface SecondSidebarProps {
  currentPage: string
  currentModule: string
  setCurrentModule: (module: string) => void

  sidebarCollapsed: boolean
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SecondSidebar({
  currentPage,
  currentModule,
  setCurrentModule,
  sidebarCollapsed,
  setSidebarCollapsed,
}: SecondSidebarProps) {
  const vaMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      id: 'assets',
      label: 'Assets',
      icon: Database,
    },
    {
      id: 'web-scanning',
      label: 'Web Scanning',
      icon: Globe,
    },
    {
      id: 'scan-history',
      label: 'Scan History',
      icon: Clock,
    },
    {
      id: 'findings',
      label: 'Findings',
      icon: AlertCircle,
    },
    {
      id: 'raci-matrix',
      label: 'RACI Matrix',
      icon: Grid,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ]

    const malwareMenuItems = [
    {
      id: 'malware-dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      id: 'malware-new-analysis',
      label: 'New Analysis',
      icon: Plus,
    },
    {
      id: 'malware-history',
      label: 'Analysis History',
      icon: Clock,
    },
    {
      id: 'malware-samples',
      label: 'Sample Repository',
      icon: Database,
    },
    {
      id: 'malware-findings',
      label: 'Findings & IOCs',
      icon: AlertCircle,
    },
    {
      id: 'malware-reports',
      label: 'Reports',
      icon: FileText,
    },
  ]

  
const pentestMenuItems = [
  { id: 'pentest-dashboard', label: 'Dashboard', icon: Home },
  { id: 'pentest-targets', label: 'Targets & Scope', icon: Target },
  { id: 'pentest-new-assessment', label: 'New Assessment', icon: Play },
  { id: 'pentest-automation-jobs', label: 'Automation Jobs', icon: Workflow },
  { id: 'pentest-findings', label: 'Findings', icon: Bug },
  { id: 'pentest-reports', label: 'Reports', icon: FileText },
  { id: 'pentest-settings', label: 'Settings', icon: Settings },
]

const menuItems =
  currentPage === 'malware-analysis'
    ? malwareMenuItems
    : currentPage === 'penetration-testing'
      ? pentestMenuItems
      : vaMenuItems

  return (
    <aside
  className="
    w-56
    h-full
    bg-[#081118]
    border-r border-[#162630]
    flex
    flex-col
    overflow-hidden
    shrink-0
  "
>

      {/* ========================================================
          HEADER / OXY VA
      ======================================================== */}
      <div className="p-4 border-b border-[#162630]">

          <div className="flex items-center gap-3">

            {/* Toggle Main Sidebar */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="
                p-1.5
                
                text-slate-500
                hover:text-cyan-400
                hover:bg-[#0d1a22]
                transition-colors
                shrink-0
              "
              title={
                sidebarCollapsed
                  ? 'Show main sidebar'
                  : 'Hide main sidebar'
              }
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* OXY VA Logo */}
            <img
              src="/logo-oxygen.png"
              alt="OXY VA"
              className="w-9 h-9 object-contain shrink-0"
            />

            {/* OXY VA Title */}
            <div className="flex flex-col min-w-0">

              <div className="text-[18px] font-bold tracking-wide">
                  <span>I</span>
                  <span>N</span>
                  {/* Huruf X dibuat lebih besar, mencolok, dan diberi efek gradient/warna terang */}
                  <span className="text-[18px] text-cyan-200 mx-0.5 font-extrabold drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                    X 
                  </span>
                <span className="text-cyan-400">
                  {currentPage === 'malware-analysis'
                    ? ' MA'
                    : currentPage === 'penetration-testing'
                      ? ' PT'
                      : ' VA'}
                </span>
              </div>

            </div>

          </div>

        </div>

      {/* ========================================================
          WORKSPACE NAVIGATION
      ======================================================== */}
      <nav
        className={`
          flex-1
          overflow-y-auto
          scrollbar-thin
          scrollbar-thumb-slate-800
          ${
            sidebarCollapsed
              ? 'px-2 py-3'
              : 'px-2 py-3'
          }
        `}
      >

        <div className="
          px-3
          mb-2
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.15em]
          text-slate-600
        ">
          Workspace
        </div>

        <div className="space-y-0.5">

          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive =
              currentModule === item.id

            return (
              <button
                key={item.id}
                onClick={() =>
                  setCurrentModule(item.id)
                }
                title={
                  sidebarCollapsed
                    ? item.label
                    : undefined
                }
                className={`
                  group
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2.5
                  text-[11px]
                  transition-all
                  relative

                  ${
                    isActive
                      ? `
                        bg-[#06384c]
                        text-cyan-300
                      `
                      : `
                        text-slate-400
                        hover:bg-[#0d1a22]
                        hover:text-slate-200
                      `
                  }
                `}
              >

                {/* Active indicator */}
                {isActive && (
                  <span
                    className="
                      absolute
                      left-0
                      top-1
                      bottom-1
                      w-[2px]
                      bg-cyan-400
                      rounded-r
                    "
                  />
                )}

                <Icon
                  className={`
                    w-4
                    h-4
                    shrink-0
                    transition-colors

                    ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-600 group-hover:text-slate-400'
                    }
                  `}
                />

                <span className="truncate">
                {item.label}
              </span>

              </button>
            )
          })}

        </div>

      </nav>

      {currentPage === 'malware-analysis' ? (
      <>
        {/* New Analysis */}
        <button
          title="New Analysis"
          className="
            w-full
            flex
            items-center
            gap-2.5
            px-2.5
            py-2
            rounded-sm
            text-[10px]
            text-slate-400
            border
            border-dashed
            border-[#263640]
            hover:border-cyan-500/50
            hover:text-cyan-300
            hover:bg-[#0d1a22]
            transition-colors
          "
          onClick={() => setCurrentModule('malware-new-analysis')}
        >
          <Plus className="w-3.5 h-3.5 shrink-0" />
          <span>New Analysis</span>
        </button>

        {/* Findings */}
        <button
          title="View Findings & IOCs"
          className="
            w-full
            flex
            items-center
            gap-2.5
            px-2.5
            py-2
            rounded-sm
            text-[10px]
            text-slate-500
            hover:bg-[#0d1a22]
            hover:text-slate-300
            transition-colors
          "
          onClick={() => setCurrentModule('malware-findings')}
        >
          <Eye className="w-3.5 h-3.5 shrink-0" />
          <span>View Findings & IOCs</span>
        </button>

        {/* Samples */}
        <button
          title="Sample Repository"
          className="
            w-full
            flex
            items-center
            gap-2.5
            px-2.5
            py-2
            rounded-sm
            text-[10px]
            text-slate-500
            hover:bg-[#0d1a22]
            hover:text-slate-300
            transition-colors
          "
          onClick={() => setCurrentModule('malware-samples')}
        >
          <Database className="w-3.5 h-3.5 shrink-0" />
          <span>Sample Repository</span>
        </button>

        {/* Reports */}
        <button
          title="Reports"
          className="
            w-full
            flex
            items-center
            gap-2.5
            px-2.5
            py-2
            rounded-sm
            text-[10px]
            text-slate-500
            hover:bg-[#0d1a22]
            hover:text-slate-300
            transition-colors
          "
          onClick={() => setCurrentModule('malware-reports')}
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span>Reports</span>
        </button>
      </>
    ) : (
      <>
         {/* ========================================================
          SHORTCUTS VA
      ======================================================== */}
      <div
        className="
          shrink-0
          border-t
          border-[#162630]
          bg-[#071016]
          p-3
        "
      >
        <div
          className="
            px-1
            mb-2.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-slate-600
          "
        >
          Shortcuts
        </div>

        <div className="space-y-1.5">

          {/* New Scan */}
          <button
            title="New Scan"
            className="
              w-full
              flex
              items-center
              gap-2.5
              px-2.5
              py-2
              rounded-sm
              text-[10px]
              text-slate-400
              border
              border-dashed
              border-[#263640]
              hover:border-cyan-500/50
              hover:text-cyan-300
              hover:bg-[#0d1a22]
              transition-colors
            "
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>New Scan</span>
          </button>


          {/* Findings */}
          <button
            title="View All Findings"
            className="
              w-full
              flex
              items-center
              gap-2.5
              px-2.5
              py-2
              rounded-sm
              text-[10px]
              text-slate-500
              hover:bg-[#0d1a22]
              hover:text-slate-300
              transition-colors
            "
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>View All Findings</span>
          </button>


          {/* Assets */}
          <button
            title="Manage Assets"
            className="
              w-full
              flex
              items-center
              gap-2.5
              px-2.5
              py-2
              rounded-sm
              text-[10px]
              text-slate-500
              hover:bg-[#0d1a22]
              hover:text-slate-300
              transition-colors
            "
          >
            <Database className="w-3.5 h-3.5 shrink-0" />
            <span>Manage Assets</span>
          </button>


          {/* Compliance */}
          <button
            title="Compliance Report"
            className="
              w-full
              flex
              items-center
              gap-2.5
              px-2.5
              py-2
              rounded-sm
              text-[10px]
              text-slate-500
              hover:bg-[#0d1a22]
              hover:text-slate-300
              transition-colors
            "
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Compliance Report</span>
          </button>

        </div>
      </div>
      </>
    )}


     

    </aside>
  )
}