import '../globals.css'
import { Button } from "../components/ui/button"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"

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
import { Textarea } from "@/components/ui/textarea"
import Accordion from "../components/Accordion"
  

export function PrescriptionRequestPage() {

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
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>Search Patient</NavigationMenuLink>
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
					<Button className="w-full sm:w-1/3" >Request</Button>
				</CardFooter>
			</Card>
			
		</div>
	)
}

export default PrescriptionRequestPage
