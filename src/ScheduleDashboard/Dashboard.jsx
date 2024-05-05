import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, PaintBucket } from "lucide-react";
import { User } from "lucide-react";
import "../globals.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import Popup from "../components/ui/popup";
import defaultPatientImg from "../components/images/patient_default.jpg";
import "../components/images/defaultPatientImg.css";
import login from "../Login/Login";
import { useNavigate } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu";

function Dashboard() {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  login();

  const navigate = useNavigate();
  const handleButtonClick = (event) => {
    setSelectedEvent(event);
    setButtonPopup(true);
  };

  // const handleNewAppointmentClick = () => {};

  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Doctor Appointment",
      patientName: "Patient #1",
      date: "2021-08-10",
      time: "10:00",
      type: "Urgent Care",
    },
    {
      id: 2,
      title: "Dentist Appointment",
      patientName: "Patient #2",
      date: "2021-08-10",
      time: "11:00",
      type: "Non-Urgent Care",
    },
    {
      id: 3,
      title: "Therapy Session",
      patientName: "Patient #3",
      date: "2021-08-10",
      time: "12:00",
      type: "Urgent Care",
    },
  ]);
  const [selectedType, setSelectedType] = useState("All");
  const filteredEvents =
    selectedType === "All"
      ? events
      : events.filter((event) => event.type === selectedType);

  //Call data before routed to dashboard
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "http://152.44.224.138:5174/patients",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      [data]
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setData(data.patients);
          populateSchedule(data);
        } else {
          alert(data.message);
        }
      });
  });

  function populateSchedule(data) {
    events.forEach((patient) => {
      patient.patientName = data.patients[1].FirstName;
    });
  }

  //Dont render if data isnt there
  if (data.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="p-4 flex flex-row justify-between w-full">
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
                {/* <Link to={"/newappointment"} className=" sm:w-1/3 w-full"> */}
                <Button
                  variant="outline"
                  onClick={navigate("/newappointment", { state: data })}
                >
                  Set Appointment
                </Button>
                {/* </Link> */}
              </li>
              <li className="mb-2 px-2 active:bg-primary/15 rounded-lg w-fit">
                <Button variant="outline">View Patients</Button>
              </li>
              <li className="mb-2 px-2 active:bg-primary/15 rounded-lg w-fit">
                <Button variant="outline">Request Lab</Button>
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

      {/*Navigation menu for large screen */}
      <div className="hidden md:flex w-full justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <button>View Schedule List</button>
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <button>Search for patient</button>
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <button>Logout</button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <img alt="" className="m-2" />
      </div>

      <div className="flex flex-col md:w-2/3 w-full p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Today</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="w-36">
                {selectedType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedType("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("Urgent Care")}>
                Urgent Care
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedType("Non-Urgent Care")}
              >
                Non-Urgent Care
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {filteredEvents.map((event) => (
          <div key={event.id} className="border p-4 rounded-md mb-4">
            <Button
              variant="outline"
              className="schedule-btn"
              onClick={() => handleButtonClick(event)}
            >
              <img
                src={defaultPatientImg}
                alt="Default image for patients"
                className="patientImage"
              />
              <div>
                <h1>{event.patientName}</h1>
                <p>{event.type}</p>
              </div>
            </Button>
            {selectedEvent && (
              <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
                <h1 className="text-xl font-bold">{selectedEvent.title}</h1>
                <h1>{selectedEvent.type}</h1>
                <p>
                  {selectedEvent.date} at {selectedEvent.time}
                </p>
                <button
                  onClick={navigate("/dashboard", { state: data })}
                ></button>
              </Popup>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
