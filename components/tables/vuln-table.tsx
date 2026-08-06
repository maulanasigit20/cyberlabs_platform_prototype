export default function VulnTable() {
  const vulnerabilities = [
    {
      id: 'CVE-2026-3084',
      cvss: 9.8,
      severity: 'Critical',
      severityColor: 'text-red-500 bg-red-900/30',
      count: 8,
    },
    {
      id: 'CVE-2024-0781',
      cvss: 8.8,
      severity: 'High',
      severityColor: 'text-orange-500 bg-orange-900/30',
      count: 11,
    },
    {
      id: 'CVE-2023-23397',
      cvss: 8.6,
      severity: 'High',
      severityColor: 'text-orange-500 bg-orange-900/30',
      count: 5,
    },
    {
      id: 'CVE-2023-23316',
      cvss: 7.5,
      severity: 'High',
      severityColor: 'text-orange-500 bg-orange-900/30',
      count: 5,
    },
    {
      id: 'CVE-2023-44487',
      cvss: 6.5,
      severity: 'Medium',
      severityColor: 'text-yellow-500 bg-yellow-900/30',
      count: 10,
    },
    {
      id: 'CVE-2023-22515',
      cvss: 6.1,
      severity: 'Medium',
      severityColor: 'text-yellow-500 bg-yellow-900/30',
      count: 14,
    },
    {
      id: 'CVE-2022-47966',
      cvss: 5.3,
      severity: 'Low',
      severityColor: 'text-green-500 bg-green-900/30',
      count: 13,
    },
    {
      id: 'CVE-2021-44228',
      cvss: 4.3,
      severity: 'Low',
      severityColor: 'text-green-500 bg-green-900/30',
      count: 7,
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Vulnerability
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              CVSS
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Severity
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {vulnerabilities.map((vuln) => (
            <tr key={vuln.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
              <td className="py-3 px-4 text-white font-mono text-xs">{vuln.id}</td>
              <td className="py-3 px-4 text-white font-bold">{vuln.cvss}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${vuln.severityColor}`}>
                  {vuln.severity}
                </span>
              </td>
              <td className="py-3 px-4 text-white font-semibold">{vuln.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
