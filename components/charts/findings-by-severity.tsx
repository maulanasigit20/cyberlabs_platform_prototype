'use client'

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Critical', value: 18 },
  { name: 'High', value: 83 },
  { name: 'Medium', value: 142 },
  { name: 'Low', value: 184 },
]

// Warna khas tingkat risiko
const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6']

export default function FindingsBySeverity() {
  return (
    <div className="space-y-3">
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
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
              cursor={{ fill: '#0b1720' }}
            />
            <Bar dataKey="value" radius={[2, 2, 0, 0]} barSize={28}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end">
        <button className="text-[10px] text-cyan-500 hover:text-cyan-300 transition-colors font-semibold">
          View Severity Report
        </button>
      </div>
    </div>
  )
}