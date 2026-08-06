import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { date: 'Apr 18', critical: 25, high: 45, medium: 60, low: 35 },
  { date: 'Apr 25', critical: 28, high: 50, medium: 65, low: 40 },
  { date: 'May 2', critical: 32, high: 48, medium: 62, low: 38 },
  { date: 'May 9', critical: 30, high: 52, medium: 68, low: 42 },
  { date: 'May 16', critical: 28, high: 50, medium: 70, low: 40 },
]

export default function VulnOverTime() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#f1f5f9' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Line
          type="monotone"
          dataKey="critical"
          stroke="#ef4444"
          dot={false}
          strokeWidth={2}
          name="Critical"
        />
        <Line
          type="monotone"
          dataKey="high"
          stroke="#f97316"
          dot={false}
          strokeWidth={2}
          name="High"
        />
        <Line
          type="monotone"
          dataKey="medium"
          stroke="#eab308"
          dot={false}
          strokeWidth={2}
          name="Medium"
        />
        <Line
          type="monotone"
          dataKey="low"
          stroke="#22c55e"
          dot={false}
          strokeWidth={2}
          name="Low"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
