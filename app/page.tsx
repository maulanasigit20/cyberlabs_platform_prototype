'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import SecondSidebar from '@/components/second-sidebar'
import ExecutiveDashboard from '@/components/executive-dashboard'
import VulnerabilityDashboard from '@/components/vulnerability-dashboard'

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState('overview')
  const [currentModule, setCurrentModule] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
      <div className="flex h-screen bg-slate-950">

        <div
          className={`h-screen flex-shrink-0 transition-all duration-300 ${
            sidebarCollapsed
              ? "w-0 overflow-hidden"
              : "w-56"
          }`}
        >
          <Sidebar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

      {currentPage === 'vulnerability-assessment' && (
        <SecondSidebar
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentPage === 'overview' && (
          <ExecutiveDashboard
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'vulnerability-assessment' && <VulnerabilityDashboard />}
      </div>
    </div>
  )
}
