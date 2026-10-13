'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { date: 'Apr 18', critical: 25, high: 45, medium: 60, low: 35 },
  { date: 'Apr 25', critical: 28, high: 50, medium: 65, low: 40 },
  { date: 'May 2', critical: 32, high: 48, medium: 62, low: 38 },
  { date: 'May 9', critical: 30, high: 52, medium: 68, low: 42 },
  { date: 'May 16', critical: 28, high: 50, medium: 70, low: 40 },
]

export default function VulnOverTime() {
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#101d25" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#64748b', fontSize: 10 }}
            axisLine={{ stroke: '#162630' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 10 }}
            axisLine={{ stroke: '#162630' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0b1720',
              borderColor: '#162630',
              fontSize: '11px',
              color: '#f8fafc',
            }}
          />
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
            stroke="#3b82f6"
            dot={false}
            strokeWidth={2}
            name="Low"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}