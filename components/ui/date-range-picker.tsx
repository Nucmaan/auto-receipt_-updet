"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface DateRangePickerProps {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
  className?: string
}

export function DateRangePickerWithRange({
  date,
  setDate,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <div className="grid gap-1">
        <div className="text-sm text-gray-500 uppercase font-medium">FROM</div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                value={date?.from ? format(date.from, "MMM d, yyyy") : ""}
                readOnly
                className="w-[180px] cursor-pointer bg-white pl-3 pr-10 h-12 border-gray-200 rounded-md"
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white rounded-md shadow-lg" align="start">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="text-xl font-bold">
                  {date?.from ? format(date.from, "MMMM yyyy") : format(new Date(), "MMMM yyyy")}
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
              classNames={{
                day_selected: "bg-blue-500 text-white hover:bg-blue-600",
                day_today: "bg-gray-100",
                day_range_middle: "bg-blue-100",
                day_range_end: "bg-blue-500 text-white hover:bg-blue-600",
                day_range_start: "bg-blue-500 text-white hover:bg-blue-600",
                head_cell: "text-gray-500 font-normal",
                cell: "text-center p-0 relative [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                table: "border-collapse w-full",
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="grid gap-1">
        <div className="text-sm text-gray-500 uppercase font-medium">TO</div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                value={date?.to ? format(date.to, "MMM d, yyyy") : ""}
                readOnly
                className="w-[180px] cursor-pointer bg-white pl-3 pr-10 h-12 border-gray-200 rounded-md"
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white rounded-md shadow-lg" align="start">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="text-xl font-bold">
                  {date?.to ? format(date.to, "MMMM yyyy") : format(new Date(), "MMMM yyyy")}
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <Calendar
              mode="range"
              defaultMonth={date?.to || date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
              classNames={{
                day_selected: "bg-blue-500 text-white hover:bg-blue-600",
                day_today: "bg-gray-100",
                day_range_middle: "bg-blue-100",
                day_range_end: "bg-blue-500 text-white hover:bg-blue-600",
                day_range_start: "bg-blue-500 text-white hover:bg-blue-600",
                head_cell: "text-gray-500 font-normal",
                cell: "text-center p-0 relative [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                table: "border-collapse w-full",
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

