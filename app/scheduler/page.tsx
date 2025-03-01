"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight, Plus, X, Clock, Calendar as CalendarIcon, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'meeting' | 'planning' | 'report' | 'theme';
  color: string;
  isNew?: boolean;
}

const eventTypes = [
  { 
    name: 'New Event Planning', 
    color: '#4ade80', 
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  { 
    name: 'Meeting', 
    color: '#22d3ee', 
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    borderColor: 'border-cyan-200'
  },
  { 
    name: 'Generating Reports', 
    color: '#fbbf24', 
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200'
  },
  { 
    name: 'Create New theme', 
    color: '#f87171', 
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  },
];

export default function SchedulerPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'Month' | 'Week' | 'Day'>('Month');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    start: '',
    end: '',
  });
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'All Day Event',
      start: '2024-02-01',
      end: '2024-02-01',
      type: 'meeting',
      color: '#22d3ee'
    },
    {
      id: '2',
      title: 'Long Event',
      start: '2024-02-20',
      end: '2024-02-23',
      type: 'planning',
      color: '#4ade80'
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const handleCreateEvent = (selectedDate?: Date) => {
    const eventDate = selectedDate || new Date();
    const formattedDate = eventDate.toISOString().split('T')[0];
    
    const newEventData: Event = {
      id: Date.now().toString(),
      title: newEvent.title || 'New Event',
      start: newEvent.start || `${formattedDate}T09:00`,
      end: newEvent.end || `${formattedDate}T10:00`,
      type: newEvent.type as 'meeting' | 'planning' | 'report' | 'theme',
      color: eventTypes.find(t => t.name === newEvent.type)?.color || '#ff4e00',
    };

    setEvents(prev => [...prev, { ...newEventData, isNew: true }]);
    setIsDialogOpen(false);
    setNewEvent({ title: '', type: '', start: '', end: '' });

    setTimeout(() => {
      setEvents(prev => 
        prev.map(event => 
          event.id === newEventData.id ? { ...event, isNew: false } : event
        )
      );
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                className="bg-[#ff4e00] hover:bg-[#cc3e00] text-white px-6"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white p-6">
              <div className="flex justify-between items-center mb-6">
                <DialogTitle className="text-2xl font-semibold">Create New Event</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsDialogOpen(false)}
                  className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-base font-semibold">
                    Event Title
                  </Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter event title"
                    className="mt-2 h-12 rounded-lg border-2 focus:border-[#ff4e00]"
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-base font-semibold">
                    Event Type
                  </Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-lg border-2 focus:border-[#ff4e00] bg-white">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {eventTypes.map((type) => (
                        <SelectItem 
                          key={type.name} 
                          value={type.name}
                          className="focus:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center gap-2 py-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: type.color }}
                            />
                            <span className="text-gray-900">{type.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="start" className="text-base font-semibold">
                    Start Date
                  </Label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, start: e.target.value }))}
                    className="mt-2 h-12 rounded-lg border-2 focus:border-[#ff4e00]"
                  />
                </div>

                <div>
                  <Label htmlFor="end" className="text-base font-semibold">
                    End Date
                  </Label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, end: e.target.value }))}
                    className="mt-2 h-12 rounded-lg border-2 focus:border-[#ff4e00]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="h-12 px-6 rounded-lg border-2 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleCreateEvent()}
                  className="h-12 px-6 rounded-lg bg-[#ff4e00] hover:bg-[#cc3e00] text-white"
                >
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-4">
            <div className="flex bg-[#ff4e00] rounded-lg overflow-hidden">
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-[#cc3e00] ${view === 'Month' && 'bg-[#cc3e00]'}`}
                onClick={() => setView('Month')}
              >
                Month
              </Button>
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-[#cc3e00] ${view === 'Week' && 'bg-[#cc3e00]'}`}
                onClick={() => setView('Week')}
              >
                Week
              </Button>
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-[#cc3e00] ${view === 'Day' && 'bg-[#cc3e00]'}`}
                onClick={() => setView('Day')}
              >
                Day
              </Button>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          Drag and drop your event or click in the calendar
        </p>

        {/* Event Types */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {eventTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`cursor-pointer rounded-lg ${type.bgColor} ${type.borderColor} border`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className={`text-sm font-medium ${type.textColor}`}>
                    {type.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <Card className="mt-6 shadow-sm border rounded-xl">
        <CardContent className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border rounded-lg h-8 w-8"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border rounded-lg h-8 w-8"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="gap-2 border rounded-lg"
            >
              <Calendar className="h-4 w-4" />
              Today
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-[1px] bg-gray-100 rounded-lg overflow-hidden">
            {/* Days Header */}
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="bg-white p-4 text-center text-sm font-medium text-gray-900"
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {Array.from({ length: 42 }, (_, i) => {
              const dayNumber = i - startingDay + 1;
              const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
              const dayEvents = events.filter(event => new Date(event.start).toDateString() === date.toDateString());
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={i}
                  className={`bg-white p-4 min-h-[120px] relative group transition-colors
                    ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                    ${isToday ? 'bg-[#fff1ec]' : 'hover:bg-gray-50'}
                  `}
                >
                  <span className={`text-sm ${isToday ? 'font-bold text-[#ff4e00]' : ''}`}>
                    {isCurrentMonth ? dayNumber : ''}
                  </span>
                  {dayEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-1 px-2 py-1 text-xs rounded-md cursor-pointer transition-all duration-300
                        ${event.isNew ? 'ring-2 ring-[#ff4e00] ring-offset-2 scale-105' : ''}
                        hover:opacity-90 hover:scale-[1.02]
                      `}
                      style={{
                        backgroundColor: event.color,
                        color: 'white',
                      }}
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      {event.title}
                    </motion.div>
                  ))}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-[#fff1ec]"
                      onClick={() => {
                        const clickedDate = new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          dayNumber
                        );
                        setNewEvent(prev => ({
                          ...prev,
                          start: `${clickedDate.toISOString().split('T')[0]}T09:00`,
                          end: `${clickedDate.toISOString().split('T')[0]}T10:00`,
                        }));
                        setIsDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 text-[#ff4e00]" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white p-6">
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-2xl font-semibold">Event Details</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsViewDialogOpen(false)}
              className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {selectedEvent && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                <div className={`inline-block px-2 py-1 mt-2 rounded-full text-xs
                  ${eventTypes.find(t => t.name === selectedEvent.type)?.textColor}
                  ${eventTypes.find(t => t.name === selectedEvent.type)?.bgColor}`}
                >
                  {selectedEvent.type}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                  <div>
                    <p className="text-sm">
                      {new Date(selectedEvent.start).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="text-sm">
                      {new Date(selectedEvent.start).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {' - '}
                      {new Date(selectedEvent.end).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                  className="h-12 px-6 rounded-lg border-2 hover:bg-gray-50"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}