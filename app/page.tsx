'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar'
import SecondSidebar from '@/components/second-sidebar'
import ExecutiveDashboard from '@/components/executive-dashboard'
import VulnerabilityDashboard from '@/components/vulnerability-dashboard'
import MalwareDashboard from '@/components/malware-dashboard'
import MalwareNewAnalysis from '@/components/malware-new-analysis'
import PentestDashboard from '@/components/pentest-dashboard'
import ThreatIntelDashboard from '@/components/threat-intel-dashboard'
import CaseManagement from '@/components/case-management'

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState('overview')
  const [currentModule, setCurrentModule] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Reset workspace ketika pindah module utama
  useEffect(() => {
    if (currentPage === 'vulnerability-assessment') {
      setCurrentModule('dashboard')
    }

    if (currentPage === 'malware-analysis') {
      setCurrentModule('malware-dashboard')
    }

    if (currentPage === 'malware-new-analysis') {
      setCurrentModule('malware-new-analysis')
    }


    if (currentPage === 'penetration-testing') {
      setCurrentModule('pentest-dashboard')
    }
    
  }, [currentPage])

  return (
    <div className="flex h-screen bg-slate-950">

      {/* ========================================================
          MAIN SIDEBAR
      ======================================================== */}
      <div
        className={`
          h-screen
          flex-shrink-0
          transition-all
          duration-300
          ${
            sidebarCollapsed
              ? 'w-0 overflow-hidden'
              : 'w-56'
          }
        `}
      >
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>


      {/* ========================================================
          SECOND SIDEBAR
      ======================================================== */}
      {(
        currentPage === 'vulnerability-assessment' ||
        currentPage === 'malware-analysis' ||
        currentPage === 'malware-new-analysis' ||
        currentPage === 'penetration-testing'
      ) && (
        <SecondSidebar
          currentPage={currentPage}
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      )}


      {/* ========================================================
            MAIN CONTENT
        ======================================================== */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Executive Dashboard */}
          {currentPage === 'overview' && (
            <ExecutiveDashboard
              setCurrentPage={setCurrentPage}
            />
          )}

          {/* Threat Intelligence Dashboard */}
          {currentPage === 'threat-intelligence' && (
            <ThreatIntelDashboard
              setCurrentPage={setCurrentPage}
            />
          )}

          {/* Case Management */}
          {currentPage === 'case-management' && (
            <CaseManagement
              setCurrentPage={setCurrentPage}
            />
          )}

          {/* Vulnerability Assessment */}
          {currentPage === 'vulnerability-assessment' && (
            <VulnerabilityDashboard />
          )}

          {/* Malware Analysis Dashboard */}
          {currentPage === 'malware-analysis' &&
            currentModule === 'malware-dashboard' && (
              <MalwareDashboard />
            )}

          {/* Malware New Analysis */}
          {currentPage === 'malware-analysis' &&
            currentModule === 'malware-new-analysis' && (
              <MalwareNewAnalysis />
            )}

          {/* Penetration Testing Dashboard */}
          {currentPage === 'penetration-testing' &&
          currentModule === 'pentest-dashboard' && (
            <PentestDashboard />
          )}

          

        </div>

    </div>
  )
}