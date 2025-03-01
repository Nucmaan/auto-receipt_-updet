'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns'

type Region = {
  id: string
  name: string
}

type Technician = {
  id: string
  name: string
  region: string
}

const regions: Region[] = [
  { id: '1', name: 'North' },
  { id: '2', name: 'South' },
  { id: '3', name: 'East' },
  { id: '4', name: 'West' },
]

const technicians: Technician[] = [
  { id: '1', name: 'John Doe', region: '1' },
  { id: '2', name: 'Jane Smith', region: '2' },
  { id: '3', name: 'Bob Johnson', region: '3' },
]

export default function TechnicianSchedulerRegionPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedTechnician, setSelectedTechnician] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const filteredTechnicians = technicians.filter(tech => tech.region === selectedRegion)

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Technician Scheduler Region</h2>
        <p className="text-muted-foreground">
          Schedule technicians by region and date.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Scheduler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="technician">Technician</Label>
            <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
              <SelectTrigger id="technician">
                <SelectValue placeholder="Select a technician" />
              </SelectTrigger>
              <SelectContent>
                {filteredTechnicians.map((tech) => (
                  <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <Button className="w-full bg-[#ff4e00] hover:bg-[#ff6a00] text-white">
            Schedule Technician
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

