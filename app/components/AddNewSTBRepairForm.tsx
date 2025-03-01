'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type AddNewSTBRepairFormProps = {
  onClose: () => void
  technicians?: { id: string; name: string }[]
}

export function AddNewSTBRepairForm({ onClose, technicians = [] }: AddNewSTBRepairFormProps) {
  const [formData, setFormData] = useState({
    icno: '',
    mobile: '',
    userName: '',
    stbModel: '',
    issueDescription: '',
    technicianId: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, technicianId: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission, e.g., sending data to an API
    console.log('Submitting new STB repair:', formData)
    onClose()
  }

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg">
      <DialogHeader>
        <DialogTitle>Add New STB Repair</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="icno">ICno</Label>
            <Input id="icno" name="icno" value={formData.icno} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile</Label>
            <Input id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userName">User Name</Label>
            <Input id="userName" name="userName" value={formData.userName} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stbModel">STB Model</Label>
            <Input id="stbModel" name="stbModel" value={formData.stbModel} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="technicianId">Technician</Label>
            <Select name="technicianId" value={formData.technicianId} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a technician" />
              </SelectTrigger>
              <SelectContent>
                {technicians.length > 0 ? (
                  technicians.map((technician) => (
                    <SelectItem key={technician.id} value={technician.id}>{technician.name}</SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-technicians">No technicians available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="issueDescription">Issue Description</Label>
          <Textarea id="issueDescription" name="issueDescription" value={formData.issueDescription} onChange={handleInputChange} required />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="bg-[#ff4e00] hover:bg-[#ff6a00]">Submit</Button>
        </div>
      </form>
    </div>
  )
}

