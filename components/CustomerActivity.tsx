"use client"

import dynamic from 'next/dynamic'
import { ResponsiveContainerProps, ScatterChartProps, ScatterProps, XAxisProps, YAxisProps, ZAxisProps, TooltipProps } from 'recharts'

const ResponsiveContainer = dynamic<ResponsiveContainerProps>(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })
const ScatterChart = dynamic<ScatterChartProps>(() => import('recharts').then(mod => mod.ScatterChart), { ssr: false })
const Scatter = dynamic<ScatterProps>(() => import('recharts').then(mod => mod.Scatter), { ssr: false })
const XAxis = dynamic<XAxisProps>(() => import('recharts').then(mod => mod.XAxis), { ssr: false })
const YAxis = dynamic<YAxisProps>(() => import('recharts').then(mod => mod.YAxis), { ssr: false })
const ZAxis = dynamic<ZAxisProps>(() => import('recharts').then(mod => mod.ZAxis), { ssr: false })
const Tooltip = dynamic<TooltipProps<any, any>>(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })
import { useState, useEffect } from 'react'

const data = [
  { hour: '12am', day: 'Mon', value: 20 },
  { hour: '1am', day: 'Mon', value: 15 },
  { hour: '2am', day: 'Mon', value: 10 },
  // ... Add more data points for each hour and day
  { hour: '11pm', day: 'Sun', value: 25 },
]

const hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function CustomerActivity() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div>Loading...</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey="hour" type="category" name="Hour" />
        <YAxis dataKey="day" type="category" name="Day" />
        <ZAxis dataKey="value" type="number" range={[0, 500]} name="Value" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#ff4e00" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

