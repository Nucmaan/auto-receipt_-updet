"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Send, Upload, Filter, Search, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface Template {
  id: string;
  name: string;
  content: string;
  variables: string[];
}

interface SMSLog {
  id: string;
  recipient: string;
  message: string;
  template: string;
  status: string;
  sentAt: string;
  deliveredAt: string | null;
}

const templates: Template[] = [
  {
    id: "repair-update",
    name: "Repair Status Update",
    content: "Dear {customerName}, your repair request #{repairId} has been updated to {status}. Technician: {technicianName}. For support call {supportNumber}.",
    variables: ["customerName", "repairId", "status", "technicianName", "supportNumber"]
  },
  {
    id: "appointment",
    name: "Technician Appointment",
    content: "Dear {customerName}, your technician {technicianName} will arrive on {date} between {timeSlot}. Reference: #{ticketId}",
    variables: ["customerName", "technicianName", "date", "timeSlot", "ticketId"]
  },
  {
    id: "payment-reminder",
    name: "Payment Reminder",
    content: "Dear {customerName}, your payment of ${amount} for service #{serviceId} is due on {dueDate}. Please pay to avoid service interruption.",
    variables: ["customerName", "amount", "serviceId", "dueDate"]
  }
];

export default function SendSMSPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [logs, setLogs] = useState<SMSLog[]>([
    {
      id: "SMS001",
      recipient: "+252615123456",
      message: "Dear John, your repair #12345 is now Complete. Technician: Mike. For support call 12345.",
      template: "Repair Status Update",
      status: "Delivered",
      sentAt: "2025-02-19 10:30:00",
      deliveredAt: "2025-02-19 10:30:05"
    },
    {
      id: "SMS002",
      recipient: "+252615789012",
      message: "Dear Sarah, your technician Mike will arrive on Feb 20 between 2-4 PM. Reference: #T789",
      template: "Technician Appointment",
      status: "Pending",
      sentAt: "2025-02-19 11:15:00",
      deliveredAt: null
    }
  ]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.content);
      setVariables({});
      setIsTemplateDialogOpen(true);
    }
  };

  const handleVariableChange = (variable: string, value: string) => {
    setVariables(prev => {
      const newVariables = {
        ...prev,
        [variable]: value
      };
      
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        let updatedMessage = template.content;
        
        // Replace all variables in the message
        Object.entries(newVariables).forEach(([key, val]) => {
          const regex = new RegExp(`{${key}}`, 'g');
          updatedMessage = updatedMessage.replace(regex, val);
        });
        
        setMessage(updatedMessage);
      }

      return newVariables;
    });
  };

  const handleSendSMS = () => {
    const uniqueId = `SMS${Date.now().toString(36)}`;
    const newLog: SMSLog = {
      id: uniqueId,
      recipient,
      message,
      template: templates.find(t => t.id === selectedTemplate)?.name || "Custom",
      status: "Sent",
      sentAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      deliveredAt: null
    };

    setLogs(prevLogs => [newLog, ...prevLogs]);
    setRecipient("");
    setMessage("");
    setSelectedTemplate("");
    setVariables({});
  };

  function updateDashboardStats(count: number) {
    const event = new CustomEvent('statsUpdate', {
      detail: { 
        page: 'customer-issues', // or 'stb-repair', 'complaints', 'campaigns'
        count: count 
      }
    });
    window.dispatchEvent(event);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SMS Communication</h1>
          <p className="text-gray-600">Send and manage customer communications</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Send Message</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="template">Message Template</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom Message</SelectItem>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && isTemplateDialogOpen && (
              <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Fill Template Variables</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {templates.find(t => t.id === selectedTemplate)?.variables.map((variable) => (
                      <div key={variable} className="space-y-2">
                        <Label htmlFor={variable}>{variable}</Label>
                        <Input
                          id={variable}
                          value={variables[variable] || ""}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
                          placeholder={`Enter ${variable}`}
                        />
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setIsTemplateDialogOpen(false)}>
                      Done
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <div>
              <Label htmlFor="recipient">Recipient Number</Label>
              <Input
                id="recipient"
                placeholder="+252615XXXXXX"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="message">Message Content</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-32"
              />
            </div>

            <div className="flex gap-4">
              <Button
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={handleSendSMS}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline">
                
                <Upload className="h-4 w-4 mr-2" />
                Upload Recipients
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Message Templates</h2>
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-4 border rounded-lg hover:border-[#ff4e00] cursor-pointer transition-colors"
                onClick={() => handleTemplateChange(template.id)}
              >
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{template.content}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {template.variables.map((variable) => (
                    <span
                      key={variable}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Message Logs</h2>
          <div className="flex gap-4">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-40"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Delivered At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.recipient}</TableCell>
                  <TableCell className="max-w-md truncate">{log.message}</TableCell>
                  <TableCell>{log.template}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.status === "Delivered" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : log.status === "Failed" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        log.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : log.status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{log.sentAt}</TableCell>
                  <TableCell>{log.deliveredAt || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}