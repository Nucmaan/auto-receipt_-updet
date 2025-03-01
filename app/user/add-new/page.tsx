"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const departments = [
  "HR",
  "Development",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Operations"
];

const designations = [
  "Manager",
  "Team Lead",
  "Senior Developer",
  "UI/UX Designer",
  "Frontend Developer",
  "Backend Developer",
  "HR Executive",
  "Marketing Specialist"
];

export default function AddUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    description: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ ...formData, profileImage });
    router.push('/dashboard/users/list');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users/list">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add New User</h1>
          <p className="text-gray-600">Create a new user account</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center">
              <Label className="text-lg mb-4">Profile Image</Label>
              <div className="relative group">
                <div className={`w-32 h-32 rounded-full overflow-hidden border-2 border-dashed ${profileImage ? 'border-transparent' : 'border-gray-300'} flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors`}>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Upload Photo</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {profileImage && (
                  <div className="absolute bottom-0 right-0">
                    <div className="w-8 h-8 rounded-full bg-[#ff4e00] text-white flex items-center justify-center">
                      <Upload className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter Full Name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="department">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="designation">
                    Designation <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.designation}
                    onValueChange={(value) => setFormData({ ...formData, designation: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map((desig) => (
                        <SelectItem key={desig} value={desig}>
                          {desig}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Write description..."
                    className="h-24"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/dashboard/users/list">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-[#ff4e00] hover:bg-[#e64600] text-white">
                Save
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}