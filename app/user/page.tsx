'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    router.push(`/user/${option.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select Option</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSelect('Lists')}>Lists</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect('Profile')}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect('Add New')}>Add New</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedOption && <p className="mt-4">You selected: {selectedOption}</p>}
    </div>
  );
} 