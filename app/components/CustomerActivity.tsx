"use client"

import { ResponsiveContainer, Tooltip, XAxis, YAxis, HeatmapChart, Hexagon } from 'recharts'

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
  return (
    <ResponsiveContainer width="100%" height={300}>
      <HeatmapChart data={data} xAxis={<XAxis dataKey="hour" />} yAxis={<YAxis dataKey="day" />}>
        <Hexagon dataKey="value" name="Activity" />
        <Tooltip />
      </HeatmapChart>
    </ResponsiveContainer>
  )
}

