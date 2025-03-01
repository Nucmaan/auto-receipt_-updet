'use client'

import { useState } from 'react'
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DateRangePickerWithRange } from "@/components/ui/date-range-picker"
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type STBRepair = {
  id: string
  icno: string
  mobile: string
  userName: string
  stbModel: string
  issueDescription: string
  status: 'Pending' | 'In Progress' | 'Completed'
  createdAt: Date
}

const initialRepairs: STBRepair[] = [
  {
    id: '1',
    icno: '123456',
    mobile: '1234567890',
    userName: 'John Doe',
    stbModel: 'Model X',
    issueDescription: 'No signal',
    status: 'In Progress',
    createdAt: new Date('2023-06-01')
  },
  {
    id: '2',
    icno: '234567',
    mobile: '2345678901',
    userName: 'Alice Johnson',
    stbModel: 'Model Y',
    issueDescription: 'Freezing screen',
    status: 'Pending',
    createdAt: new Date('2023-06-05')
  },
]

export function STBRepairManagement() {
  const [repairs, setRepairs] = useState<STBRepair[]>(initialRepairs)
  const [newRepair, setNewRepair] = useState<Partial<STBRepair>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRepair({ ...newRepair, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const repair: STBRepair = {
      id: Date.now().toString(),
      ...newRepair as STBRepair,
      status: 'Pending',
      createdAt: new Date()
    }
    setRepairs([...repairs, repair])
    setNewRepair({})
  }

  const updateStatus = (id: string, newStatus: STBRepair['status']) => {
    setRepairs(repairs.map(repair =>
      repair.id === id ? { ...repair, status: newStatus } : repair
    ))
  }

  const filteredRepairs = repairs.filter(repair =>
    (repair.icno.includes(searchQuery) ||
    repair.mobile.includes(searchQuery) ||
    repair.userName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!dateRange || (repair.createdAt >= dateRange.from && repair.createdAt <= dateRange.to))
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="Search by ICno, Mobile, or User Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <DateRangePickerWithRange date={dateRange} setDate={setDateRange} />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New STB Repair</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New STB Repair</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icno">ICno</Label>
                  <Input id="icno" name="icno" value={newRepair.icno || ''} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input id="mobile" name="mobile" value={newRepair.mobile || ''} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userName">User Name</Label>
                  <Input id="userName" name="userName" value={newRepair.userName || ''} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stbModel">STB Model</Label>
                  <Input id="stbModel" name="stbModel" value={newRepair.stbModel || ''} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="issueDescription">Issue Description</Label>
                  <Input id="issueDescription" name="issueDescription" value={newRepair.issueDescription || ''} onChange={handleInputChange} required />
                </div>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ICno</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>STB Model</TableHead>
            <TableHead>Issue Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRepairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell>{repair.icno}</TableCell>
              <TableCell>{repair.mobile}</TableCell>
              <TableCell>{repair.userName}</TableCell>
              <TableCell>{repair.stbModel}</TableCell>
              <TableCell>{repair.issueDescription}</TableCell>
              <TableCell>{repair.status}</TableCell>
              <TableCell>{format(repair.createdAt, 'PP')}</TableCell>
              <TableCell>
                <Select
                  value={repair.status}
                  onValueChange={(value: STBRepair['status']) => updateStatus(repair.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default" disabled>Update Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

