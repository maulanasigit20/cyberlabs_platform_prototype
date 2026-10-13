export default function RecentActivities() {
  const activities = [
    {
      id: 1,
      title: 'Nessus scan completed',
      description: 'Internal Network Scan',
      time: '10:30 AM',
      icon: '✓',
      iconBg: 'bg-green-600',
    },
    {
      id: 2,
      title: 'Burp Suite found SQL Injection',
      description: 'Target: app.danawa.co.id',
      time: '09:45 AM',
      icon: '⚠️',
      iconBg: 'bg-orange-600',
    },
    {
      id: 3,
      title: 'Jose Sandbox analysis completed',
      description: 'Sample: invoice.exe',
      time: 'Yesterday',
      icon: '✓',
      iconBg: 'bg-green-600',
    },
    // {
    //   id: 4,
    //   title: 'Magnet AXIOM case updated',
    //   description: 'Case ID: 2025-0510-01',
    //   time: 'Yesterday',
    //   icon: '🔵',
    //   iconBg: 'bg-blue-600',
    // },
    {
      id: 5,
      title: 'New IOC match in Threat Intel',
      description: 'IOC: 185.220.101.15',
      time: 'May 9, 2025',
      icon: '✓',
      iconBg: 'bg-green-600',
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-800 last:border-b-0">
          <div className={`${activity.iconBg} rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold`}>
            {activity.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{activity.title}</p>
            <p className="text-xs text-slate-400">{activity.description}</p>
          </div>
          <div className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap">{activity.time}</div>
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
        </div>
      ))}
    </div>
  )
}
