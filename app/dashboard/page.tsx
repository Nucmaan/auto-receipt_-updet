"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  Users, 
  DollarSign,
  AlertCircle,
  Send,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

// Sample data for the revenue chart
const revenueData = [
  { month: "Jan", revenue: 2900, expenses: 1500 },
  { month: "Feb", revenue: 4800, expenses: 800 },
  { month: "Mar", revenue: 3800, expenses: 1400 },
  { month: "Apr", revenue: 3200, expenses: 2400 },
  { month: "May", revenue: 4600, expenses: 3400 },
  { month: "Jun", revenue: 1800, expenses: 1000 },
];

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(2025, 1, 25),
  });

  return (
    <div className="space-y-6 p-6">
      {/* Date Range Picker */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your business metrics
          </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[300px] justify-start text-left font-normal border-2">
              <Calendar className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "MMM dd, yyyy")} - {format(date.to, "MMM dd, yyyy")}
                  </>
                ) : (
                  format(date.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group"
        >
          <div className="rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#ee5253] p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="flex justify-between">
              <div>
                <p className="text-white/90 font-medium">Total Revenue</p>
                <h3 className="text-3xl font-bold mt-2">$45,231.89</h3>
                <p className="text-white/75 text-sm mt-2">+20.1% from last month</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg self-start group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Customers Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="group"
        >
          <div className="rounded-xl bg-gradient-to-br from-[#4d7cfe] to-[#5e8eff] p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="flex justify-between">
              <div>
                <p className="text-white/90 font-medium">Active Customers</p>
                <h3 className="text-3xl font-bold mt-2">2,350</h3>
                <p className="text-white/75 text-sm mt-2">+180 new customers</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg self-start group-hover:scale-110 transition-transform duration-200">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Open Tasks Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="group"
        >
          <div className="rounded-xl bg-gradient-to-br from-[#2ecc71] to-[#27ae60] p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="flex justify-between">
              <div>
                <p className="text-white/90 font-medium">Open Tasks</p>
                <h3 className="text-3xl font-bold mt-2">127</h3>
                <p className="text-white/75 text-sm mt-2">+22 since last week</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg self-start group-hover:scale-110 transition-transform duration-200">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Campaigns Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="group"
        >
          <div className="rounded-xl bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="flex justify-between">
              <div>
                <p className="text-white/90 font-medium">Active Campaigns</p>
                <h3 className="text-3xl font-bold mt-2">3</h3>
                <p className="text-white/75 text-sm mt-2">2 ending this week</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg self-start group-hover:scale-110 transition-transform duration-200">
                <Send className="h-6 w-6" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Revenue Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b6b]" />
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-[#4d7cfe]" />
                  <span className="text-sm text-gray-600">Expenses</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Bar dataKey="revenue" fill="#ff6b6b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#4d7cfe" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: 1999.00 },
                  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: 39.00 },
                  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: 299.00 },
                  { name: "William Kim", email: "will@email.com", amount: 99.00 },
                  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: 39.00 }
                ].map((payment, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#4d7cfe] to-[#2ecc71]" />
                      <div>
                        <p className="text-sm font-medium">{payment.name}</p>
                        <p className="text-sm text-gray-500">{payment.email}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">+${payment.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}