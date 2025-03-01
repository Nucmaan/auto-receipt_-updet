"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface QuickAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function QuickAddDialog({ isOpen, onClose, title, children }: QuickAddDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">
              {title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
} 