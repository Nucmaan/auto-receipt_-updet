'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"

type AddNewComplaintFormProps = {
  onClose: () => void
}

export function AddNewComplaintForm({ onClose }: AddNewComplaintFormProps) {
  const [formData, setFormData] = useState({
    icno: '',
    mobile: '',
    wrongIcno: '',
    userName: '',
    description: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission, e.g., sending data to an API
    console.log('Submitting new complaint:', formData)
    onClose()
  }

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Add New Complaint</DialogTitle>
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
            <Label htmlFor="wrongIcno">Wrong ICno</Label>
            <Input id="wrongIcno" name="wrongIcno" value={formData.wrongIcno} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userName">User Name</Label>
            <Input id="userName" name="userName" value={formData.userName} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="bg-[#ff4e00] hover:bg-[#ff6a00]">Submit</Button>
        </div>
      </form>
    </div>
  )
}

