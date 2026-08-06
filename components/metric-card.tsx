import { TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface MetricCardProps {
  title: string
  value: string | number
  maxValue?: string
  change?: string
  subtitle: string
  icon?: string
  color?: string
  layout?: 'horizontal' | 'vertical'
  compact?: boolean
}

const chartData = [
  { value: 20 },
  { value: 35 },
  { value: 28 },
  { value: 40 },
  { value: 32 },
  { value: 45 },
  { value: 38 },
]

export default function MetricCard({
  title,
  value,
  maxValue,
  change,
  subtitle,
  icon,
  color = 'bg-[#12181e]',
  layout = 'horizontal',
  compact = false,
}: MetricCardProps) {
  const isPositive = change?.startsWith('+')

  if (compact) {
    return (
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{value}</span>
              {maxValue && <span className="text-sm text-slate-400">{maxValue}</span>}
            </div>
          </div>
          {icon && <span className="text-2xl">{icon}</span>}
        </div>
        <div className="flex items-center gap-1 text-xs">
          {change && (
            <>
              {isPositive ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
              <span className={isPositive ? 'text-green-500' : 'text-red-500'}>{change}</span>
            </>
          )}
          <span className="text-slate-500">{subtitle}</span>
        </div>
      </div>
    )
  }

  if (layout === 'vertical') {
    return (
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{value}</span>
              {maxValue && <span className="text-base text-slate-400">{maxValue}</span>}
            </div>
          </div>
          {icon && <span className="text-3xl">{icon}</span>}
        </div>
        <div className="mb-4 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color === 'bg-blue-600' ? '#3b82f6' : '#f59e0b'}
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-sm">
          <p className="text-slate-400">{subtitle}</p>
          {change && (
            <div className="flex items-center gap-1 mt-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={isPositive ? 'text-green-500' : 'text-red-500'}>{change}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">{title}</p>
          <span className="text-3xl font-bold text-white">{value}</span>
        </div>
        <div className={`${color} rounded p-3 flex items-center justify-center`}>
          {icon && <span className="text-xl">{icon}</span>}
        </div>
      </div>
      <div className="mb-4 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color === 'bg-blue-600' ? '#3b82f6' : '#6366f1'}
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{subtitle}</p>
        {change && (
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={isPositive ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
