import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Critical', value: 18 },
  { name: 'High', value: 83 },
  { name: 'Medium', value: 142 },
  { name: 'Low', value: 184 },
]

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e']

export default function FindingsBySeverity() {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#1e293b' }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#1e293b' }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <button className="text-blue-500 hover:text-blue-400 text-sm font-semibold">
        View Details
      </button>
    </div>
  )
}
