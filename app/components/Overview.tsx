"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  {
    name: "Jan",
    revenue: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Feb",
    revenue: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Mar",
    revenue: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Apr",
    revenue: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "May",
    revenue: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Jun",
    revenue: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="border-none p-3 shadow-lg">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#ff4e00]" />
                      <span className="text-sm font-medium">
                        Revenue: ${payload[0].value}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#ff8c00]" />
                      <span className="text-sm font-medium">
                        Expenses: ${payload[1].value}
                      </span>
                    </div>
                  </div>
                </Card>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar
          dataKey="revenue"
          fill="url(#gradient1)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expenses"
          fill="url(#gradient2)"
          radius={[4, 4, 0, 0]}
        />
        <defs>
          <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4e00" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#ff4e00" stopOpacity={0.3}/>
          </linearGradient>
          <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8c00" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#ff8c00" stopOpacity={0.3}/>
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  )
}

