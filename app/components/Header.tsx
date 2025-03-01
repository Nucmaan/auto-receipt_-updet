'use client'

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickAddDialog } from "@/components/ui/quick-add-dialog";
import { 
  Bell, 
  Search, 
  Plus, 
  Settings, 
  LogOut, 
  User,
  ChevronDown,
  AlertCircle,
  MessageSquare,
  Tv,
  Send
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();
  const { user, setUser } = useAuth();

  const quickAddItems = [
    {
      title: "New Customer Issue",
      description: "Create a new customer issue ticket",
      icon: AlertCircle,
      color: "#FF6B6B",
      href: "/customer-issues"
    },
    {
      title: "New Complaint",
      description: "Register a new customer complaint",
      icon: MessageSquare,
      color: "#4ECDC4",
      href: "/complaints"
    },
    {
      title: "New STB Repair",
      description: "Create a new STB repair request",
      icon: Tv,
      color: "#45B7D1",
      href: "/stb-repair"
    },
    {
      title: "Send SMS",
      description: "Send a new SMS message",
      icon: Send,
      color: "#FFA07A",
      href: "/send-sms"
    }
  ];

  return (
    <>
      <div className="bg-white border-b">
        <div className="px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ff4e00]" />
              <Input 
                placeholder="Search (Ctrl+/)" 
                className="w-[280px] pl-9 h-10 bg-white border border-gray-200 focus:border-[#ff4e00] rounded-full"
              />
            </div>

            {/* Quick Add Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Quick Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-[300px] p-2 bg-white rounded-2xl shadow-lg border border-gray-100"
              >
                {quickAddItems.map((item) => (
                  <Link href={item.href} key={item.title}>
                    <DropdownMenuItem
                      className="flex items-start p-3 cursor-pointer rounded-xl hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      <div className="flex items-start w-full group">
                        <item.icon 
                          className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" 
                          style={{ color: item.color }} 
                        />
                        <div className="flex-1">
                          <div 
                            className="font-medium group-hover:text-[#ff4e00] transition-colors" 
                            style={{ color: item.color }}
                          >
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-[#fff5f2] rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <Bell className="h-5 w-5 text-[#ff4e00]" />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-[#ff4e00] rounded-full">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4e00] opacity-75" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-2xl">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <span className="font-medium">Notifications</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[#ff4e00] hover:bg-[#fff5f2] rounded-full"
                  >
                    Mark all as read
                  </Button>
                </div>
                <div className="py-2 px-4 text-sm text-gray-500">
                  No new notifications
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 px-4 h-10 hover:bg-[#fff5f2] rounded-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium">Abdirhman</span>
                      <span className="text-xs text-gray-500">IT</span>
                    </div>
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src="/logo.png"
                        alt="Profile"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                <DropdownMenuItem className="rounded-lg hover:bg-[#fff5f2] hover:text-[#ff4e00] focus:bg-[#fff5f2] focus:text-[#ff4e00]">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg hover:bg-[#fff5f2] hover:text-[#ff4e00] focus:bg-[#fff5f2] focus:text-[#ff4e00]">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setUser(null)} 
                  className="rounded-lg text-red-600 hover:bg-red-50 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <QuickAddDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Quick Add"
      >
        <div className="p-4">
          {/* Add your dialog content here */}
        </div>
      </QuickAddDialog>
    </>
  );
}

function NavTab({ icon, label, isActive }: { icon: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <button
      className={`
        flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors
        ${isActive 
          ? 'text-[#ff4e00] border-[#ff4e00]' 
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}
      `}
    >
      {icon}
      {label}
    </button>
  );
}

