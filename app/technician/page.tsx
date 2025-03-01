'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export default function TechnicianPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    router.push(`/technician/${option.toLowerCase()}`); // Navigate to the selected page
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Technician Management</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select Option</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSelect('Scheduler')}>Scheduler</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect('Region')}>Region</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect('Tasks')}>Tasks</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect('Report')}>Report</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedOption && <p className="mt-4">You selected: {selectedOption}</p>}
    </div>
  );
} 