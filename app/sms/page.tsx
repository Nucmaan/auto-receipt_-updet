'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DateRangePickerWithRange } from "@/components/ui/date-range-picker"

type SMS = {
  id: string
  recipient: string
  message: string
  status: 'Sent' | 'Failed'
  timestamp: string
}

type Campaign = {
  id: string
  name: string
  message: string
  targetSegment: string
  startDate: Date
  endDate: Date
  status: 'Scheduled' | 'In Progress' | 'Completed'
  messagesSent: number
  deliveryRate: number
}

const initialSMS: SMS[] = [
  {
    id: '1',
    recipient: '+1234567890',
    message: 'Your appointment is confirmed for tomorrow at 2 PM.',
    status: 'Sent',
    timestamp: '2023-06-10 10:30 AM'
  },
  {
    id: '2',
    recipient: '+9876543210',
    message: 'Your order has been shipped and will arrive in 2-3 business days.',
    status: 'Sent',
    timestamp: '2023-06-10 11:45 AM'
  },
]

const initialCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale',
    message: 'Don\'t miss our summer sale! 20% off on all products.',
    targetSegment: 'All Customers',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-07-15'),
    status: 'Scheduled',
    messagesSent: 0,
    deliveryRate: 0
  },
  {
    id: '2',
    name: 'Service Upgrade',
    message: 'Upgrade your plan now and get 3 months free!',
    targetSegment: 'Basic Plan Customers',
    startDate: new Date('2023-06-15'),
    endDate: new Date('2023-06-30'),
    status: 'In Progress',
    messagesSent: 5000,
    deliveryRate: 98.5
  },
]

const smsTemplates = [
  { id: '1', name: 'Appointment Reminder', content: 'Your appointment is scheduled for {date} at {time}.' },
  { id: '2', name: 'Order Confirmation', content: 'Your order #{orderNumber} has been confirmed and will be shipped soon.' },
  { id: '3', name: 'Payment Reminder', content: 'This is a reminder that your payment of ${amount} is due on {dueDate}.' },
]

export default function SMSPage() {
  const [sentSMS, setSentSMS] = useState<SMS[]>(initialSMS)
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({})

  const handleSendSMS = () => {
    if (recipient && message) {
      const newSMS: SMS = {
        id: Date.now().toString(),
        recipient,
        message,
        status: 'Sent',
        timestamp: new Date().toLocaleString()
      }
      setSentSMS([newSMS, ...sentSMS])
      setRecipient('')
      setMessage('')
    }
  }

  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = smsTemplates.find(template => template.id === templateId)
    if (selectedTemplate) {
      setMessage(selectedTemplate.content)
      setSelectedTemplate(templateId)
    }
  }

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const campaign: Campaign = {
      id: Date.now().toString(),
      ...newCampaign as Campaign,
      status: 'Scheduled',
      messagesSent: 0,
      deliveryRate: 0
    }
    setCampaigns([...campaigns, campaign])
    setNewCampaign({})
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">SMS Management</h1>
      <Tabs defaultValue="send-sms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="send-sms">Send SMS</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>
        <TabsContent value="send-sms">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {smsTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
                  rows={4}
                />
              </div>
              <Button onClick={handleSendSMS}>Send SMS</Button>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Sent Messages</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentSMS.map((sms) => (
                    <TableRow key={sms.id}>
                      <TableCell>{sms.recipient}</TableCell>
                      <TableCell className="max-w-xs truncate">{sms.message}</TableCell>
                      <TableCell>{sms.status}</TableCell>
                      <TableCell>{sms.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="campaigns">
          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create New Campaign</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCampaignSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                      id="campaignName"
                      value={newCampaign.name || ''}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaignMessage">Message</Label>
                    <Textarea
                      id="campaignMessage"
                      value={newCampaign.message || ''}
                      onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetSegment">Target Segment</Label>
                    <Input
                      id="targetSegment"
                      value={newCampaign.targetSegment || ''}
                      onChange={(e) => setNewCampaign({ ...newCampaign, targetSegment: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Campaign Duration</Label>
                    <DateRangePickerWithRange
                      date={{
                        from: newCampaign.startDate,
                        to: newCampaign.endDate
                      }}
                      setDate={(range) => setNewCampaign({
                        ...newCampaign,
                        startDate: range?.from,
                        endDate: range?.to
                      })}
                    />
                  </div>
                  <Button type="submit">Create Campaign</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Target Segment</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Messages Sent</TableHead>
                  <TableHead>Delivery Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.targetSegment}</TableCell>
                    <TableCell>{campaign.startDate.toLocaleDateString()}</TableCell>
                    <TableCell>{campaign.endDate.toLocaleDateString()}</TableCell>
                    <TableCell>{campaign.status}</TableCell>
                    <TableCell>{campaign.messagesSent}</TableCell>
                    <TableCell>{campaign.deliveryRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

