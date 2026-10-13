export default function RiskByAssetGroup() {
  // Ringkasan metrik attack surface (Asset Inventory)
  const assetStats = [
    { label: 'IP', value: 6 },
    { label: 'Subdomain', value: 14 },
    { label: 'Open Port', value: 21 },
    { label: 'Service', value: 18 },
  ]

  const assetGroups = [
    {
      name: 'Production Servers',
      assets: 48,
      riskScore: 85,
      riskLevel: 'Critical',
      color: 'text-red-400',
      bgColor: 'bg-red-400',
      badgeClass: 'text-red-400 border-red-500/30 bg-red-500/5',
    },
    {
      name: 'Web Applications',
      assets: 32,
      riskScore: 78,
      riskLevel: 'High',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400',
      badgeClass: 'text-orange-400 border-orange-500/30 bg-orange-500/5',
    },
    {
      name: 'Network Devices',
      assets: 28,
      riskScore: 55,
      riskLevel: 'Medium',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400',
      badgeClass: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
    },
    {
      name: 'Others',
      assets: 40,
      riskScore: 30,
      riskLevel: 'Low',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400',
      badgeClass: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    },
  ]

  return (
    <div className="space-y-3.5">
      {/* ======================================================
          MINI STATS SUMMARY (IP, Subdomain, Open Port, Service)
      ====================================================== */}
      <div className="grid grid-cols-4 gap-2 p-2.5 border border-[#162630] bg-[#0b1720]">
        {assetStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-sm font-semibold text-cyan-400">
              {stat.value}
            </div>
            <div className="text-[9px] text-slate-500 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ======================================================
          RISK BY ASSET GROUP LIST
      ====================================================== */}
      <div className="space-y-2">
        {assetGroups.map((group, idx) => (
          <div
            key={idx}
            className="border border-[#101d25] bg-[#050b10] hover:bg-[#0b1720] transition-colors p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${group.bgColor}`} />
                <div>
                  <p className="text-[11px] font-medium text-slate-200">
                    {group.name}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {group.assets} Assets
                  </p>
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                <span className="text-xs font-semibold text-white">
                  {group.riskScore}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 border font-semibold ${group.badgeClass}`}
                >
                  {group.riskLevel}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#111e26] h-1.5 overflow-hidden">
              <div
                className={`h-full ${group.bgColor}`}
                style={{ width: `${group.riskScore}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}