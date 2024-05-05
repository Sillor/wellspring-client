import { useState } from "react";
import { useEffect } from "react";
import "../globals.css";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
("use client");

// Zod schema for form validation
// const formSchema = z.object({
//   DateAndTime: z.string().datetime(),
//   patientName: z.enum(data.patients),
//   Physician: z.string().min(2).max(18),
//   Urgency: z.enum(["Urgent", "Non-Urgent"]),
//   Notes: z.string(),
// });

//Zod schema for form validation
const formSchema = z.object({
  userName: z.string().min(2).max(18),
  firstName: z.string().min(2).max(18),
  lastName: z.string().min(2).max(18),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string(),
  position: z.enum(["Doctor", "Nurse", "Technician"]),
  doctorCode: z.string().optional(),
});

// Submission to database
const submitNewAppointment = (data) => {
  fetch("https://wellspring.pfc.io:5175/createnewappointment", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      Username: data.userName,
      Password: data.password,
      Email: data.email,
      First_Name: data.firstName,
      Surname: data.lastName,
      Role: data.position,
    }),
  });
};

//Default values for zod form initialization
export default function NewAppointmentPage2() {
  //   const [events, setEvents] = useState([
  //     {
  //       id: 1,
  //       patientName: "Patient #1",
  //     },
  //   ]);

  //   function populatePatients(data) {
  //     // Check if data.patients is an array and has elements
  //     if (Array.isArray(data.patients) && data.patients.length > 0) {
  //       // Update events with patient names
  //       const updatedEvents = data.patients.map((patient, index) => ({
  //         id: index + 1, // Assigning an id to each event
  //         patientName: `${patient.FirstName} ${patient.LastName}`,
  //       }));

  //       // Update events array
  //       setEvents(updatedEvents);
  //     }
  //   }

  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     fetch(
  //       "http://152.44.224.138:5174/patients",
  //       {
  //         method: "GET",
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       },
  //       [data]
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.message === "success") {
  //           setData(data.patients);
  //           //   populatePatients(data);
  //         } else {
  //           alert(data.message);
  //         }
  //       });
  //   });

  //   //Dont render if data isnt there
  //   if (data.length < 1) {
  //     return <div>Loading...</div>;
  //   }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      DateAndTime: "",
      patientName: "",
      Physician: "",
      Urgency: "",
      Notes: "",
    },
  });

  return (
    <main className="flex flex-col items-center gap-2" id="pageContainer">
      {" "}
      {/*Primary container*/}
      {/*Primary Display*/}
      <Card className="w-full sm:w-2/3">
        <CardHeader>
          <CardTitle>New Appointment Scheduling</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitNewAppointment)}>
              {/* Date And Time */}
              <FormField
                control={form.control}
                name="DateAndTime"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Date and Time:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="date and time"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="PatientName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Patient Name:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Patient Name"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="Physician"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Physician:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Physician" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="Urgency"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Urgency:</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                          <SelectItem value="Non-Urgent">Non-Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="Notes"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Notes:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Notes" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <CardFooter className="flex sm:justify-center mt-10">
                <Button className="w-full sm:w-1/3 flo" type="submit">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
