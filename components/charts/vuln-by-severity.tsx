import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Critical', value: 18, percent: 7.3 },
  { name: 'High', value: 51, percent: 20.6 },
  { name: 'Medium', value: 110, percent: 44.4 },
  { name: 'Low', value: 69, percent: 27.8 },
]

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e']

export default function VulnBySeverity() {
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
          <div className="text-3xl font-bold text-white">248</div>
        </div>
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[index] }}></div>
            <div>
              <div className="text-xs text-slate-400">{item.name}</div>
              <div className="text-sm text-white font-semibold">
                {item.percent}% ({item.value})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
