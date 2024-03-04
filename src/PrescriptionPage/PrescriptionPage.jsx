import * as React from "react"
import '../globals.css'
import { useState } from "react"
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
  


export function PrescriptionPage() {

	return (
		<div className="flex flex-col items-center gap-1 mx-2 md:mx-0" id="pageContainer"> {/*Primary container*/}



			{/*User header*/}
			<div className="flex w-full" id="userHeader">

				{/*Navigation menu for large screen */}
				<div className="hidden md:flex w-full justify-between">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>Patient Chart</NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>Patient Chart</NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>Patient Chart</NavigationMenuLink>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>Patient Chart</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<img src="../src/assets/PrescriptionAssets/user.png" alt="" className="m-2"/>
				</div>

				{/*Hamburger Menu*/}

				<div className="flex flex-row justify-between md:hidden w-full">
					<Accordion/>
					<img src="../src/assets/PrescriptionAssets/user.png" alt="" className="m-2"/>

				</div>

				
			</div>

			{/*Patient info and backspace header*/}
			<Card className="flex flex-row w-full md:w-2/3 items-center">
				<Card className="flex w-fit">
					<img src="../src/assets/PrescriptionAssets/arrow.png" alt="not found" className="w-10 p-2"/>
				</Card>
				<div id="patientInfo" className="flex flex-row m-2">
					<h1>Patient Name</h1>
					<img src="../src/assets/PrescriptionAssets/user.png" alt="" className="flex ml-4"/>
				</div>
			</Card>

			{/*Primary Display*/}
			<Card className="w-full md:w-2/3">
				<CardHeader>
					<CardTitle>Prescription Request</CardTitle>
					<CardDescription>What medication is to be requested?</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex">
								<Label htmlFor="patientName">Patient Name:</Label>
								<Input id="patientName" placeholder="Name patient" className="flex mr-8"/>
							</div>
							<div className="flex">
								<Label htmlFor="orderBy">Ordered By:</Label>
								<Input id="orderBy" placeholder="Physician name" className="flex mr-10"/>
							</div>
							<div className="flex">
								<Label htmlFor="prescription">Prescription Name:</Label>
								<Input id="prescription" placeholder="Presciption to be filled" className="flex ml-4"/>
							</div>
							<div className="flex">
								<Label htmlFor="dosage">Dosage:</Label>
								<Input id="dosage" placeholder="Dosage" />
								<Select>
								<SelectTrigger className="w-16">
									<SelectValue placeholder="" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
									<SelectLabel>Units</SelectLabel>
									<SelectItem value="milligrams">mg</SelectItem>
									<SelectItem value="milliliters">ml</SelectItem>
									</SelectGroup>
								</SelectContent>
								</Select>

							</div>
							<div className="flex">
								<Label htmlFor="name">Notes:</Label>
								<Textarea id="name" placeholder="Name of your project"/>
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
