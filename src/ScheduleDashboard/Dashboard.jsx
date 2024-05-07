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
import { useNavigate, useLocation} from "react-router-dom";
import { DatePicker } from "../components/ui/DatePicker";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import dayjs from 'dayjs'


function Dashboard(props) {

	//Date formating
	let todayDate = new Date();
	const dateFormating = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const [date, setDate] = useState(todayDate.toLocaleDateString("en-US",dateFormating));
	const [ButtonPopup, setButtonPopup] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [selectedDate,setSelectedDate] = useState([]);

	const handleDate = (date) => {
		const dateFormating = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		setDate(date.toLocaleDateString("en-US",dateFormating))
	}
	
	const navigate = useNavigate();
	const handleButtonClick = (event) => {
		setSelectedEvent(event);
		setButtonPopup(true);
	};
	const [events, setEvents] = useState([]);

	//Call data before routed to dashboard
	const [data, setData] = useState([])

	useEffect(() => {
		fetch('http://152.44.224.138:5174/appointments', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		},)
			.then((res) => res.json())
			.then((appointments) => {

				//Map over each patient id and retrieve the corresponding patient tab
				appointments.forEach((patientAppointment) => {

				//Clear Data list before repopulating to prevent repeats
				setData([])
				//Clear events list before repopulating
				setEvents([])
					
					// Date formating jargon to correctly populate based on date selected
					let dateFormat = patientAppointment.ScheduledDate.replace("T00:00:00.000Z","")
					let reg = RegExp(/(\d{2}:\d{2})/g)
					let timeFormat = patientAppointment.Time.match(reg);

					//Populate screen with open appointments for logged user under certain date
					if(patientAppointment.Status === 'open' && localStorage.getItem('user') === patientAppointment.Username && date === dayjs(dateFormat).format('dddd, MMMM DD, YYYY')){

						fetch('http://152.44.224.138:5174/patient/', {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`,
							},
							body: JSON.stringify({id: patientAppointment.Patientid})
						},)
						.then((res) => (res.json()))
						.then( (patient) => {

						setData(data => [...data, patient.patient[0]]);

						const item = {
							id: patientAppointment.id,
							patientId:patientAppointment.Patientid,
							title: "Doctor Appointment",
							patientName: patient.patient[0].FirstName + ", " + patient.patient[0].LastName,
							date: dayjs(dateFormat).format('dddd, MMMM DD, YYYY'),
							time: timeFormat,
							type: patientAppointment.Care,
						}
						setEvents(events => [...events,item])
						})
					}
				})

			})
	}, [date])
	
	// Patient filter
	const [selectedType, setSelectedType] = useState("All");
	const filteredEvents =
		selectedType === "All"
			? events
			: events.filter((event) => event.type === selectedType);


	//Function removing patient appointment from DB
	const resolve = (item) => {
		let result = confirm("Resolving this will close out the current appointment. \n \n Are you sure you want to delete " + item.patientName + ' \'s appointment for ' + item.time[0] + "?")
		if(result === true){
			fetch('http://152.44.224.138:5174/deleteappointment/', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					id: item.id
				}),
			},)
			.then((res) => res.json())
			.then( (res) => {
				if(res.message === 'success'){
					alert("Appointment resolved and removed")
				}
			})
		}
		else{
			return false;
		}
	}


	return (

		<div className="flex flex-col items-center ">

			{/*Hamburger Menu*/}
			<div className="p-4 flex visible md:invisible md:absolute flex-row justify-between w-full">
				<Drawer>
					<DrawerTrigger>
						<Menu size={32} />
					</DrawerTrigger>
					<DrawerContent>

						<DrawerHeader className="flex justify-center">						
							<Calendar
								mode="single"
								selected={date}
								onSelect={handleDate}
								className="rounded-md border flex justify-center"
							/>
						</DrawerHeader>
						<DrawerFooter>
							<Link to={'/main'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">View Schedule</Link>
							<Link to={'/search'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Search Patient</Link>
							<Link to={'/admin'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Admin Tools</Link>
							<Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Logout</Link>
							<DrawerClose asChild>
								<Button variant="outline" classList='inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium'>Cancel</Button>
							</DrawerClose>

						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<div>{date}</div>
				<User size={32} />
			</div>

			{/*Navigation menu for large screen */}
			<div className="hidden md:flex w-full justify-center">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/main'}>View Schedule List</Link></NavigationMenuLink>
							<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/search'}>Search Patient</Link></NavigationMenuLink>
							<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/admin'}>Admin Tools</Link></NavigationMenuLink>
							<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/'}>Logout</Link></NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<img alt="" className="m-2" />
			</div>


			<div className="flex flex-col md:w-/3 w-full p-4">
				<div className="flex flex-row justify-between items-center mb-4">
					<h1 className="text-4xl font-bold">Today</h1>

					{/* Date Picker*/}
					<DatePicker date={date} setDate={handleDate} setSelectedDate={setSelectedDate}/>		

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
							<DropdownMenuItem onClick={() => setSelectedType("Urgent")}>
								Urgent Care
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setSelectedType("Non-Urgent")}
							>
								Non-Urgent Care
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/*Actual Patient Tabs*/}
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
									<br />
								</p>
								<button className="flex mt-3 float-start  text-white border-slate-200 bg-red-500 hover:bg-red-300 h-10 w-36 justify-center text-center items-center rounded-lg" onClick={() => resolve(selectedEvent)}>Resolve</button>

								{/* Weird stuff happens when Link instead of button*/}
								<button onClick={ ()=>{ navigate('/dashboard', 
								{ 
									state: {
										selectedPatient: data.filter( (patient) => {return patient.id === selectedEvent.patientId}),									
									} 
								}
									)} } className="flex float-end mt-3 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 w-36 justify-center text-center items-center rounded-lg">Patient Chart</button>
							</Popup>
						)}
					</div>
				))}
			</div>
		</div>
	);
}


export default Dashboard;
