"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth, mockUsers } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

const departments = ["Design", "Development", "Marketing", "Sales"];
const languages = ["English", "Spanish", "French", "German"];

export default function UserProfilePage() {
  const searchParams = useSearchParams();
  const { user: currentUser } = useAuth();
  const userId = searchParams.get('id');
  
  const user = userId ? mockUsers.find(u => u.id === userId) : currentUser;
  
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [profileData, setProfileData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "(1) 2536 2561 2365",
    department: "Design",
    designation: "UI UX Designer",
    language: "English",
    bio: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    companyNews: false,
    pushNotification: true,
    weeklyNewsLetters: true,
    meetupsNearYou: false,
    ordersNotifications: true,
  });

  const [profileImage, setProfileImage] = useState<string | null>(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob"
  );

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.name,
        email: user.email,
        phone: "(1) 2536 2561 2365",
        department: "Design",
        designation: "UI UX Designer",
        language: "English",
        bio: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      });
    }
  }, [user]);

  const isOwnProfile = currentUser?.id === user?.id;

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users/list">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">View Profile</h1>
          <p className="text-gray-600">View and update user profile information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-rose-100 to-teal-100" />
            <div className="p-6">
              <div className="flex justify-center -mt-16">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                    <img
                      src={profileImage || ""}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    <Upload className="h-4 w-4 text-white" />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold">{profileData.fullName}</h3>
                <p className="text-gray-500">{profileData.email}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Personal Info</h4>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Full Name:</span>
                      <p className="font-medium">{profileData.fullName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{profileData.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone Number:</span>
                      <p className="font-medium">{profileData.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Department:</span>
                      <p className="font-medium">{profileData.department}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Designation:</span>
                      <p className="font-medium">{profileData.designation}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Languages:</span>
                      <p className="font-medium">{profileData.language}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                  <p className="mt-2 text-sm">{profileData.bio}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-2">
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                {isOwnProfile ? (
                  <>
                    <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
                    <TabsTrigger value="change-password">Change Password</TabsTrigger>
                    <TabsTrigger value="notification-settings">
                      Notification Settings
                    </TabsTrigger>
                  </>
                ) : (
                  <TabsTrigger value="view-profile" className="col-span-3">
                    View Profile
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="edit-profile" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, fullName: e.target.value })
                      }
                      placeholder="Enter Full Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">
                      Department <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={profileData.department}
                      onValueChange={(value) =>
                        setProfileData({ ...profileData, department: value })
                      }
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

                  <div className="space-y-2">
                    <Label htmlFor="designation">
                      Designation <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="designation"
                      value={profileData.designation}
                      onChange={(e) =>
                        setProfileData({ ...profileData, designation: e.target.value })
                      }
                      placeholder="Enter Designation Title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">
                      Language <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={profileData.language}
                      onValueChange={(value) =>
                        setProfileData({ ...profileData, language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Description</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    placeholder="Write description..."
                    className="h-32"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="change-password" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">
                      New Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      placeholder="Enter New Password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Update Password
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="notification-settings" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium">Company News</h4>
                      <p className="text-sm text-gray-500">
                        Get updates about company news and announcements
                      </p>
                    </div>
                    <Switch
                      checked={notifications.companyNews}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, companyNews: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-t">
                    <div>
                      <h4 className="font-medium">Push Notification</h4>
                      <p className="text-sm text-gray-500">
                        Receive push notifications on your devices
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNotification}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, pushNotification: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-t">
                    <div>
                      <h4 className="font-medium">Weekly News Letters</h4>
                      <p className="text-sm text-gray-500">
                        Receive weekly newsletters in your email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyNewsLetters}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, weeklyNewsLetters: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-t">
                    <div>
                      <h4 className="font-medium">Meetups Near you</h4>
                      <p className="text-sm text-gray-500">
                        Get notifications about meetups in your area
                      </p>
                    </div>
                    <Switch
                      checked={notifications.meetupsNearYou}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, meetupsNearYou: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-t">
                    <div>
                      <h4 className="font-medium">Orders Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Receive updates about your orders
                      </p>
                    </div>
                    <Switch
                      checked={notifications.ordersNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          ordersNotifications: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}