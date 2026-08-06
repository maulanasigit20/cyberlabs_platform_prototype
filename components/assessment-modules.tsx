interface AssessmentModulesProps {
  setCurrentPage: (page: string) => void
}

export default function AssessmentModules({
  setCurrentPage,
}: AssessmentModulesProps) {
  const modules = [
    {
      id: 1,
      title: 'Vulnerability Assessment',
      page: 'vulnerability-assessment',
      description: 'Scan your assets, identify vulnerabilities, and track remediation.',
      icon: '🛡️',
      color: 'from-blue-800 to-blue-1000',
      stats: [
        { label: 'Critical Findings', value: '18', sublabel: '10 minutes ago' },
        { label: 'Last Scan', value: 'Last Scan' },
      ],
      button: 'Open Workspace',
    },
    {
      id: 2,
      title: 'Penetration Testing',
      description: 'Perform API, web, and infrastructure penetration testing.',
      icon: '🎯',
      color: 'from-red-800 to-red-1000',
      stats: [
        { label: 'Active Scans', value: '3' },
        { label: 'Last Report', value: 'SQL Injection' },
      ],
      button: 'Open Workspace',
    },
    {
      id: 3,
      title: 'Digital Forensic',
      description: 'Investigate digital evidence and discover attack artifacts.',
      icon: '🔍',
      color: 'from-teal-800 to-teal-1000',
      stats: [
        { label: 'Active Cases', value: '5' },
        { label: 'Recent Evidence', value: 'Laptop-001' },
      ],
      button: 'Open Workspace',
    },
    {
      id: 4,
      title: 'Malware Analysis',
      description: 'Analyze malware behavior, extract IOCs and attack patterns.',
      icon: '🦠',
      color: 'from-orange-800 to-orange-1000',
      stats: [
        { label: 'Pending Samples', value: '7' },
        { label: 'High Threats', value: '3' },
      ],
      button: 'Open Workspace',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-6">
      {modules.map((module) => (
        <div
          key={module.id}
          className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors"
        >
          <div className={`bg-gradient-to-r ${module.color} px-6 py-4`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{module.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{module.title}</h3>
                  <p className="text-sm text-white/80">{module.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {module.stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  {stat.sublabel && <p className="text-xs text-slate-500">{stat.sublabel}</p>}
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(module.page)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm transition-colors"
            >
              {module.button} →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
