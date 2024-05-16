import "../globals.css";
import { Button } from "../components/ui/button";
import arrow from "./PrescriptionAssets/arrow.png";
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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import menu from "./PrescriptionAssets/menu.png";
import user from "./PrescriptionAssets/user.png";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import {useLocation} from "react-router-dom"
import { Menu, PaintBucket } from "lucide-react";
import { User } from "lucide-react";

function request(patient){
	fetch('https://wellspring.pfc.io:5175/createprescription', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			id: patient.id,
			Patientid: patient.id,
			PrescriptionName: document.getElementById('prescription').value,
			OrderDate: new Date(),
			Dosage: document.getElementById('prescription').value,
		}),
	})
}


export function PrescriptionRequestPage() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
      patientName: "Patient #1",
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

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }

  // Form Values

  const [patientId, setPatientId] = useState();
  const [physician, setPhysician] = useState("");
  const [prescription, setPrescription] = useState("");
  const [dosage, setDosage] = useState("");
  const [units, setUnits] = useState("");
  const [currentDate, setCurrentDate] = useState(getDate());

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

  //Submission to database
  const handleSubmit = (e) => {
    e.preventDefault();

    //submission to database
    const submitPrescriptionForm = () => {
      console.log(patientId);
      fetch("http://152.44.224.138:5174/createprescription", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          Patientid: patientId,
          PrescriptionName: prescription,
          OrderDate: currentDate,
          Dosage: dosage + units,
          Active: "yes",
          OrderedBy: physician,
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
    submitPrescriptionForm();
  };

	return (
		<div className="flex flex-col items-center gap-2" id="pageContainer"> {/*Primary container*/}

			{/*User header*/}
			<div className="flex w-full mx-2 sticky " id="userHeader">

				{/*Navigation menu for large screen */}
				<div className="hidden md:flex w-full justify-center">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/main'}>View Schedule List</Link></NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/search'}>Search Patient</Link></NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/newpatient'}>New Patient</Link></NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/admin'}>Admin Tools</Link></NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/'}>Logout</Link></NavigationMenuLink>
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
								<Link to={'/main'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">View Schedule</Link>
								<Link to={'/search'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Search Patient</Link>
								<Link to={'/newpatient'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">New Patient</Link>
								<Link to={'/admin'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Admin Tools</Link>
								<Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Logout</Link>
								<DrawerClose asChild>
									<Button variant="outline" classList='inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium'>Cancel</Button>
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
					<Link to={"/dashboard"} state={{selectedPatient:location.state.selectedPatient}}>
						<img src={arrow} alt="not found" className="w-10 p-2"/>
					</Link>				
				</Card>
				<div id="patientInfo" className="flex flex-row m-2">
					<h1>{location.state.selectedPatient[0].LastName}, {location.state.selectedPatient[0].FirstName}</h1>
					<img src="../src/assets/PrescriptionAssets/user.png" alt="" className="flex ml-4"/>
				</div>
			</Card>

			{/*Primary Display*/}
			<Card className="w-full sm:w-2/3">
				<CardHeader>
					<CardTitle>Prescription Request</CardTitle>
					<CardDescription>What medication is to be requested?</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="table w-full gap-4">
							<div className="table-row">
								<Label htmlFor="patientName" className="table-cell " >Patient Name:</Label>
								<Input id="patientName" placeholder="Name patient" className="table-cell col"/>
							</div>
							<div className="table-row">
								<Label htmlFor="orderBy" className="table-cell">Ordered By:</Label>
								<Input id="orderBy" placeholder="Physician name" className="flex"/>
							</div>
							<div className="table-row">
								<Label htmlFor="prescription" className="table-cell" >Prescription Name:</Label>
								<Input id="prescription" placeholder="Presciption to be filled" className="flex"/>
							</div>
							<div className="table-row">
								<Label htmlFor="dosage" className="table-cell">Dosage:</Label>
								<div className='flex flex-row'>
								<Input id="dosage" placeholder="Dosage"/>
								<Select>
								<SelectTrigger className="w-20">
									<SelectValue placeholder="Units" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
									<SelectLabel></SelectLabel>
									<SelectItem value="milligrams">mg</SelectItem>
									<SelectItem value="milliliters">ml</SelectItem>
									</SelectGroup>
								</SelectContent>
								</Select>
								</div>

							</div>
							<div className="table-row">
								<Label htmlFor="notes" className="table-cell">Notes:</Label>
								<Textarea id="notes" placeholder="Important Notes" className="focus-visible:ring-0"/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex sm:justify-center">
					<Button className="w-full sm:w-1/3" onClick={()=> request(location.state.selectedPatient[0])}>Request</Button>
				</CardFooter>
			</Card>
			
		</div>
	)
}

export default PrescriptionRequestPage;
