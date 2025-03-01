'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Search, Plus, MapPin, Calendar as CalendarIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

// Types for Scheduler
type ScheduleEvent = {
  id: string;
  technicianId: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}

// Types for Region
type Region = {
  id: string;
  name: string;
  code: string;
  technicians: number;
  activeJobs: number;
}

// Sample data
const sampleEvents: ScheduleEvent[] = [
  {
    id: '1',
    technicianId: '1',
    title: 'Cable Installation',
    date: new Date('2023-07-15'),
    startTime: '09:00',
    endTime: '11:00',
    status: 'Scheduled'
  },
  {
    id: '2',
    technicianId: '2',
    title: 'Network Troubleshooting',
    date: new Date('2023-07-15'),
    startTime: '13:00',
    endTime: '15:00',
    status: 'In Progress'
  }
];

const sampleRegions: Region[] = [
  { id: '1', name: 'North District', code: 'ND', technicians: 5, activeJobs: 12 },
  { id: '2', name: 'South District', code: 'SD', technicians: 3, activeJobs: 8 },
  { id: '3', name: 'East District', code: 'ED', technicians: 4, activeJobs: 10 },
  { id: '4', name: 'West District', code: 'WD', technicians: 6, activeJobs: 15 }
];

export default function SchedulerRegionPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<ScheduleEvent[]>(sampleEvents);
  const [regions, setRegions] = useState<Region[]>(sampleRegions);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on selected date
  const filteredEvents = events.filter(event => 
    date && event.date.toDateString() === date.toDateString()
  );

  // Filter regions based on search query
  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    region.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Scheduler & Region Management</h2>
        <p className="text-muted-foreground">
          Manage technician schedules and regional assignments.
        </p>
      </div>

      <Tabs defaultValue="scheduler" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
          <TabsTrigger value="region">Region</TabsTrigger>
        </TabsList>
        
        {/* Scheduler Tab */}
        <TabsContent value="scheduler" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Schedule for selected date */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Schedule for {date?.toDateString()}</CardTitle>
                <Button className="bg-[#ff4e00] hover:bg-[#ff6a00]">
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </CardHeader>
              <CardContent>
                {filteredEvents.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Technician</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.startTime} - {event.endTime}</TableCell>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>Tech #{event.technicianId}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                event.status === 'Scheduled' ? 'default' : 
                                event.status === 'In Progress' ? 'secondary' : 
                                event.status === 'Completed' ? 'default' : 
                                'destructive'
                              }
                            >
                              {event.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No events scheduled for this date
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Region Tab */}
        <TabsContent value="region" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Regions</CardTitle>
              <Button className="bg-[#ff4e00] hover:bg-[#ff6a00]">
                <Plus className="mr-2 h-4 w-4" /> Add Region
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search regions"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Button className="bg-[#ff4e00] hover:bg-[#ff6a00] text-white">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Technicians</TableHead>
                    <TableHead>Active Jobs</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegions.map((region) => (
                    <TableRow key={region.id}>
                      <TableCell className="font-medium">{region.name}</TableCell>
                      <TableCell>{region.code}</TableCell>
                      <TableCell>{region.technicians}</TableCell>
                      <TableCell>{region.activeJobs}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-[#ff4e00] border-[#ff4e00] hover:bg-[#ff4e00] hover:text-white">
                            <MapPin className="h-4 w-4 mr-1" /> View Map
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

