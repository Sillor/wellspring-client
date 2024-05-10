import "../globals.css";
import { Button } from "../components/ui/button";
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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useEffect } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { date } from "zod";

export function NewAppointmentPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      patientName: "Patient #1",
    },
  ]);

  // Form Values
  const [dateAndTime, setDateAndTime] = useState(dayjs(""));
  const [patientId, setPatientId] = useState("");
  const [physician, setPhysician] = useState("");
  const [urgency, setUrgency] = useState("");
  const [notes, setNotes] = useState("");

  function populatePatients(data) {
    // Check if data.patients is an array and has elements
    if (Array.isArray(data.patients) && data.patients.length > 0) {
      // Update events with patient names
      const updatedEvents = data.patients.map((patient) => ({
        id: patient.id, // Assigning the patient id to id
        patientName: `${patient.FirstName} ${patient.LastName}`,
      }));

      // Update events array
      setEvents(updatedEvents);
    }
  }

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

  //Submission to database
  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = { dateAndTime, patientId, physician, urgency, notes };
    console.log(appointment);
  };

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
            <form onSubmit={handleSubmit}>
              <div className="table w-full gap-4 border-spacing-y-4">
                <div className="table-row">
                  <Label htmlFor="orderBy" className="table-cell">
                    Pick a Date and Time:
                  </Label>
                  <DateTimePicker
                    disablePast
                    onChange={(newValue) => setDateAndTime(newValue)}
                    id="orderBy"
                    className="table-cell"
                  />
                </div>
                <div className="table-row">
                  <Label htmlFor="patientName" className="table-cell ">
                    Patient Name:
                  </Label>
                  <div className="flex flex-row">
                    <Select
                      onValueChange={(event) => setPatientId(event)}
                      required
                    >
                      <SelectTrigger className="w-50">
                        <SelectValue placeholder="Patients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {events.map((event) => (
                            <div
                              key={event.id}
                              className="border p-4 rounded-md mb-4"
                            >
                              <div>
                                <SelectItem value={event.id}>
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
                    value={physician}
                    placeholder="Physician Name"
                    onChange={(e) => setPhysician(e.target.value)}
                    required
                    className="flex"
                  />
                </div>
                <div className="table-row">
                  <Label htmlFor="dosage" className="table-cell">
                    Urgency:
                  </Label>
                  <div className="flex flex-row">
                    <Select
                      onValueChange={(event) => setUrgency(event)}
                      required
                    >
                      <SelectTrigger className="w-39">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
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
                    onChange={(e) => setNotes(e.target.value)}
                    className="focus-visible:ring-0"
                  />
                </div>
              </div>
              <Button className="w-full sm:justify-center">Confirm</Button>
            </form>
          </CardContent>
          <CardFooter className="flex sm:justify-center"></CardFooter>
        </Card>
      </div>
      <DateTimePicker value={dateAndTime} />
      <p>{patientId}</p>
      <p>{physician}</p>
      <p>{urgency}</p>
      <p>{notes}</p>
    </LocalizationProvider>
  );
}

export default NewAppointmentPage;
