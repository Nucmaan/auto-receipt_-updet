"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search, Filter, ArrowUpDown, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface STBRepair {
  id: string;
  deviceId: string;
  customerName: string;
  contactNumber: string;
  deviceType: 'STB' | 'STP';
  issue: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  technician: string;
  createdAt: Date;
}

interface NewRepair {
  deviceId: string;
  icCard: string;
  customerName: string;
  contactNumber: string;
  deviceType: 'STB' | 'STP';
  issue: string;
  issueType: string;
  priority: 'Low' | 'Medium' | 'High';
  technician: string;
  district: string;
}

const priorities = [
  { value: "Low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "Medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "High", label: "High", color: "bg-red-100 text-red-800" },
];

const deviceTypes = [
  { value: "STB", label: "Set-Top Box" },
  { value: "STP", label: "Set-Top Platform" },
];

const issueTypes = [
  { value: "no_signal", label: "No Signal" },
  { value: "no_power", label: "No Power" },
  { value: "decryption_failed", label: "Decryption Failed" },
  { value: "smart_card_failed", label: "Smart Card Failed" },
  { value: "hdmi_av_problem", label: "HDMI/AV Problem" },
  { value: "network", label: "Network" },
  { value: "remote_button_problem", label: "Remote Button Problem" },
];

const districts = [
  { value: "north", label: "North District" },
  { value: "south", label: "South District" },
  { value: "east", label: "East District" },
  { value: "west", label: "West District" },
  { value: "central", label: "Central District" },
];

const technicians = [
  { value: "mike_johnson", label: "Mike Johnson" },
  { value: "sarah_lee", label: "Sarah Lee" },
  { value: "john_smith", label: "John Smith" },
  { value: "lisa_wong", label: "Lisa Wong" },
];

export default function STBRepairPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newRepair, setNewRepair] = useState<NewRepair>({
    deviceId: '',
    icCard: '',
    customerName: '',
    contactNumber: '',
    deviceType: 'STB',
    issue: '',
    issueType: '',
    priority: 'Medium',
    technician: '',
    district: '',
  });

  const [repairs, setRepairs] = useState<STBRepair[]>([
    {
      id: 'REP001',
      deviceId: 'STB-2024-001',
      customerName: 'John Smith',
      contactNumber: '0612021386',
      deviceType: 'STB',
      issue: 'No signal display',
      status: 'Pending',
      priority: 'High',
      technician: 'Mike Johnson',
      createdAt: new Date('2024-02-25'),
    },
    // Add more sample repairs...
  ]);

  const handleCreateRepair = () => {
    const repairToAdd: STBRepair = {
      deviceId: newRepair.deviceId,
      customerName: newRepair.customerName,
      contactNumber: newRepair.contactNumber,
      deviceType: newRepair.deviceType,
      issue: newRepair.issue,
      priority: newRepair.priority,
      technician: newRepair.technician,
      id: Date.now().toString(),
      status: 'Pending',
      createdAt: new Date(),
    };

    setRepairs(prev => [...prev, repairToAdd]);
    setIsDialogOpen(false);
    setNewRepair({
      deviceId: '',
      icCard: '',
      customerName: '',
      contactNumber: '',
      deviceType: 'STB',
      issue: '',
      issueType: '',
      priority: 'Medium',
      technician: '',
      district: '',
    });
  };

  // Calculate repair statistics
  const pendingRepairs = repairs.filter(r => r.status === 'Pending').length;
  const inProgressRepairs = repairs.filter(r => r.status === 'In Progress').length;
  const resolvedRepairs = repairs.filter(r => r.status === 'Resolved').length;
  const totalRepairs = repairs.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[#ff4e00] text-4xl font-bold">STP/STB Repairs</h1>
            <p className="text-gray-600 mt-2">Track and manage device repairs efficiently</p>
            
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-gray-600">{pendingRepairs} Open</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-gray-600">{inProgressRepairs} In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-gray-600">{resolvedRepairs} Resolved</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-medium text-[#ff4e00] border-2 border-[#ff4e00] hover:bg-[#ff4e00] hover:text-white transition-all duration-200"
            >
              View Reports
            </Button>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Repair
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-[#ff4e00] text-xl">⚡</span>
            </div>
            <div>
              <p className="text-gray-600">Total Issues</p>
              <h2 className="text-4xl font-bold mt-1">{totalRepairs}</h2>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600">Active cases</p>
            <Button variant="link" className="text-[#ff4e00] p-0">View all</Button>
          </div>
        </Card>

        <Card className="p-6 border rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⚠️</span>
            </div>
            <div>
              <p className="text-gray-600">Open Issues</p>
              <h2 className="text-4xl font-bold mt-1">{pendingRepairs}</h2>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600">Require attention</p>
            <Button variant="link" className="text-yellow-600 p-0">View all</Button>
          </div>
        </Card>

        <Card className="p-6 border rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-blue-600 text-xl">🔄</span>
            </div>
            <div>
              <p className="text-gray-600">In Progress</p>
              <h2 className="text-4xl font-bold mt-1">{inProgressRepairs}</h2>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600">Being handled</p>
            <Button variant="link" className="text-blue-600 p-0">View all</Button>
          </div>
        </Card>

        <Card className="p-6 border rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div>
              <p className="text-gray-600">Resolved</p>
              <h2 className="text-4xl font-bold mt-1">{resolvedRepairs}</h2>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600">Successfully completed</p>
            <Button variant="link" className="text-green-600 p-0">View all</Button>
          </div>
        </Card>
      </div>

      {/* Repair Tracker */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Repair Tracker</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search repairs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 w-[300px] rounded-lg border-2"
              />
            </div>
            <Button variant="outline" className="h-12 px-4 rounded-lg border-2">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Repairs Table */}
        <div className="bg-white rounded-xl border shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    ID <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    Customer <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="text-left p-4 font-medium text-gray-600">Device Type</th>
                <th className="text-left p-4 font-medium text-gray-600">Priority</th>
                <th className="text-left p-4 font-medium text-gray-600">Technician</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    Created At <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="text-left p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {repairs.map((repair) => (
                <tr key={repair.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{repair.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{repair.customerName}</p>
                      <p className="text-sm text-gray-500">{repair.contactNumber}</p>
                    </div>
                  </td>
                  <td className="p-4">{repair.deviceType}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      repair.priority === 'High' ? 'bg-red-100 text-red-800' :
                      repair.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {repair.priority}
                    </span>
                  </td>
                  <td className="p-4">{repair.technician}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      repair.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      repair.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {repair.status}
                    </span>
                  </td>
                  <td className="p-4">{repair.createdAt.toLocaleDateString()}</td>
                  <td className="p-4">
                    <Button variant="outline" className="text-[#ff4e00] border-[#ff4e00] rounded-lg">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Repair Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white p-6">
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-2xl font-semibold text-[#ff4e00]">
              Create New Repair
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsDialogOpen(false)}
              className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="deviceId" className="text-base font-semibold">
                Device ID
              </Label>
              <Input
                id="deviceId"
                value={newRepair.deviceId}
                onChange={(e) => setNewRepair(prev => ({ ...prev, deviceId: e.target.value }))}
                className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4"
                placeholder="Enter device ID"
              />
            </div>

            <div>
              <Label htmlFor="icCard" className="text-base font-semibold">
                IC Card
              </Label>
              <Input
                id="icCard"
                value={newRepair.icCard}
                onChange={(e) => setNewRepair(prev => ({ ...prev, icCard: e.target.value }))}
                className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4"
                placeholder="Enter IC card number"
              />
            </div>

            <div>
              <Label htmlFor="customerName" className="text-base font-semibold">
                Customer Name
              </Label>
              <Input
                id="customerName"
                value={newRepair.customerName}
                onChange={(e) => setNewRepair(prev => ({ ...prev, customerName: e.target.value }))}
                className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4"
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <Label htmlFor="contactNumber" className="text-base font-semibold">
                Customer Telephone
              </Label>
              <Input
                id="contactNumber"
                value={newRepair.contactNumber}
                onChange={(e) => setNewRepair(prev => ({ ...prev, contactNumber: e.target.value }))}
                className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4"
                placeholder="Enter contact number"
              />
            </div>

            <div>
              <Label htmlFor="deviceType" className="text-base font-semibold">
                Device Type
              </Label>
              <Select
                value={newRepair.deviceType}
                onValueChange={(value) => setNewRepair(prev => ({ ...prev, deviceType: value as 'STB' | 'STP' }))}
              >
                <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  {deviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="district" className="text-base font-semibold">
                District
              </Label>
              <Select
                value={newRepair.district}
                onValueChange={(value) => setNewRepair(prev => ({ ...prev, district: value }))}
              >
                <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.value} value={district.value}>
                      {district.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="issueType" className="text-base font-semibold">
                Issue Type
              </Label>
              <Select
                value={newRepair.issueType}
                onValueChange={(value) => setNewRepair(prev => ({ ...prev, issueType: value }))}
              >
                <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority" className="text-base font-semibold">
                Priority
              </Label>
              <Select
                value={newRepair.priority}
                onValueChange={(value) => setNewRepair(prev => ({ ...prev, priority: value as 'Low' | 'Medium' | 'High' }))}
              >
                <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="technician" className="text-base font-semibold">
                Technician
              </Label>
              <Select
                value={newRepair.technician}
                onValueChange={(value) => setNewRepair(prev => ({ ...prev, technician: value }))}
              >
                <SelectTrigger className="mt-2 h-12 rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4">
                  <SelectValue placeholder="Assign technician" />
                </SelectTrigger>
                <SelectContent>
                  {technicians.map((tech) => (
                    <SelectItem key={tech.value} value={tech.value}>
                      {tech.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="issue" className="text-base font-semibold">
                Issue Description
              </Label>
              <Textarea
                id="issue"
                value={newRepair.issue}
                onChange={(e) => setNewRepair(prev => ({ ...prev, issue: e.target.value }))}
                className="mt-2 min-h-[100px] rounded-[8px] border-[2px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 text-base px-4 py-3"
                placeholder="Describe the issue"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="h-12 px-6 rounded-lg border-2 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateRepair}
              className="h-12 px-6 rounded-lg bg-[#ff4e00] hover:bg-[#cc3e00] text-white"
            >
              Create Repair
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

