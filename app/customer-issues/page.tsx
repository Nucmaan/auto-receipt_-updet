"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Filter, 
  Plus, 
  Search, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle,
  BarChart2,
  Sparkles,
  MapPin,
  Wrench,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { QuickAddDialog } from "@/components/ui/quick-add-dialog";
import { useToast } from "@/components/ui/use-toast";

// Define the arrays with proper types
const categories: string[] = [
  "Technical",
  "Billing",
  "Service",
  "Network",
  "Hardware",
];

const priorities: string[] = [
  "High",
  "Medium",
  "Low",
];

const technicians: string[] = [
  "John Smith",
  "Sarah Wilson",
  "Mike Johnson",
  "Emily Brown",
];

const districts: string[] = [
  "North District",
  "South District",
  "East District",
  "West District",
];

interface Issue {
  id: string;
  customerName: string;
  mobile: string;
  description: string;
  category: string;
  priority: string;
  technician: string;
  district: string;
  createdAt: string;
  status: string;
}

interface NewIssue {
  customerName: string;
  mobile: string;
  description: string;
  category: string;
  priority: string;
  technician: string;
  district: string;
}

const generateSampleIssues = () => {
  const issues: Issue[] = [];
  const statuses = ["Open", "In Progress", "Resolved", "Closed"];
  const priorities = ["High", "Medium", "Low"];
  const categories = ["Technical", "Billing", "Service", "Network"];

  for (let i = 1; i <= 50; i++) {
    issues.push({
      id: `ISS${String(i).padStart(3, '0')}`,
      customerName: `Customer ${i}`,
      mobile: `061${Math.floor(1000000 + Math.random() * 9000000)}`,
      description: `Sample issue description ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      technician: technicians[Math.floor(Math.random() * technicians.length)],
      district: districts[Math.floor(Math.random() * districts.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  return issues;
};

export default function CustomerIssuesPage() {
  const shouldReduceMotion = useReducedMotion();
  const [issues, setIssues] = useState<Issue[]>(generateSampleIssues());
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("15");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const [newIssue, setNewIssue] = useState<NewIssue>({
    customerName: '',
    mobile: '',
    description: '',
    category: '',
    priority: '',
    technician: '',
    district: '',
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const issue: Issue = {
      id: `ISS${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      ...newIssue,
      createdAt: new Date().toISOString().split('T')[0],
      status: "Open"
    };
    
    setIssues([issue, ...issues]);
    
    setNewIssue({
      customerName: "",
      mobile: "",
      description: "",
      category: "",
      priority: "",
      technician: "",
      district: ""
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Issue created",
      description: "The issue has been created and added to technician tasks.",
    });
    
    createTechnicianTask(issue);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: shouldReduceMotion ? 0 : 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  const glowVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { duration: 0.1 }
    }
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  let filteredIssues = issues.filter(issue => 
    issue.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.mobile.includes(searchQuery) ||
    issue.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortConfig.key) {
    filteredIssues.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const totalItems = filteredIssues.length;
  const totalPages = Math.ceil(totalItems / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const endIndex = startIndex + parseInt(itemsPerPage);
  const currentIssues = filteredIssues.slice(startIndex, endIndex);

  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const MotionDiv = motion.div;
  const MotionTr = motion.tr;

  const createTechnicianTask = async (issue: Issue) => {
    const task = {
      id: `task-${Date.now()}`,
      technicianId: '',
      description: `${issue.category}: ${issue.description}`,
      status: 'Pending',
      dueDate: new Date(Date.now() + 86400000),
      customerIssueId: issue.id,
      customerName: issue.customerName,
      contactNumber: issue.mobile,
      region: issue.district,
      priority: issue.priority
    };
    
    const existingTasks = JSON.parse(localStorage.getItem('technicianTasks') || '[]');
    localStorage.setItem('technicianTasks', JSON.stringify([...existingTasks, task]));
  };

  const assignToTechnician = (issueId: string, technicianId: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: 'Assigned', technician: technicianId } 
        : issue
    ));
    
    const existingTasks = JSON.parse(localStorage.getItem('technicianTasks') || '[]');
    const updatedTasks = existingTasks.map((task: any) => 
      task.customerIssueId === issueId 
        ? { ...task, technicianId, status: 'In Progress' } 
        : task
    );
    localStorage.setItem('technicianTasks', JSON.stringify(updatedTasks));
    
    toast({
      title: "Issue assigned",
      description: "The issue has been assigned to a technician.",
    });
  };

  return (
    <MotionDiv 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
        {!shouldReduceMotion && (
          <MotionDiv 
            className="absolute inset-0 bg-gradient-to-r from-[#ff4e00]/10 to-[#ff8700]/10"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
        )}
        <div className="relative flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff4e00] to-[#ff8700] bg-clip-text text-transparent">
              Customer Issues
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Track and resolve customer issues efficiently</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>{issues.filter(i => i.status === "Open").length} Open</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>{issues.filter(i => i.status === "In Progress").length} In Progress</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{issues.filter(i => i.status === "Resolved").length} Resolved</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-medium text-[#ff4e00] border-2 border-[#ff4e00] hover:bg-[#ff4e00] hover:text-white transition-all duration-200"
            >
              View Reports
              <BarChart2 className="w-4 h-4 ml-2" />
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200 shadow-lg hover:shadow-xl">
                  New Issue
                  <Plus className="w-4 h-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white rounded-lg shadow-lg p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-[#ff4e00]">Create New Issue</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        value={newIssue.customerName}
                        onChange={(e) => setNewIssue(prev => ({ ...prev, customerName: e.target.value }))}
                        className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        value={newIssue.mobile}
                        onChange={(e) => setNewIssue({ ...newIssue, mobile: e.target.value })}
                        className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Issue Description</Label>
                    <Textarea
                      id="description"
                      value={newIssue.description}
                      onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                      className="mt-2 min-h-[100px] rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4"
                      placeholder="Enter issue description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newIssue.category}
                        onValueChange={(value) => setNewIssue(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-400 bg-white text-base px-4">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent 
                          className="bg-white border-[2px] rounded-[8px] shadow-sm"
                          align="start"
                        >
                          {categories.map((category) => (
                            <SelectItem 
                              key={category} 
                              value={category}
                              className="focus:bg-gray-50 hover:bg-gray-50 cursor-pointer text-base"
                            >
                              <span className="text-gray-900">{category}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newIssue.priority}
                        onValueChange={(value) => setNewIssue(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-400 bg-white text-base px-4">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent 
                          className="bg-white border-[2px] rounded-[8px] shadow-sm"
                          align="start"
                        >
                          {priorities.map((priority) => (
                            <SelectItem 
                              key={priority} 
                              value={priority}
                              className="focus:bg-gray-50 hover:bg-gray-50 cursor-pointer text-base"
                            >
                              <span className="text-gray-900">{priority}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="technician">Assign Technician</Label>
                      <Select
                        value={newIssue.technician}
                        onValueChange={(value) => setNewIssue(prev => ({ ...prev, technician: value }))}
                      >
                        <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-400 bg-white text-base px-4">
                          <SelectValue placeholder="Select technician" />
                        </SelectTrigger>
                        <SelectContent 
                          className="bg-white border-[2px] rounded-[8px] shadow-sm"
                          align="start"
                        >
                          {technicians.map((technician) => (
                            <SelectItem 
                              key={technician} 
                              value={technician}
                              className="focus:bg-gray-50 hover:bg-gray-50 cursor-pointer text-base"
                            >
                              <span className="text-gray-900">{technician}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Select
                        value={newIssue.district}
                        onValueChange={(value) => setNewIssue(prev => ({ ...prev, district: value }))}
                      >
                        <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-400 bg-white text-base px-4">
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent 
                          className="bg-white border-[2px] rounded-[8px] shadow-sm"
                          align="start"
                        >
                          {districts.map((district) => (
                            <SelectItem 
                              key={district} 
                              value={district}
                              className="focus:bg-gray-50 hover:bg-gray-50 cursor-pointer text-base"
                            >
                              <span className="text-gray-900">{district}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-2 border-gray-300 hover:bg-gray-100">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#ff4e00] hover:bg-[#e64600] text-white">
                      Create Issue
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <MotionDiv 
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-4"
      >
        <MotionDiv 
          variants={itemVariants}
          whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
        >
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-200 border-2 hover:border-[#ff4e00]/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[#ff4e00]/10">
                <Sparkles className="h-5 w-5 text-[#ff4e00]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Issues</p>
                <h3 className="text-2xl font-bold">{issues.length}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Active cases</span>
              <span className="text-[#ff4e00] font-medium">View all</span>
            </div>
          </Card>
        </MotionDiv>

        <MotionDiv 
          variants={itemVariants}
          whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
        >
          <Card className="p-6 bg-gradient-to-br from-white to-yellow-50 hover:shadow-lg transition-all duration-200 border-2 hover:border-yellow-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Open Issues</p>
                <h3 className="text-2xl font-bold">{issues.filter(i => i.status === "Open").length}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Require attention</span>
              <span className="text-yellow-600 font-medium">View all</span>
            </div>
          </Card>
        </MotionDiv>

        <MotionDiv 
          variants={itemVariants}
          whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
        >
          <Card className="p-6 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <h3 className="text-2xl font-bold">{issues.filter(i => i.status === "In Progress").length}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Being handled</span>
              <span className="text-blue-600 font-medium">View all</span>
            </div>
          </Card>
        </MotionDiv>

        <MotionDiv 
          variants={itemVariants}
          whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
        >
          <Card className="p-6 bg-gradient-to-br from-white to-green-50 hover:shadow-lg transition-all duration-200 border-2 hover:border-green-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <h3 className="text-2xl font-bold">{issues.filter(i => i.status === "Resolved").length}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Successfully completed</span>
              <span className="text-green-600 font-medium">View all</span>
            </div>
          </Card>
        </MotionDiv>
      </MotionDiv>

      <MotionDiv variants={itemVariants}>
        <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
          <div className="p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Issue Tracker</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("id")}>
                      <div className="flex items-center">
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("customerName")}>
                      <div className="flex items-center">
                        Customer
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("createdAt")}>
                      <div className="flex items-center">
                        Created At
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("status")}>
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentIssues.map((issue, index) => (
                    <MotionTr
                      key={issue.id}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="show"
                      transition={{ delay: shouldReduceMotion ? 0 : index * 0.02 }}
                      className="group hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{issue.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{issue.customerName}</div>
                          <div className="text-sm text-gray-500">{issue.mobile}</div>
                        </div>
                      </TableCell>
                      <TableCell>{issue.category}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          issue.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : issue.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {issue.priority}
                        </span>
                      </TableCell>
                      <TableCell>{issue.technician}</TableCell>
                      <TableCell>{issue.district}</TableCell>
                      <TableCell>{issue.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {issue.status === "Open" ? (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          ) : issue.status === "In Progress" ? (
                            <Clock className="h-4 w-4 text-blue-500" />
                          ) : issue.status === "Resolved" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            issue.status === "Open"
                              ? "bg-yellow-100 text-yellow-800"
                              : issue.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : issue.status === "Resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {issue.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#ff4e00] hover:text-[#e64600] hover:bg-[#fff8f5]"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </MotionTr>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <Label className="text-sm text-gray-600">Show</Label>
                <Select
                  value={itemsPerPage}
                  onValueChange={(value) => {
                    setItemsPerPage(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[100px] bg-white border-2 focus:ring-2 focus:ring-[#ff4e00] transition-all duration-200">
                    <SelectValue placeholder="15" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-sm text-gray-600">entries</Label>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="border-2 hover:border-[#ff4e00] hover:text-[#ff4e00] transition-colors"
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-2 hover:border-[#ff4e00] hover:text-[#ff4e00] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(number)}
                    className={currentPage === number 
                      ? "bg-[#ff4e00] hover:bg-[#e64600] text-white"
                      : "border-2 hover:border-[#ff4e00] hover:text-[#ff4e00] transition-colors"}
                  >
                    {number}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-2 hover:border-[#ff4e00] hover:text-[#ff4e00] transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="border-2 hover:border-[#ff4e00] hover:text-[#ff4e00] transition-colors"
                >
                  Last
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
              </div>
            </div>
          </div>
        </Card>
      </MotionDiv>
    </MotionDiv>
  );
}