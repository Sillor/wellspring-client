import '../globals.css'
import {Card} from "../components/ui/card"

import {Link } from "react-router-dom";


  import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import Accordion from "../components/Accordion"
import PatientChart from './PatientChart'
  


export function PatientInformation() {

	return (
		<div className="flex flex-col items-center gap-1" id="pageContainer"> {/*Primary container*/}
			{/*User header*/}
			<div className="flex w-full mx-2" id="userHeader">

				{/*Navigation menu for large screen */}
				<div className="hidden md:flex w-full justify-center">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>View Schedule List</NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>Search for patient</NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>Logout</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<img src="../src/assets/PrescriptionAssets/user.png" alt="" className="m-2"/>
				</div>

				{/*Hamburger Menu*/}

				<div className="flex flex-row justify-between md:hidden w-full ">
					<Accordion/>
				</div>
			</div>

			{/*Patient info and backspace header*/}
			<Card className="flex flex-row w-full sm:w-2/3 items-center">
				<Card className="flex w-fit hover:bg-slate-100">
					<img src="../src/assets/PrescriptionAssets/arrow.png" alt="not found" className="w-10 p-2"/>
				</Card>
				<div id="patientInfo" className="flex flex-row m-2">
					<h1>Patient Name</h1>
					<img src="../src/assets/PrescriptionAssets/user.png" alt="" className="flex ml-4"/>
				</div>
			</Card>

            {/*Patient info selections header*/}
			<Card className="flex flex-row  sm:w-2/3 w-full justify-evenly mt-4">
				<Card className="flex w-fit hover:bg-slate-100">
					<img src="../src/assets/PatientInformationAssets/info.png" alt="not found" className="w-10 p-2"/>
				</Card>
                <Card className="flex w-fit hover:bg-slate-100">
					<img src="../src/assets/PatientInformationAssets/clipboard.png" alt="not found" className="w-10 p-2"/>
				</Card>
                <Card className="flex w-fit hover:bg-slate-100">
					<Link to={'prescriptioninfo'}>
						<img src="../src/assets/PatientInformationAssets/pill.png" alt="not found" className="w-10 p-2"/>
					</Link>
				</Card>
                <Card className="flex w-fit hover:bg-slate-100">
					<img src="../src/assets/PatientInformationAssets/lab.png" alt="not found" className="w-10 p-2"/>
				</Card>
			</Card>

			{/*Primary Display*/}
			<PatientChart/>
			
		</div>
	)
}

export default PatientInformation
