"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Plus, MoreVertical } from "lucide-react";
import Link from "next/link";
import { mockUsers } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function UsersListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProfile = (userId: string) => {
    router.push(`/dashboard/users/profile?id=${userId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users List</h1>
          <p className="text-gray-600">Manage and monitor user accounts</p>
        </div>
        <Button 
          onClick={() => router.push('/user/add-new')}
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            variants={itemVariants}
            className="group"
          >
            <Card className="overflow-hidden">
              <div 
                className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 relative"
                style={{
                  backgroundImage: `url(${user.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:bg-white/20"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="px-6 pb-6">
                <div className="flex justify-center -mt-12">
                  <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs">Department</p>
                    <p className="font-medium text-sm mt-1">{user.department}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs">Designation</p>
                    <p className="font-medium text-sm mt-1">{user.designation}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => handleViewProfile(user.id)}
                  variant="outline" 
                  className="w-full mt-6"
                >
                  View Profile
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}