export default function RiskByAssetGroup() {
  const assetGroups = [
    {
      name: 'Production Servers',
      assets: 48,
      riskScore: 85,
      riskLevel: 'High',
      icon: '🔴',
      color: 'text-red-500',
    },
    {
      name: 'Web Applications',
      assets: 32,
      riskScore: 78,
      riskLevel: 'High',
      icon: '🟠',
      color: 'text-orange-500',
    },
    {
      name: 'Database Servers',
      assets: 15,
      riskScore: 72,
      riskLevel: 'High',
      icon: '🟠',
      color: 'text-orange-500',
    },
    {
      name: 'Network Devices',
      assets: 28,
      riskScore: 55,
      riskLevel: 'Medium',
      icon: '🟡',
      color: 'text-yellow-500',
    },
    {
      name: 'Workstations',
      assets: 85,
      riskScore: 42,
      riskLevel: 'Medium',
      icon: '🟡',
      color: 'text-yellow-500',
    },
    {
      name: 'Others',
      assets: 40,
      riskScore: 30,
      riskLevel: 'Low',
      icon: '🟢',
      color: 'text-green-500',
    },
  ]

  return (
    <div className="space-y-2">
      {assetGroups.map((group, idx) => (
        <div key={idx} className="border border-slate-700 rounded p-3 hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{group.icon}</span>
              <div>
                <p className="text-xs font-semibold text-white">{group.name}</p>
                <p className="text-xs text-slate-400">{group.assets} Assets</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">{group.riskScore}</p>
              <p className={`text-xs font-semibold ${group.color}`}>{group.riskLevel}</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div
              className={`h-full rounded-full ${
                group.riskScore >= 75
                  ? 'bg-red-500'
                  : group.riskScore >= 50
                    ? 'bg-orange-500'
                    : 'bg-yellow-500'
              }`}
              style={{ width: `${group.riskScore}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
