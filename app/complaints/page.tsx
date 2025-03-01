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
import { Card } from "@/components/ui/card";
import { 
  Filter, 
  Plus, 
  Search, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  Sparkles,
  BarChart2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { QuickAddDialog } from "@/components/ui/quick-add-dialog";

interface Complaint {
  id: string;
  icno: string;
  wrongIcno: string;
  mobile: string;
  userName: string;
  status: string;
  createdAt: string;
}

const generateInitialData = () => {
  const baseData = [
    {
      id: "123456",
      icno: "765432",
      wrongIcno: "765433",
      mobile: "2345678901",
      userName: "John Doe",
      status: "Open",
      createdAt: "Jun 1, 2023"
    },
    {
      id: "234567",
      icno: "765432",
      wrongIcno: "765433",
      mobile: "2345678901",
      userName: "Alice Johnson",
      status: "Resolved",
      createdAt: "Jun 5, 2023"
    }
  ];

  const statuses = ["Open", "In Progress", "Resolved"];
  const additionalData = Array.from({ length: 30 }, (_, i) => ({
    id: `${300000 + i}`,
    icno: `${800000 + i}`,
    wrongIcno: `${800001 + i}`,
    mobile: "2345678901",
    userName: `User ${i + 1}`,
    status: statuses[i % 3],
    createdAt: `Jun ${(i % 28) + 1}, 2023`
  }));

  return [...baseData, ...additionalData];
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const glowVariants = {
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

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(generateInitialData());
  const [searchQuery, setSearchQuery] = useState("");
  const [newComplaint, setNewComplaint] = useState({
    icno: "",
    wrongIcno: "",
    mobile: "",
    userName: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("15");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const complaint: Complaint = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      ...newComplaint,
      status: "Open",
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    setComplaints([complaint, ...complaints]);
    setNewComplaint({
      icno: "",
      wrongIcno: "",
      mobile: "",
      userName: ""
    });
    setIsDialogOpen(false);
  };

  let filteredComplaints = complaints.filter(complaint => 
    complaint.icno.includes(searchQuery) ||
    complaint.wrongIcno.includes(searchQuery) ||
    complaint.mobile.includes(searchQuery) ||
    complaint.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortConfig.key) {
    filteredComplaints.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const totalItems = filteredComplaints.length;
  const totalPages = Math.ceil(totalItems / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const endIndex = startIndex + parseInt(itemsPerPage);
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

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

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#ff4e00]/10 to-[#ff8700]/10"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <div className="relative flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff4e00] to-[#ff8700] bg-clip-text text-transparent">
              Complaints Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Track and resolve customer complaints efficiently</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>{complaints.filter(c => c.status === "Open").length} Open</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>{complaints.filter(c => c.status === "In Progress").length} In Progress</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{complaints.filter(c => c.status === "Resolved").length} Resolved</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-medium text-[#ff4e00] border-2 border-[#ff4e00] hover:bg-[#ff4e00] hover:text-white transition-all duration-200"
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Analytics
            </motion.button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Complaint
                </motion.button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Complaint</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="icno">ICno</Label>
                      <Input
                        id="icno"
                        value={newComplaint.icno}
                        onChange={(e) => setNewComplaint({ ...newComplaint, icno: e.target.value })}
                        placeholder="Enter IC number"
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-[#ff4e00]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile</Label>
                      <Input
                        id="mobile"
                        value={newComplaint.mobile}
                        onChange={(e) => setNewComplaint({ ...newComplaint, mobile: e.target.value })}
                        placeholder="Enter mobile number"
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-[#ff4e00]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wrongIcno">Wrong ICno</Label>
                      <Input
                        id="wrongIcno"
                        value={newComplaint.wrongIcno}
                        onChange={(e) => setNewComplaint({ ...newComplaint, wrongIcno: e.target.value })}
                        placeholder="Enter wrong IC number"
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-[#ff4e00]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userName">User Name</Label>
                      <Input
                        id="userName"
                        value={newComplaint.userName}
                        onChange={(e) => setNewComplaint({ ...newComplaint, userName: e.target.value })}
                        placeholder="Enter user name"
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-[#ff4e00]"
                      />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200"
                  >
                    Submit Complaint
                  </motion.button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-200 border-2 hover:border-[#ff4e00]/20 rounded-2xl overflow-hidden relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#ff4e00]/5 to-transparent"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Complaints</h3>
                <div className="p-2 bg-[#ff4e00]/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-[#ff4e00]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{complaints.length}</p>
              <p className="text-sm text-gray-600 mt-2">This month</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Resolution Rate</span>
                  <span className="text-green-600 font-medium">94%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
          <Card className="p-6 bg-gradient-to-br from-white to-yellow-50 hover:shadow-lg transition-all duration-200 border-2 hover:border-yellow-200 rounded-2xl overflow-hidden relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Open</h3>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-yellow-600">
                {complaints.filter(c => c.status === "Open").length}
              </p>
              <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
              <div className="mt-4 pt-4 border-t border-yellow-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Response Time</span>
                  <span className="text-yellow-600 font-medium">2.4h</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
          <Card className="p-6 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 rounded-2xl overflow-hidden relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {complaints.filter(c => c.status === "In Progress").length}
              </p>
              <p className="text-sm text-blue-600 mt-2">Being handled</p>
              <div className="mt-4 pt-4 border-t border-blue-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Avg. Resolution</span>
                  <span className="text-blue-600 font-medium">1.2 days</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
          <Card className="p-6 bg-gradient-to-br from-white to-green-50 hover:shadow-lg transition-all duration-200 border-2 hover:border-green-200 rounded-2xl overflow-hidden relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Resolved</h3>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {complaints.filter(c => c.status === "Resolved").length}
              </p>
              <p className="text-sm text-green-600 mt-2">Last 7 days</p>
              <div className="mt-4 pt-4 border-t border-green-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="text-green-600 font-medium">98%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
          <div className="p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Complaints</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>
                <Button variant="outline" className="border-2 hover:border-[#ff4e00] hover:text-[#ff4e00] transition-colors">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("id")}>
                      <div className="flex items-center">
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("icno")}>
                      <div className="flex items-center">
                        ICno
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Wrong ICno</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("userName")}>
                      <div className="flex items-center">
                        User Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("status")}>
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort("createdAt")}>
                      <div className="flex items-center">
                        Created At
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {currentComplaints.map((complaint, index) => (
                      <motion.tr
                        key={complaint.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="group hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{complaint.id}</TableCell>
                        <TableCell>{complaint.icno}</TableCell>
                        <TableCell>{complaint.wrongIcno}</TableCell>
                        <TableCell>{complaint.mobile}</TableCell>
                        <TableCell>{complaint.userName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {complaint.status === "Open" ? (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            ) : complaint.status === "In Progress" ? (
                              <Clock className="h-4 w-4 text-blue-500" />
                            ) : complaint.status === "Resolved" ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              complaint.status === "Open"
                                ? "bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200"
                                : complaint.status === "In Progress"
                                ? "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
                                : complaint.status === "Resolved"
                                ? "bg-green-100 text-green-700 group-hover:bg-green-200"
                                : "bg-red-100 text-red-700 group-hover:bg-red-200"
                            }`}>
                              {complaint.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{complaint.createdAt}</TableCell>
                        <TableCell>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-[#ff4e00] hover:text-white hover:bg-[#ff4e00] border-2 border-[#ff4e00] transition-all duration-200"
                          >
                            View Details
                          </motion.button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
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
      </motion.div>

      <QuickAddDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Add New Complaint"
      >
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icno">ICno</Label>
              <Input
                id="icno"
                value={newComplaint.icno}
                onChange={(e) => setNewComplaint({ ...newComplaint, icno: e.target.value })}
                placeholder="Enter IC number"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#ff4e00]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                value={newComplaint.mobile}
                onChange={(e) => setNewComplaint({ ...newComplaint, mobile: e.target.value })}
                placeholder="Enter mobile number"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#ff4e00]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wrongIcno">Wrong ICno</Label>
              <Input
                id="wrongIcno"
                value={newComplaint.wrongIcno}
                onChange={(e) => setNewComplaint({ ...newComplaint, wrongIcno: e.target.value })}
                placeholder="Enter wrong IC number"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#ff4e00]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                value={newComplaint.userName}
                onChange={(e) => setNewComplaint({ ...newComplaint, userName: e.target.value })}
                placeholder="Enter user name"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#ff4e00]"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200"
          >
            Submit Complaint
          </motion.button>
        </form>
      </QuickAddDialog>
    </motion.div>
  );
}