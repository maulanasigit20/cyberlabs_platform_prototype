import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function ComplianceOverview() {
  const complianceFrameworks = [
    { name: 'ISO 27001', compliance: 78, color: '#3b82f6' },
    { name: 'PCI DSS', compliance: 65, color: '#06b6d4' },
    { name: 'CIS Controls v8', compliance: 82, color: '#10b981' },
    { name: 'NIST CSF', compliance: 73, color: '#a855f7' },
    { name: 'OWASP Top 10', compliance: 68, color: '#f59e0b' },
  ]

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-white">Compliance Overview</h2>
        <button className="text-blue-500 hover:text-blue-400 text-sm font-semibold">
          View Full Report
        </button>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {complianceFrameworks.map((framework, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: framework.compliance },
                      { value: 100 - framework.compliance },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={48}
                    dataKey="value"
                  >
                    <Cell fill={framework.color} />
                    <Cell fill="#334155" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">{framework.compliance}%</p>
              <p className="text-xs text-slate-400">Compliant</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">{framework.name}</p>
            </div>
            <button className="mt-2 text-xs text-blue-500 hover:text-blue-400 font-semibold">
              Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
