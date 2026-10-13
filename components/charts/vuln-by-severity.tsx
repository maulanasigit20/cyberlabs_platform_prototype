'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Critical', value: 18, percent: 7.3 },
  { name: 'High', value: 51, percent: 20.6 },
  { name: 'Medium', value: 110, percent: 44.4 },
  { name: 'Low', value: 69, percent: 27.8 },
]

// Warna Severity Khas UI Cyber Security
const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6']

export default function VulnBySeverity() {
  const totalVulns = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="flex items-center gap-6">
      {/* Donut Chart */}
      <div className="w-1/2 h-52 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
              stroke="#081118"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0b1720',
                borderColor: '#162630',
                fontSize: '11px',
                color: '#f8fafc',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Total Center Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase text-slate-500 font-medium">Total</span>
          <span className="text-xl font-bold text-white">{totalVulns}</span>
        </div>
      </div>

      {/* Breakdown Legend List */}
      <div className="w-1/2 space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-2 border border-[#101d25] bg-[#050b10] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-[10px] text-slate-300 font-medium">
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-200 font-semibold block">
                {item.value}
              </span>
              <span className="text-[9px] text-slate-500">
                {item.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}