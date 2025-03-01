"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function PaymentsPage() {
  // Stats data
  const stats = [
    {
      title: "Pending Payments",
      value: "11",
      change: "-2.3%",
      icon: Clock,
      color: "bg-[#E5A443]",
    },
    {
      title: "Completed",
      value: "54",
      change: "+12.5%",
      icon: CheckCircle,
      color: "bg-[#4573FF]",
    },
    {
      title: "Failed",
      value: "3",
      change: "-5.2%",
      icon: AlertCircle,
      color: "bg-[#FF4545]",
    },
  ];

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className="p-6 bg-white rounded-xl shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-600 text-lg font-medium mb-4">{stat.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold">{stat.value}</span>
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.color} p-4 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}