import '../globals.css'
import { Button } from "../components/ui/button"
import arrow from './PrescriptionAssets/arrow.png'
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
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import { Textarea } from "@/components/ui/textarea"
import { Link } from 'react-router-dom'
import menu from './PrescriptionAssets/menu.png'
import user from './PrescriptionAssets/user.png'
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

export function PrescriptionRequestPage() {

	return (
		<div className="flex flex-col items-center gap-2" id="pageContainer"> {/*Primary container*/}

			{/*User header*/}
			<div className="flex w-full mx-2 sticky " id="userHeader">

				{/*Navigation menu for large screen */}
				<div className="hidden md:flex w-full justify-center">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/'}>View Schedule List</Link></NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/search'}>Search Patient</Link></NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/'}>Logout</Link></NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<img src={user} alt="" className="m-2" />
				</div>

				{/*Hamburger Menu*/}
				<div className="flex flex-row justify-between md:hidden w-full">
					<Drawer>
						<DrawerTrigger><img src={menu} alt="" className='m-2' /></DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>What would you like to do?</DrawerTitle>
							</DrawerHeader>
							<DrawerFooter>
								<Link to={'/search'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Search Patient</Link>
								<Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">View Schedule</Link>
								<Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Logout</Link>
								<DrawerClose asChild>
									<Button variant="outline" classList='inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium'>Cancel</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
					<img src={user} alt="" className='m-2' />
				</div>
			</div>

			{/*Patient info and backspace header*/}
			<Card className="flex flex-row w-full sm:w-2/3 items-center">
				<Card className="flex w-fit hover:bg-slate-100">
					<Link to={"/dashboard/prescriptioninfo"}>
						<img src={arrow} alt="not found" className="w-10 p-2"/>
					</Link>				
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
					<Button className="w-full sm:w-1/3">Request</Button>
				</CardFooter>
			</Card>
			
		</div>
	)
}

export default PrescriptionRequestPage
