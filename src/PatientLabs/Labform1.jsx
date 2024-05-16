import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import arrow from "../PrescriptionPage/PrescriptionAssets/arrow.png";
import Popup from "../components/ui/popup";
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
import { useLocation } from "react-router-dom";
import { Menu, PaintBucket } from "lucide-react";
import { User } from "lucide-react";
import { Card } from "../components/ui/card";

const LabForm1 = (props) => {
  const location = useLocation(props);

  const [ButtonPopup, setButtonPopup] = useState(false);

  //   console.log(props);
  //   console.log(location.state);

  const [events, setEvents] = useState([
    {
      id: 1,
      patientName: "Patient #1",
    },
    {
      id: 2,
      patientName: "Patient #2",
    },
  ]);

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

  const [formData, setFormData] = useState({
    labSelection: "",
    labOrderDate: "",
    patientName: "",
    doctorName: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    // submission to database
    const submitLabForm1 = (data) => {
      fetch("http://152.44.224.138:5174/createlab", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          Lab: data.labSelection,
          OrderDate: data.labOrderDate,
          Patientid: data.patientName,
          Doctor: data.doctorName,
          Status: "open",
          Results: data.notes,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Optionally handle successful response here
          console.log("Prescription submitted successfully");
          setButtonPopup(true);
        })
        .catch((error) => {
          // Handle fetch errors here
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    submitLabForm1(formData);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/*User header*/}
      <div className="flex w-full mx-2 sticky " id="userHeader">
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
                  <Link to={"/search"}>Search Patient</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to={"/newpatient"}>New Patient</Link>
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
          <User className="" size={32} />
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
                  to={"/newpatient"}
                  className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
                >
                  New Patient
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

      {/*Patient info and backspace header*/}
      <Card className="flex flex-row w-full sm:w-2/3 items-center">
        <Card className="flex w-fit hover:bg-slate-100">
          <Link
            to={"/dashboard"}
            state={{ selectedPatient: location.state.selectedPatient }}
          >
            <img src={arrow} alt="not found" className="w-10 p-2" />
          </Link>
        </Card>
        <div id="patientInfo" className="flex flex-row m-2">
          <h1>
            {location.state.selectedPatient[0].LastName},{" "}
            {location.state.selectedPatient[0].FirstName}
          </h1>
          <img
            src="../src/assets/PrescriptionAssets/user.png"
            alt=""
            className="flex ml-4"
          />
        </div>
      </Card>

      <Card className="w-full sm:w-2/3">
        <div className="w-full p-4 shadow-lg bg-white rounded-md">
          <h1 className="text-2xl font-semibold text-teal-800 mb-4 text-center mt-3">
            <i className="fas fa-dna"></i> Lab Information Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-5">
              <div>
                <label
                  htmlFor="labFacility"
                  className="block text-sm font-medium text-teal-800 mt-5"
                >
                  Lab Work
                </label>
                <select
                  name="labSelection"
                  id="labSelection"
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select Lab</option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="Bloodwork">Bloodwork</option>
                  <option value="Physical">Physical</option>
                  <option value="Maternal">Maternal</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="labOrderDate"
                  className="block text-sm font-medium text-teal-800 mt-5"
                >
                  Lab Order Date
                </label>
                <input
                  type="date"
                  id="labOrderDate"
                  name="labOrderDate"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm font-medium text-teal-800 mt-5"
              >
                Patient's Name
              </label>
              {/* <input
                type="text"
                id="patientName"
                name="patientName"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter Patient"
                onChange={handleInputChange}
                required
              /> */}
              <select
                name="patientName"
                id="patientName"
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              >
                <option defaultValue="">Select Patient Name</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.patientName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="doctorName"
                className="block text-sm font-medium text-teal-800 mt-5"
              >
                Doctor's Name
              </label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter Doctor"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="Notes"
                className="block text-sm font-medium text-teal-600 mt-3"
              >
                Notes
              </label>
              <input
                type="text"
                id="Notes"
                name="notes"
                className="mt-3 p-8 w-full border rounded-md"
                placeholder="Enter Notes"
                onChange={handleInputChange}
              />
            </div>
            <Button className="w-full">Request</Button>
          </form>
        </div>
      </Card>
      <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
        Successfully Submitted
      </Popup>
    </div>
  );
};

export default LabForm1;
