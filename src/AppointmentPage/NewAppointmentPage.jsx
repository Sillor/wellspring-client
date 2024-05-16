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
import Popup from "../components/ui/popup";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useEffect } from "react";
import { Menu, User } from "lucide-react";

export function NewAppointmentPage() {
  const [ButtonPopup, setButtonPopup] = useState(false);

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
  // if (data.length < 1) {
  //   return <div>Loading...</div>;
  // }

  //Submission to database
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDateAndTime = new Date(dateAndTime).toLocaleString(); // Example format

    // Extract date and time parts
    const date = new Date(formattedDateAndTime).toLocaleDateString(); // Format the date
    const time = new Date(formattedDateAndTime).toLocaleTimeString(); // Format the time

    //submission to database
    const submitNewAppointment = () => {
      fetch("http://152.44.224.138:5174/createappointment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          Patientid: patientId,
          ScheduledDate: date,
          Status: "open",
          Username: physician,
          Notes: notes,
          Time: time,
          Care: urgency,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Optionally handle successful response here
          console.log("Appointment submitted successfully");
          setButtonPopup(true);
        })
        .catch((error) => {
          // Handle fetch errors here
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    submitNewAppointment();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-center gap-2" id="pageContainer">
        {" "}
        {/*Primary container*/}
        {/*User header*/}
        <div className="flex w-full mx-2" id="userHeader">
          {/*Navigation menu for large screen */}
          <div className="hidden md:flex w-full justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link to={"/main"}>View Schedule List</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link to={"/newappointment"}>View Schedule List</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link to={"/search"}>Search Patient</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link to={"/admin"}>Admin Tools</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link to={"/"}>Logout</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <User size={32} />
          </div>

          {/*Hamburger Menu*/}
          <div className="p-4 flex visible md:invisible md:absolute flex-row justify-between w-full">
            <Drawer>
              <DrawerTrigger>
                <Menu size={32} />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>What would you like to do?</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                  <Link
                    to={"/main"}
                    className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
                  >
                    View Schedule
                  </Link>
                  <Link
                    to={"/search"}
                    className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
                  >
                    Search Patient
                  </Link>
                  <Link
                    to={"/admin"}
                    className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
                  >
                    Admin Tools
                  </Link>
                  <Link
                    to={"/"}
                    className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
                  >
                    Logout
                  </Link>
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      classList="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <User size={32} />
          </div>
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
        <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
          Successfully Submitted
        </Popup>
      </div>
    </LocalizationProvider>
  );
}

export default NewAppointmentPage;
