import React from 'react';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { User } from 'lucide-react';
import '../globals.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Doctor Appointment',
      date: '2021-08-10',
      time: '10:00',
      type: 'Urgent Care',
    },
    {
      id: 2,
      title: 'Dentist Appointment',
      date: '2021-08-10',
      time: '11:00',
      type: 'Non-Urgent Care',
    },
    {
      id: 3,
      title: 'Therapy Session',
      date: '2021-08-10',
      time: '12:00',
      type: 'Urgent Care',
    },
  ]);
  const [selectedType, setSelectedType] = useState('All');
  const filteredEvents =
    selectedType === 'All'
      ? events
      : events.filter((event) => event.type === selectedType);

  return (
    <>
      <div className="p-4 flex flex-row justify-between">
        <Drawer>
          <DrawerTrigger>
            <Menu size={32} />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border flex justify-center"
              />
            </DrawerHeader>
            <ul className="ps-4">
              <li className="mb-2 px-2 active:bg-primary/15 rounded-lg w-fit">
                Set Appointments
              </li>
              <li className="mb-2 px-2 active:bg-primary/15 rounded-lg w-fit">
                View Patients
              </li>
              <li className="mb-2 px-2 active:bg-primary/15 rounded-lg w-fit">
                Request Lab
              </li>
            </ul>
            <DrawerFooter>
              <DrawerClose>
                <Button className="w-full">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <User size={32} />
      </div>

      <div className="p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Today</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="w-36">
                {selectedType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedType('All')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType('Urgent Care')}>
                Urgent Care
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedType('Non-Urgent Care')}
              >
                Non-Urgent Care
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {filteredEvents.map((event) => (
          <div key={event.id} className="border p-4 rounded-md mb-4">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>
              {event.date} at {event.time}
            </p>
            <p>Type: {event.type}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
