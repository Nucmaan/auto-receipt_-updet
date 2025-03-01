"use client"

import dynamic from 'next/dynamic'
import { PieChartProps, PieProps, CellProps, ResponsiveContainerProps, LegendProps, TooltipProps } from 'recharts'

const PieChart = dynamic<PieChartProps>(() => import('recharts').then(mod => mod.PieChart), { ssr: false })
const Pie = dynamic<PieProps>(() => import('recharts').then(mod => mod.Pie), { ssr: false })
const Cell = dynamic<CellProps>(() => import('recharts').then(mod => mod.Cell), { ssr: false })
const ResponsiveContainer = dynamic<ResponsiveContainerProps>(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })
const Legend = dynamic<LegendProps>(() => import('recharts').then(mod => mod.Legend), { ssr: false })
const Tooltip = dynamic<TooltipProps<any, any>>(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })

import { useState, useEffect } from 'react'

const data = [
  { name: 'Customer Issues', value: 400 },
  { name: 'Complaints', value: 300 },
  { name: 'STB Repairs', value: 200 },
  { name: 'Other', value: 100 },
]

const COLORS = ['#ff4e00', '#0ea5e9', '#10b981', '#8b5cf6']

export function TaskDistribution() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div>Loading...</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

