'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Task = {
  id: string
  technicianId: string
  description: string
  status: 'Pending' | 'In Progress' | 'Completed'
  dueDate: Date
}

type Technician = {
  id: string
  name: string
}

const initialTasks: Task[] = [
  { id: '1', technicianId: '1', description: 'Install new cable box', status: 'Pending', dueDate: new Date('2023-06-15') },
  { id: '2', technicianId: '2', description: 'Repair faulty connection', status: 'In Progress', dueDate: new Date('2023-06-16') },
]

const technicians: Technician[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
]

export default function TechnicianTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState<Partial<Task>>({})
  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const task: Task = {
      id: Date.now().toString(),
      ...newTask as Task,
      status: 'Pending',
    }
    setTasks([...tasks, task])
    setNewTask({})
  }

  const filteredTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    technicians.find(tech => tech.id === task.technicianId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Technician Tasks</h2>
        <p className="text-muted-foreground">
          Manage and track tasks assigned to technicians.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tasks</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#ff4e00] hover:bg-[#ff6a00]">
                <Plus className="mr-2 h-4 w-4" /> Add New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="technicianId">Technician</Label>
                  <Select name="technicianId" value={newTask.technicianId} onValueChange={(value) => setNewTask({ ...newTask, technicianId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a technician" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicians.map((technician) => (
                        <SelectItem key={technician.id} value={technician.id}>{technician.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" value={newTask.description || ''} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" name="dueDate" type="date" value={newTask.dueDate?.toISOString().split('T')[0] || ''} onChange={handleInputChange} required />
                </div>
                <Button type="submit" className="w-full bg-[#ff4e00] hover:bg-[#ff6a00]">Add Task</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks"
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Technician</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{technicians.find(tech => tech.id === task.technicianId)?.name}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={task.status === 'Pending' ? 'default' : task.status === 'In Progress' ? 'secondary' : 'success'}
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(task.dueDate, 'PPP')}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-[#ff4e00] border-[#ff4e00] hover:bg-[#ff4e00] hover:text-white">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

