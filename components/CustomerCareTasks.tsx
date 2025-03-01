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

type Task = {
  id: string
  icno: string
  mobile: string
  userName: string
  technicianId: string
  district: string
  createdAt: Date
}

type Technician = {
  id: string;
  name: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    icno: '123456',
    mobile: '1234567890',
    userName: 'John Doe',
    technicianId: '1',
    district: 'North',
    createdAt: new Date('2023-06-01')
  },
  {
    id: '2',
    icno: '234567',
    mobile: '2345678901',
    userName: 'Alice Johnson',
    technicianId: '2',
    district: 'South',
    createdAt: new Date('2023-06-05')
  },
]

const technicians: Technician[] = [
  { id: '1', name: 'Jane Smith' },
  { id: '2', name: 'Bob Brown' },
  { id: '3', name: 'Alice Johnson' },
]

export function CustomerCareTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState<Partial<Task>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const task: Task = {
      id: Date.now().toString(),
      ...newTask as Task,
      createdAt: new Date()
    }
    setTasks([...tasks, task])
    setNewTask({})
  }

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleUpdate = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task))
  }

  const filteredTasks = tasks.filter(task => 
    (task.icno.includes(searchQuery) || 
    task.mobile.includes(searchQuery) ||
    task.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    technicians.find(tech => tech.id === task.technicianId)?.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!dateRange || (task.createdAt >= dateRange.from && task.createdAt <= dateRange.to))
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="Search by ICno, Mobile, User Name, or Technician"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <DateRangePickerWithRange date={dateRange} setDate={setDateRange} />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer Care Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icno">ICno</Label>
                  <Input id="icno" name="icno" value={newTask.icno || ''} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input id="mobile" name="mobile" value={newTask.mobile || ''} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userName">User Name</Label>
                  <Input id="userName" name="userName" value={newTask.userName || ''} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technicianId">Technician</Label>
                  <Select name="technicianId" value={newTask.technicianId || undefined} onValueChange={(value) => setNewTask({ ...newTask, technicianId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default" disabled>Select a technician</SelectItem>
                      {technicians.map((technician) => (
                        <SelectItem key={technician.id} value={technician.id}>{technician.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" name="district" value={newTask.district || ''} onChange={handleInputChange} required />
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
            <TableHead>Technician</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.icno}</TableCell>
              <TableCell>{task.mobile}</TableCell>
              <TableCell>{task.userName}</TableCell>
              <TableCell>{technicians.find(tech => tech.id === task.technicianId)?.name}</TableCell>
              <TableCell>{task.district}</TableCell>
              <TableCell>{format(task.createdAt, 'PP')}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        handleUpdate(task.id, newTask)
                      }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="icno">ICno</Label>
                            <Input id="icno" name="icno" defaultValue={task.icno} onChange={handleInputChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile</Label>
                            <Input id="mobile" name="mobile" defaultValue={task.mobile} onChange={handleInputChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="userName">User Name</Label>
                            <Input id="userName" name="userName" defaultValue={task.userName} onChange={handleInputChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="technicianId">Technician</Label>
                            <Select name="technicianId" defaultValue={task.technicianId || undefined} onValueChange={(value) => setNewTask({ ...newTask, technicianId: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a technician" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="default" disabled>Select a technician</SelectItem>
                                {technicians.map((technician) => (
                                  <SelectItem key={technician.id} value={technician.id}>{technician.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="district">District</Label>
                            <Input id="district" name="district" defaultValue={task.district} onChange={handleInputChange} required />
                          </div>
                        </div>
                        <Button type="submit">Update</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

