"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
  className?: string
  date?: DateRange
  setDate: (date: DateRange | undefined) => void
}

export function DateRangePickerWithRange({
  className,
  date,
  setDate,
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-white border hover:border-[#ff4e00] hover:bg-[#fff5f2]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-[#ff4e00]" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} -{" "}
                  {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              <span>DE - ATÉ</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white border shadow-lg rounded-lg" 
          align="start"
        >
          <div className="p-3 border-b bg-[#fff5f2]">
            <h3 className="font-medium text-[#ff4e00]">DE - ATÉ</h3>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="rounded-b-lg"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
} 