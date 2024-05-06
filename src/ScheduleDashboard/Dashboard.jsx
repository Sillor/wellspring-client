import React, { useEffect } from "react";
import { useState } from "react";
import { Menu, PaintBucket } from "lucide-react";
import { User } from "lucide-react";
import "../globals.css";
import { Link, Navigate } from "react-router-dom";
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
import { Card } from "../components/ui/card";
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
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu"


function Dashboard() {
	const [ButtonPopup, setButtonPopup] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const navigate = useNavigate();

	const handleButtonClick = (event) => {
		setSelectedEvent(event);
		setButtonPopup(true);
	};

	const [events, setEvents] = useState([]);

	//Call data before routed to dashboard
	const [data, setData] = useState([])
	useEffect(() => {
		

		fetch('http://152.44.224.138:5174/patients', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		}, [data])
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'success') {
					localStorage.setItem('token', data.token)
					setData(data.patients);
					if(events.length == 0){
						data.patients.forEach((patient) => {
							const item = {
								id: patient.id,
								title: "Doctor Appointment",
								patientName: patient.FirstName + ", " +patient.LastName,
								date: "2021-08-10",
								time: "10:00",
								type: "Urgent Care",
							}
							events.push(item)
						})
					}
				}
				else {
					alert(data.message)
				}
			})
	})

	// Patient filter
	const [date, setDate] = useState(new Date());
	const [selectedType, setSelectedType] = useState("All");
	const filteredEvents =
		selectedType === "All"
			? events
			: events.filter((event) => event.type === selectedType);


	//Dont render if data isnt there
	if (data.length < 1) {
		return (
			<div>Loading...</div>
		)
	}


	return (
		<div className="flex flex-col items-center ">
			<div className="p-4 flex flex-row justify-between md:hidden w-full">
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
							<li className="mb-2 px-2 active:bg-primary/15 rounded-lg w-fit">
    							<Link to="/NewPatient">New Patient</Link>
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
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to="/NewPatient">New Patient</Link></NavigationMenuLink>								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/'}>View Schedule List</Link></NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}asChild><Link to={'/search'}>Search Patient</Link></NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}asChild><Link to={'/'}>Logout</Link></NavigationMenuLink>
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
						<DropdownMenuContent className='bg-white'>
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

								{/* Weird stuff happens when Link instead of button*/}
								<button onClick={ ()=>{ navigate('/dashboard', {state: data.filter( (patient) => {return patient.id === selectedEvent.id}) })} } className="flex float-end border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 w-36 justify-center text-center items-center rounded-lg">Patient Chart</button>
							</Popup>
						)}
					</div>
				))}
			</div>
		</div>
	);
}




export default Dashboard;
