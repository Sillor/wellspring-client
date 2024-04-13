import "../globals.css";
import { Button } from "../components/ui/button";
// import arrow from "../PrescriptionPage/PrescriptionAssets/arrow.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
// import Accordion from "../components/Accordion";
// import { Link, useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import login from "../Login/Login.js";

export function NewAppointmentPage() {
  login();

  const [events, setEvents] = useState([
    {
      id: 1,
      patientName: "Patient #1",
    },
    {
      id: 2,
      patientName: "Patient #2",
    },
    {
      id: 3,
      patientName: "Patient #3",
    },
  ]);

  function populatePatients(data) {
    // Check if data.patients is an array and has elements
    if (Array.isArray(data.patients) && data.patients.length > 0) {
      // Update events with patient names
      const updatedEvents = data.patients.map((patient, index) => ({
        id: index + 1, // Assigning an id to each event
        patientName: `${patient.FirstName} ${patient.LastName}`,
      }));

      // Update events array
      setEvents(updatedEvents);
    }
  }

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
          localStorage.setItem("token", data.token);
          setData(data.patients);
          populatePatients(data);
        } else {
          alert(data.message);
        }
      });
  });

  //Dont render if data isnt there
  if (data.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-center gap-2" id="pageContainer">
        {" "}
        {/*Primary container*/}
        {/*User header*/}
        <div className="flex w-full mx-2" id="userHeader">
          {/*Navigation menu for large screen */}
          <div className="flex w-full justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    View Schedule List
                  </NavigationMenuLink>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Search Patient
                  </NavigationMenuLink>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Logout
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/*Hamburger Menu*/}
        </div>
        {/*Primary Display*/}
        <Card className="w-full sm:w-2/3">
          <CardHeader>
            <CardTitle>Set New Appointment</CardTitle>
            <CardDescription>When will you meet?</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="table w-full gap-4 border-spacing-y-4">
                <div className="table-row">
                  <Label htmlFor="orderBy" className="table-cell">
                    Pick a Date and Time:
                  </Label>
                  <DateTimePicker id="orderBy" className="table-cell" />
                </div>
                <div className="table-row">
                  <Label htmlFor="patientName" className="table-cell ">
                    Patient Name:
                  </Label>
                  <div className="flex flex-row">
                    <Select>
                      <SelectTrigger className="w-50">
                        <SelectValue placeholder="Patients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel></SelectLabel>
                          {events.map((event) => (
                            <div
                              key={event.id}
                              className="border p-4 rounded-md mb-4"
                            >
                              <div>
                                <SelectItem value={event.patientName}>
                                  {event.patientName}
                                </SelectItem>
                              </div>
                            </div>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="table-row">
                  <Label htmlFor="orderBy" className="table-cell">
                    Physician:
                  </Label>
                  <Input
                    id="orderBy"
                    // value="{currentUser}"
                    placeholder="Physician Name"
                    className="flex"
                  />
                </div>
                <div className="table-row">
                  <Label htmlFor="dosage" className="table-cell">
                    Urgency:
                  </Label>
                  <div className="flex flex-row">
                    <Select>
                      <SelectTrigger className="w-39">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel></SelectLabel>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                          <SelectItem value="Non-Urgent">Non-Urgent</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="table-row">
                  <Label htmlFor="notes" className="table-cell">
                    Notes:
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Important Notes"
                    className="focus-visible:ring-0"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex sm:justify-center">
            <Button className="w-full sm:w-1/3">Confirm</Button>
          </CardFooter>
        </Card>
      </div>
    </LocalizationProvider>
  );
}

export default NewAppointmentPage;
