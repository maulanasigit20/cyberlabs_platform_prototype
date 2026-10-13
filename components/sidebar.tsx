'use client'

import {
  ChevronDown,
  LayoutDashboard,
  Shield,
  Zap,
  AlertTriangle,
  Briefcase,
  Settings,
  CircleDot,
  Search,
  Bug,
  FileSearch,
  Users,
  Database,
  Activity,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Sidebar({
  currentPage,
  setCurrentPage,
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    assessment: true,
    'threat-intelligence': true,
    'case-management': true,
    administration: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // ============================================================
  // STYLES
  // ============================================================

  const parentButton =
    'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-sm text-[12px] font-medium text-slate-300 hover:bg-[#0d1a22] hover:text-white transition-colors'

  const childButton =
    'w-full flex items-center gap-2.5 px-3 py-2 ml-2 rounded-sm text-[11px] text-left transition-colors'

  const childInactive =
    'text-slate-400 hover:bg-[#0d1a22] hover:text-slate-200'

  const childActive =
    'bg-[#06384c] text-cyan-300 border-l-2 border-cyan-400'

  const isActive = (page: string) => currentPage === page

  return (
    <aside className="h-full w-full bg-[#050b10] border-r border-[#16232c] flex flex-col overflow-hidden">

      {/* ========================================================
          LOGO
      ======================================================== */}
      <div className="px-4 py-4 border-b border-[#16232c] shrink-0">
        <div className="flex items-center gap-3">

          <img
            src="/logo-oxygen.png"
            alt="Oxygen"
            className="w-10 h-10 object-contain shrink-0"
          />

          <div className="flex flex-col min-w-0">
            <div className="text-[18px] font-bold tracking-wide text-cyan-400">
              OXYGEN
            </div>

            <div className="text-[9px] leading-tight text-slate-500 mt-0.5">
              Integrated Cyber Operations
              <br />
              & Digital Forensics Platform
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          NAVIGATION
      ======================================================== */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">

        {/* ======================================================
            OVERVIEW
        ====================================================== */}
        <button
          onClick={() => setCurrentPage('overview')}
          className={`
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-sm
            text-[12px]
            text-left
            transition-all
            ${
              isActive('overview')
                ? 'bg-[#06415a] text-cyan-300 border-l-2 border-cyan-400'
                : 'text-slate-300 hover:bg-[#0d1a22] hover:text-white'
            }
          `}
        >
          <LayoutDashboard
            className={`w-4 h-4 shrink-0 ${
              isActive('overview')
                ? 'text-cyan-400'
                : 'text-slate-500'
            }`}
          />

          <span>Overview</span>
        </button>

        {/* ======================================================
            Pentest test
        ====================================================== */}
          <button
            onClick={() => setCurrentPage('vulnerability-assessment')}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-sm
              text-[12px]
              text-left
              transition-all
              ${
                isActive('vulnerability-assessment')
                  ? 'bg-[#06415a] text-cyan-300 border-l-2 border-cyan-400'
                  : 'text-slate-300 hover:bg-[#0d1a22] hover:text-white'
              }
            `}
          >

            <Zap
              className={`
                w-3.5
                h-3.5
                shrink-0
                ${
                  isActive('vulnerability-assessment')
                    ? 'text-cyan-400'
                    : 'text-slate-500'
                }
              `}
            />

            <span>Vulnerability Assessment</span>

          </button>

        {/* ======================================================
            Automation Pentest
        ====================================================== */}
          <button
            onClick={() => setCurrentPage('penetration-testing')}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-sm
              text-[12px]
              text-left
              transition-all
              ${
                isActive('penetration-testing')
                  ? 'bg-[#06415a] text-cyan-300 border-l-2 border-cyan-400'
                  : 'text-slate-300 hover:bg-[#0d1a22] hover:text-white'
              }
            `}
          >

            <Shield
                      className={`
                        w-3.5 h-3.5 shrink-0
                        ${
                          isActive('penetration-testing')
                            ? 'text-cyan-400'
                            : 'text-slate-600'
                        }
                      `}
                    />

            <span>Automation Pentest</span>

          </button>



        {/* ======================================================
            MALWARE ANALYSIS
        ====================================================== */}
        <div className="mt-1">

          <button
            onClick={() => setCurrentPage('malware-analysis')}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-sm
              text-[12px]
              text-left
              transition-all
              ${
                isActive('malware-analysis')
                  ? 'bg-[#06415a] text-cyan-300 border-l-2 border-cyan-400'
                  : 'text-slate-300 hover:bg-[#0d1a22] hover:text-white'
              }
            `}
          >

            <Bug
                  className={`
                    w-3.5 h-3.5 shrink-0
                    ${
                      isActive('malware-analysis')
                        ? 'text-cyan-400'
                        : 'text-slate-600'
                    }
                  `}
                />

            <span>Malware Analysis</span>

          </button>

        </div>


        {/* ======================================================
            THREAT INTELLIGENCE
        ====================================================== */}
        <div className="mt-1">

          <button
            onClick={() =>
              toggleSection('threat-intelligence')
            }
            className={parentButton}
          >
            <div className="flex items-center gap-3">

              <AlertTriangle className="w-4 h-4 text-slate-500 shrink-0" />

              <span>Threat Intelligence</span>

            </div>

            <ChevronDown
              className={`
                w-3.5 h-3.5
                text-slate-500
                transition-transform
                ${
                  expandedSections['threat-intelligence']
                    ? 'rotate-180'
                    : ''
                }
              `}
            />
          </button>

          {expandedSections['threat-intelligence'] && (
            <div className="mt-0.5 space-y-0.5">

              <button
                className={`${childButton} ${childInactive}`}
                onClick={() => setCurrentPage('threat-intelligence')}
              >
                <Activity className="w-3.5 h-3.5 text-slate-600" />
                <span>Threat Dashboard</span>
              </button>

              <button
                className={`${childButton} ${childInactive}`}
              >
                <Search className="w-3.5 h-3.5 text-slate-600" />
                <span>IOC Management</span>
              </button>

              <button
                className={`${childButton} ${childInactive}`}
              >
                <Database className="w-3.5 h-3.5 text-slate-600" />
                <span>Threat Feeds</span>
              </button>

            </div>
          )}
        </div>


        {/* ======================================================
            CASE MANAGEMENT
        ====================================================== */}
        <div className="mt-1">

          <button
            onClick={() =>
              toggleSection('case-management')
            }
            className={parentButton}
          >
            <div className="flex items-center gap-3">

              <Briefcase className="w-4 h-4 text-slate-500 shrink-0" />

              <span>Case Management</span>

            </div>

            <ChevronDown
              className={`
                w-3.5 h-3.5
                text-slate-500
                transition-transform
                ${
                  expandedSections['case-management']
                    ? 'rotate-180'
                    : ''
                }
              `}
            />
          </button>

          {expandedSections['case-management'] && (
            <div className="mt-0.5 space-y-0.5">

              <button
                className={`${childButton} ${childInactive}`}
                onClick={() => setCurrentPage('case-management')}
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                <span>Cases</span>
              </button>

              <button
                className={`${childButton} ${childInactive}`}
              >
                <Database className="w-3.5 h-3.5 text-slate-600" />
                <span>Evidence & Artifacts</span>
              </button>

            </div>
          )}
        </div>


        {/* ======================================================
            ADMINISTRATION
        ====================================================== */}
        <div className="mt-1">

          <button
            onClick={() =>
              toggleSection('administration')
            }
            className={parentButton}
          >
            <div className="flex items-center gap-3">

              <Settings className="w-4 h-4 text-slate-500 shrink-0" />

              <span>Administration</span>

            </div>

            <ChevronDown
              className={`
                w-3.5 h-3.5
                text-slate-500
                transition-transform
                ${
                  expandedSections.administration
                    ? 'rotate-180'
                    : ''
                }
              `}
            />
          </button>

          {expandedSections.administration && (
            <div className="mt-0.5 space-y-0.5">

              <button
                className={`${childButton} ${childInactive}`}
              >
                <Users className="w-3.5 h-3.5 text-slate-600" />
                <span>Users & Roles</span>
              </button>

              <button
                className={`${childButton} ${childInactive}`}
              >
                <Settings className="w-3.5 h-3.5 text-slate-600" />
                <span>System Settings</span>
              </button>

              <button
                className={`${childButton} ${childInactive}`}
              >
                <FileSearch className="w-3.5 h-3.5 text-slate-600" />
                <span>Audit Logs</span>
              </button>

              <button
                className={`${childButton} ${childInactive}`}
              >
                <Zap className="w-3.5 h-3.5 text-slate-600" />
                <span>License & Updates</span>
              </button>

            </div>
          )}
        </div>

      </nav>


      {/* ========================================================
          PLATFORM SERVICES
          Fixed at bottom
      ======================================================== */}
      <div className="shrink-0 border-t border-[#16232c] px-4 py-3 bg-[#050b10]">

        <div className="flex items-center justify-between mb-3">

          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em]">
            Platform Services
          </div>

          <CircleDot className="w-3 h-3 text-green-400" />

        </div>

        <div className="space-y-2">

          {[
            'VA Engine',
            'Pentest Engine',
            'Malware Engine',
            'Threat Intel Feed',
            'Reporting Service',
          ].map((service) => (

            <div
              key={service}
              className="flex items-center justify-between gap-2"
            >

              <span className="text-[10px] text-slate-400">
                {service}
              </span>

              <span className="flex items-center gap-1 text-[9px] font-medium text-green-400">

                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

                Healthy

              </span>

            </div>

          ))}

        </div>

      </div>

    </aside>
  )
}