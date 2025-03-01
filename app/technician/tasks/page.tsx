'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Search, Plus, CheckCircle, Filter, Clock, AlertTriangle, Calendar, MapPin, Phone, ChevronDown, X, Edit as EditIcon, AlertCircle, CheckCircle2, Sparkles, BarChart2 } from 'lucide-react'
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

type Task = {
  id: string
  technicianId: string
  description: string
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
  dueDate: Date
  customerIssueId: string
  customerName: string
  contactNumber: string
  region: string
  priority: 'Low' | 'Medium' | 'High'
  createdAt: Date
}

type Technician = {
  id: string
  name: string
  region: string
  avatar?: string
}

// Sample technicians
const technicians: Technician[] = [
  { id: '1', name: 'John Doe', region: 'North', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '2', name: 'Jane Smith', region: 'South', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: '3', name: 'Bob Johnson', region: 'East', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { id: '4', name: 'Alice Williams', region: 'West', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    status: 'Pending',
    priority: 'Medium',
    dueDate: new Date(),
    createdAt: new Date()
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('technicianTasks') || '[]');
    const parsedTasks = storedTasks.map((task: any) => ({
      ...task,
      dueDate: new Date(task.dueDate),
      createdAt: new Date(task.createdAt || Date.now())
    }));
    setTasks(parsedTasks);
  }, []);

  // Apply all filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || task.region === regionFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesRegion && matchesPriority;
  });

  // Sort tasks by status and due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const statusOrder = { 'Pending': 0, 'In Progress': 1, 'Completed': 2, 'Cancelled': 3 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    return a.dueDate.getTime() - b.dueDate.getTime();
  });

  // Mark task as completed
  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: 'Completed' } : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem('technicianTasks', JSON.stringify(updatedTasks));
    
    // Update performance metrics
    updateTechnicianPerformance(taskId);
    
    toast({
      title: "Task completed",
      description: "The task has been marked as completed and performance metrics updated.",
    });
  };

  // Update technician performance when task is completed
  const updateTechnicianPerformance = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.technicianId) return;
    
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    const newCompletedTask = {
      taskId: task.id,
      technicianId: task.technicianId,
      completedAt: new Date(),
      region: task.region,
      customerIssueId: task.customerIssueId
    };
    
    localStorage.setItem('completedTasks', JSON.stringify([...completedTasks, newCompletedTask]));
  };

  // Assign task to technician
  const assignTask = (taskId: string, technicianId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, technicianId, status: 'In Progress' } : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem('technicianTasks', JSON.stringify(updatedTasks));
    
    toast({
      title: "Task assigned",
      description: `Task has been assigned to ${technicians.find(t => t.id === technicianId)?.name}.`,
    });
  };

  // Handle input change for new task form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, isEditing = false) => {
    const { name, value } = e.target;
    
    if (isEditing && editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle date change for task
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    if (isEditing && editingTask) {
      setEditingTask({ ...editingTask, dueDate: new Date(e.target.value) });
    } else {
      setNewTask(prev => ({ ...prev, dueDate: new Date(e.target.value) }));
    }
  };

  // Create new task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskToAdd: Task = {
      id: `task-${Date.now()}`,
      technicianId: newTask.technicianId || '',
      description: newTask.description || '',
      status: 'Pending',
      dueDate: newTask.dueDate || new Date(),
      customerIssueId: '',
      customerName: newTask.customerName || '',
      contactNumber: newTask.contactNumber || '',
      region: newTask.region || '',
      priority: newTask.priority as 'Low' | 'Medium' | 'High',
      createdAt: new Date()
    };
    
    const updatedTasks = [taskToAdd, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem('technicianTasks', JSON.stringify(updatedTasks));
    
    // Reset form and close dialog
    setNewTask({
      status: 'Pending',
      priority: 'Medium',
      dueDate: new Date(),
      createdAt: new Date()
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Task created",
      description: "New task has been created successfully.",
    });
  };

  // Update existing task
  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      // Here you would typically make an API call to update the task
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? editingTask : task
      );
      setTasks(updatedTasks);
      setIsEditDialogOpen(false);
      toast({
        title: "Task updated successfully",
        description: "The task has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Open edit dialog with task data
  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  // Add this function to handle reports navigation
  const handleViewReports = () => {
    router.push('/technician/report');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8">
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-[#ff4e00]">Technician Tasks</h1>
            <p className="text-gray-600 text-lg mt-2">Track and resolve technician tasks efficiently</p>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-600">{tasks.filter(t => t.status === 'Pending').length} Open</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">{tasks.filter(t => t.status === 'In Progress').length} In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">{tasks.filter(t => t.status === 'Completed').length} Resolved</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleViewReports}
              className="h-11 px-4 rounded-xl border-2 border-gray-200 hover:border-[#ff4e00] hover:text-[#ff4e00] transition-all duration-200"
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              View Reports
            </Button>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="h-11 px-4 rounded-xl bg-[#ff4e00] hover:bg-[#e64600] text-white transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#fff8f5] rounded-xl">
              <Sparkles className="h-6 w-6 text-[#ff4e00]" />
            </div>
            <div>
              <p className="text-gray-600">Total Tasks</p>
              <h2 className="text-3xl font-bold mt-1">{tasks.length}</h2>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600 text-sm">Active tasks</span>
                <Button variant="link" className="text-[#ff4e00] p-0 h-auto text-sm font-medium">
                  View all
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fff8f5] rounded-3xl shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#ffede5] rounded-xl">
              <AlertCircle className="h-6 w-6 text-[#ff4e00]" />
            </div>
            <div>
              <p className="text-gray-600">Open Tasks</p>
              <h2 className="text-3xl font-bold mt-1">{tasks.filter(t => t.status === 'Pending').length}</h2>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600 text-sm">Require attention</span>
                <Button variant="link" className="text-[#ff4e00] p-0 h-auto text-sm font-medium">
                  View all
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f7ff] rounded-3xl shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#e1eeff] rounded-xl">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-600">In Progress</p>
              <h2 className="text-3xl font-bold mt-1">{tasks.filter(t => t.status === 'In Progress').length}</h2>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600 text-sm">Being handled</span>
                <Button variant="link" className="text-blue-500 p-0 h-auto text-sm font-medium">
                  View all
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f0fff7] rounded-3xl shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#e1fff0] rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-600">Resolved</p>
              <h2 className="text-3xl font-bold mt-1">{tasks.filter(t => t.status === 'Completed').length}</h2>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600 text-sm">Successfully completed</span>
                <Button variant="link" className="text-green-500 p-0 h-auto text-sm font-medium">
                  View all
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 border-gray-200 focus:ring-[#ff4e00] focus:border-[#ff4e00]"
            />
          </div>
          <Button className="bg-[#ff4e00] hover:bg-[#ff6a00] text-white h-10">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Table styling matches customer issues */}
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900">
                  Technician
                </TableHead>
                <TableHead className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                  Description
                </TableHead>
                <TableHead className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                  Status
                </TableHead>
                <TableHead className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                  Due Date
                </TableHead>
                <TableHead className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-gray-50">
                    <TableCell className="py-4 pl-4 pr-3">
                      {task.technicianId ? 
                        technicians.find(tech => tech.id === task.technicianId)?.name : 
                        "Not assigned"
                      }
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      {task.description}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <Badge 
                        className={
                          task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                          'bg-green-100 text-green-800 border-green-200'
                        }
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-4 text-gray-600">
                      {format(task.dueDate, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-gray-700 border-gray-300 hover:bg-gray-50"
                        onClick={() => openEditDialog(task)}
                      >
                        <EditIcon className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                    No tasks found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white max-w-2xl p-6 rounded-2xl">
          {editingTask && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#ff4e00]">Edit Task</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 hover:bg-gray-100"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <form onSubmit={handleUpdateTask} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Customer Name</Label>
                    <Input
                      value={editingTask.customerName}
                      onChange={(e) => setEditingTask({ ...editingTask, customerName: e.target.value })}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Contact Number</Label>
                    <Input
                      value={editingTask.contactNumber}
                      onChange={(e) => setEditingTask({ ...editingTask, contactNumber: e.target.value })}
                      className="h-10"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Select 
                      value={editingTask.status}
                      onValueChange={(value) => setEditingTask({ ...editingTask, status: value as Task['status'] })}
                    >
                      <SelectTrigger className="h-10 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <Input
                      type="date"
                      value={format(editingTask.dueDate, 'yyyy-MM-dd')}
                      onChange={(e) => setEditingTask({ ...editingTask, dueDate: new Date(e.target.value) })}
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                    className="h-10 px-4 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="h-10 px-4 rounded-lg bg-[#ff4e00] hover:bg-[#e64600] text-white"
                  >
                    Update Task
                  </Button>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white max-w-2xl p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#ff4e00]">New Task</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-8 w-8 hover:bg-gray-100"
              onClick={() => setIsAddDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleCreateTask} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Technician</Label>
                <Select 
                  value={newTask.technicianId} 
                  onValueChange={(value) => setNewTask({ ...newTask, technicianId: value })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    {technicians.map((tech) => (
                      <SelectItem key={tech.id} value={tech.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={tech.avatar} />
                            <AvatarFallback>{tech.name[0]}</AvatarFallback>
                          </Avatar>
                          {tech.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Priority</Label>
                <Select 
                  value={newTask.priority} 
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value as Task['priority'] })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Customer Name</Label>
                <Input
                  value={newTask.customerName}
                  onChange={(e) => setNewTask({ ...newTask, customerName: e.target.value })}
                  className="h-10"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Contact Number</Label>
                <Input
                  value={newTask.contactNumber}
                  onChange={(e) => setNewTask({ ...newTask, contactNumber: e.target.value })}
                  className="h-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Description</Label>
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Region</Label>
                <Select 
                  value={newTask.region} 
                  onValueChange={(value) => setNewTask({ ...newTask, region: value })}
                >
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Due Date</Label>
                <Input
                  type="date"
                  value={format(newTask.dueDate || new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value) })}
                  className="h-10"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
                className="h-10 px-4 rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="h-10 px-4 rounded-lg bg-[#ff4e00] hover:bg-[#e64600] text-white"
              >
                Create Task
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


