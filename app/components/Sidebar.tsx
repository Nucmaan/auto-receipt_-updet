'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  CreditCard,
  Users,
  MessageSquare,
  Tv2,
  Send,
  BarChart3,
  Calendar,
  Wrench,
  LogOut,
  ChevronDown,
  Grid,
  List,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react'
import { useAuth } from "@/lib/auth"

interface SubMenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  href: string;
  badge?: string;
  submenu?: SubMenuItem[];
}

const mainRoutes: MenuItem[] = [
  {
    icon: LayoutDashboard,
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: CreditCard,
    name: 'Payments',
    href: '/payments',
  },
  {
    icon: Users,
    name: 'Customer Issues',
    href: '/customer-issues',
  },
  {
    icon: MessageSquare,
    name: 'Complaints',
    href: '/complaints',
  },
  {
    icon: Tv2,
    name: 'STB Repair',
    href: '/stb-repair',
  },
  {
    icon: Send,
    name: 'Send SMS',
    href: '/send-sms',
  },
  {
    icon: Calendar,
    name: 'Scheduler',
    href: '/scheduler',
  },
  {
    icon: Wrench,
    name: 'Technician',
    href: '/technician',
    submenu: [
      { name: 'Scheduler Region', href: '/technician/scheduler-region' },
      { name: 'Tasks', href: '/technician/tasks' },
      { name: 'Report', href: '/technician/report' },
    ],
  },
  {
    icon: Users,
    name: 'User',
    href: '/user',
    submenu: [
      { name: 'Lists', href: '/user/lists', icon: User },
      { name: 'Add New', href: '/user/add-new', icon: UserPlus },
      { name: 'Profile', href: '/user/profile', icon: User },
    ],
  },
]

const sidebarVariants = {
  expanded: { width: "256px" },
  collapsed: { width: "80px" }
}

const menuItemVariants = {
  expanded: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  collapsed: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

const headerVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  collapsed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
}

const logoVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
}

export default function Sidebar() {
  const [expanded, setExpanded] = React.useState(true)
  const [isUsersOpen, setIsUsersOpen] = React.useState(false)
  const [isStbOpen, setIsStbOpen] = React.useState(false)
  const [isTechnicianOpen, setIsTechnicianOpen] = React.useState(false)
  const [isUserOpen, setIsUserOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { setUser } = useAuth()

  // Automatically open Technician dropdown if we're on a technician subpage
  React.useEffect(() => {
    if (pathname.startsWith('/technician/')) {
      setIsTechnicianOpen(true)
    }
  }, [pathname])

  const handleLogout = () => {
    setUser(null)
    router.push('/login')
  }

  return (
    <motion.aside 
      variants={sidebarVariants}
      animate={expanded ? "expanded" : "collapsed"}
      className="relative flex flex-col h-screen bg-white border-r border-gray-100"
    >
      <div className="flex items-center p-4 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
        <motion.div 
          className="flex items-center gap-4"
          initial={false}
          animate={expanded ? "expanded" : "collapsed"}
        >
          <motion.div
            className="relative"
            whileHover="hover"
            whileTap="tap"
            variants={logoVariants}
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff4e00] to-[#ff8700] rounded-xl opacity-20 blur-sm" />
              <div className="relative w-full h-full bg-white rounded-xl p-2 shadow-sm">
                <img 
                  src="/logo.png"
                  alt="Astaan Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {expanded && (
              <motion.div 
                variants={headerVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex flex-col"
              >
                <motion.h1 
                  className="text-xl font-bold bg-gradient-to-r from-[#ff4e00] to-[#ff8700] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Astaan
                </motion.h1>
                <motion.p 
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Auto
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "absolute -right-3 top-16 p-1.5 rounded-full bg-white border border-gray-200",
            "hover:bg-gray-50 hover:shadow-md transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[#ff4e00]/20"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: expanded ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </motion.div>
        </motion.button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-2">
          {mainRoutes.map((item) => {
            const isActive = item.href ? pathname === item.href : 
              item.submenu?.some(sub => pathname === sub.href)

            return (
              <div key={item.name} className="relative">
                {(item.name === 'Technician' || item.name === 'User') ? (
                  <div className="py-0.5">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "relative flex w-full items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200",
                          isActive && "bg-gray-50 text-gray-900"
                        )}
                        onClick={() => {
                          if (item.name === 'Technician') {
                            setIsTechnicianOpen(!isTechnicianOpen)
                          } else if (item.name === 'User') {
                            setIsUserOpen(!isUserOpen)
                          }
                        }}
                      >
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200",
                          isActive 
                            ? "bg-[#ff4e00] text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                        )}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <AnimatePresence>
                          {expanded && (
                            <motion.div
                              variants={menuItemVariants}
                              initial="collapsed"
                              animate="expanded"
                              exit="collapsed"
                              className="flex items-center flex-1"
                            >
                              <span className="flex-1 text-left">{item.name}</span>
                              <ChevronDown 
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  ((item.name === 'Technician' && isTechnicianOpen) ||
                                   (item.name === 'User' && isUserOpen)) && "rotate-180"
                                )}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                    <AnimatePresence>
                      {((item.name === 'Technician' && isTechnicianOpen) ||
                        (item.name === 'User' && isUserOpen)) && expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-11 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.submenu?.map((subItem) => (
                            <motion.div
                              key={subItem.href}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200",
                                  pathname === subItem.href && "bg-gray-50 text-[#ff4e00]"
                                )}
                              >
                                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-50">
                                  {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                </div>
                                <span>{subItem.name}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200",
                        pathname === item.href && "bg-gray-50 text-gray-900"
                      )}
                    >
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200",
                        pathname === item.href 
                          ? "bg-[#ff4e00] text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      )}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            variants={menuItemVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="flex items-center flex-1"
                          >
                            <span className="flex-1">{item.name}</span>
                            {item.badge && (
                              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="border-t p-2 mt-auto">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200",
            !expanded && "justify-center"
          )}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50">
            <LogOut className="h-5 w-5" />
          </div>
          {expanded && <span>Logout</span>}
        </Button>
      </div>
    </motion.aside>
  )
}

