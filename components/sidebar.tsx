'use client'

import {
  ChevronDown,
  LayoutDashboard,
  Shield,
  HatGlasses,
  HardDrive,
  Zap,
  AlertTriangle,
  Briefcase,
  Settings,
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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    assessment: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="h-full bg-[#080d12] border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-slate-800 flex items-center gap-2">
        <HatGlasses className="w-10 h-10 text-white" />
        <div className="flex flex-col">
          <div className="text-xs font-bold text-white">SYNDICATE APPLICATION</div>
          <div className="text-[10px] text-slate-400"> Integrated Cybersecurity Assessment</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-1 space-y-1 overflow-y-auto">
        {/* DASHBOARD */}
        <button
          onClick={() => setCurrentPage('overview')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-left ${
            currentPage === 'overview'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
          <span>Overview</span>
        </button>

        {/* ASSESSMENT */}
        <div>
          <button
            onClick={() => toggleSection('assessment')}
            className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span>Assessment</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
                expandedSections.assessment ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.assessment && (
            <div className="space-y-1 mt-1 ml-0 bg-[#12181e]">
              <button
                onClick={() => setCurrentPage('vulnerability-assessment')}
                className={`w-full flex items-center gap-3 px-3 py-2 ml-2 text-xs text-left ${
                  currentPage === 'vulnerability-assessment'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span>Vulnerability Assessment</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 ml-2 text-xs text-left hover:bg-slate-800">
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span>Penetration Testing</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 ml-2 text-xs text-left hover:bg-slate-800">
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span>Infrastructure Assessment</span>
              </button>
            </div>
          )}
        </div>

        {/* DIGITAL FORENSIC */}
        <div>
          <button
            onClick={() => toggleSection('digital-forensic')}
            className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded"
          >
            <div className="flex items-center gap-3">
              <HardDrive className="w-4 h-4 flex-shrink-0" />
              <span>Digital Forensic</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
                expandedSections['digital-forensic'] ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections['digital-forensic'] && (
            <div className="space-y-1 mt-1 ml-0 bg-[#12181e]">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <HardDrive className="w-4 h-4 flex-shrink-0" />
                <span>Disk Forensic</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <HardDrive className="w-4 h-4 flex-shrink-0" />
                <span>Memory Forensic</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <HardDrive className="w-4 h-4 flex-shrink-0" />
                <span>Mobile Forensic</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <HardDrive className="w-4 h-4 flex-shrink-0" />
                <span>Cloud Forensic</span>
              </button>
            </div>
          )}
        </div>

        {/* MALWARE ANALYSIS */}
        <div>
          <button
            onClick={() => toggleSection('malware-analysis')}
            className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 flex-shrink-0" />
              <span>Malware Analysis</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
                expandedSections['malware-analysis'] ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections['malware-analysis'] && (
            <div className="space-y-1 mt-1 ml-0 bg-[#12181e]">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Zap className="w-4 h-4 flex-shrink-0" />
                <span>Static Analysis</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Zap className="w-4 h-4 flex-shrink-0" />
                <span>Dynamic Analysis</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Zap className="w-4 h-4 flex-shrink-0" />
                <span>Reverse Engineering</span>
              </button>
            </div>
          )}
        </div>

        {/* THREAT INTELLIGENCE */}
        <div>
          <button
            onClick={() => toggleSection('threat-intelligence')}
            className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Threat Intelligence</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
                expandedSections['threat-intelligence'] ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections['threat-intelligence'] && (
            <div className="space-y-1 mt-1 ml-0 bg-[#12181e]">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Threat Dashboard</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>IOC Management</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>TLP & Feeds</span>
              </button>
            </div>
          )}
        </div>

        {/* CASE MANAGEMENT */}
        <div>
          <button
            onClick={() => toggleSection('case-management')}
            className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span>Case Management</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
                expandedSections['case-management'] ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections['case-management'] && (
            <div className="space-y-1 mt-1 ml-0 bg-[#12181e]">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span>Cases</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span>Evidence</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span>Incidents</span>
              </button>
            </div>
          )}
        </div>

        {/* ADMINISTRATION */}
        <div>
          <button
            onClick={() => toggleSection('administration')}
            className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span>Administration</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
                expandedSections['administration'] ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections['administration'] && (
            <div className="space-y-1 mt-1 ml-0">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span>Assets</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span>Users & Roles</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span>System Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span>Audit Logs</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded ml-2 text-xs text-slate-300 hover:bg-slate-800 text-left">
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span>License & Updates</span>
              </button>
            </div>
          )}
          {/* Footer */}
            {/* Footer */}
            <div className="p-4 border-t border-slate-800">

              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Platform Services
              </div>

              <div className="space-y-2">

                {[
                  "VA Engine",
                  "Pentest Engine",
                  "Forensic Engine",
                  "Malware Engine",
                  "Threat Intel Feed",
                  "Reporting Service",
                  "SSO Service",
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-slate-300">{service}</span>

                    <span className="px-2 py-0.5 rounded-full bg-green-900/40 text-green-400 text-[10px] font-semibold">
                      Healthy
                    </span>
                  </div>
                ))}

              </div>

            </div>
        </div>
      </nav>

      
    </div>
  )
}
