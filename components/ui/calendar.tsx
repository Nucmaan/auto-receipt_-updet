'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 bg-white', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-3',
        caption: 'flex justify-between pt-1 relative items-center h-10',
        caption_label: 'text-sm font-medium text-gray-900',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-[#fff5f2] text-[#ff4e00] border-0'
        ),
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'text-[#ff4e00] w-9 font-normal text-[0.8rem] rounded-md',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          'first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal text-[0.8rem] rounded-md hover:bg-[#fff5f2] hover:text-[#ff4e00] focus:bg-[#fff5f2] focus:text-[#ff4e00]'
        ),
        day_selected: 
          'bg-[#ff4e00] text-white hover:bg-[#ff4e00] hover:text-white focus:bg-[#ff4e00] focus:text-white',
        day_today: 'bg-[#fff5f2] text-[#ff4e00] font-semibold',
        day_outside: 
          'text-gray-400 opacity-50 hover:bg-transparent hover:text-gray-400 hover:opacity-50',
        day_disabled: 'text-gray-400 opacity-50',
        day_range_middle: 
          'aria-selected:bg-[#fff5f2] aria-selected:text-[#ff4e00]',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
