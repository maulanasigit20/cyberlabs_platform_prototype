import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Vulnerability Assessment', value: 180, percent: 42 },
  { name: 'Penetration Testing', value: 111, percent: 26 },
  { name: 'Digital Forensic', value: 77, percent: 18 },
  { name: 'Malware Analysis', value: 59, percent: 14 },
]

const COLORS = ['#3b82f6', '#a855f7', '#14b8a6', '#f97316']

export default function FindingsByCategory() {
  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col justify-center space-y-3">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">Total</div>
          <div className="text-3xl font-bold text-white">427</div>
        </div>
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[index] }}></div>
              <span className="text-slate-400 text-xs">{item.name}</span>
              <span className="text-slate-400 text-xs">{item.percent}% ({item.value})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
