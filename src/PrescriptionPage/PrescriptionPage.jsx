import '../globals.css'
import { Button } from "../components/ui/button"
import {Link } from "react-router-dom";
import { Label } from '@radix-ui/react-label';


import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card"

export function PrescriptionPage() {

	return (
		<>
			{/*Primary Display*/}
			<Card className="w-full sm:w-2/3">
				<CardHeader>
					<CardTitle>Patient Prescriptions</CardTitle>
					<CardDescription>List of names meds</CardDescription>
				</CardHeader>
				<CardHeader>
					<CardTitle className="text-md">Prescription Information:</CardTitle>
				</CardHeader>

				<table>
					<div className='table-row'>	
						<Label htmlFor="generalInfo" className="table-cell w-auto">MedicalName:</Label>
						<Label htmlFor="generalInfo" className="table-cell w-auto">Dose Given:</Label>
						<Label htmlFor="generalInfo" className="table-cell w-auto">Date Ordered:</Label>
					</div>
					<div className='table-row'>	
						<Label htmlFor="generalInfo" className="table-cell w-auto">First Name:</Label>
						<p className='table-cell w-1/3'>FName</p>
					</div>
					<div className='table-row'>
						<Label htmlFor="generalInfo" className="table-cell text-center w-auto">Last Name:</Label>
						<p className='table-cell w-1/3'>LName</p>
					</div>
					<div className='table-row'>
						<Label htmlFor="generalInfo" className="table-cell text-center w-auto">Date of Birth:</Label>
						<p className='table-cell w-1/3'>bday</p>
					</div>
					<div className='table-row'>
						<Label htmlFor="generalInfo" className="table-cell text-center w-auto">Sex at birth:</Label>
						<p className='table-cell w-1/3'>psex</p>

						</div>
					<div className='table-row'>
						<Label htmlFor="generalInfo" className="table-cell text-center w-auto">Address:</Label>
						<p className='table-cell w-1/3'>Address</p>
					</div>
					<div className='table-row'>
						<Label htmlFor="generalInfo" className="table-cell text-center w-auto">City:</Label>
						<p className='table-cell w-1/3'>city</p>
					</div>
					<div className='table-row'>
						<Label htmlFor="generalInfo" className="table-cell text-center w-auto">Emergency Contact:</Label>
						<p className='table-cell w-1/3'>contact</p>
					</div>
					<div className='table-row'>
						<Label htmlFor="generalInfo" className="table-cell text-center w-auto">Emergency Contact Phone:</Label>
						<p className='table-cell w-1/3'>EC phone</p>
					</div>

				</table>

	
				<CardFooter className="flex sm:justify-center">
                <Link to={"/prescriptioninfo/request"} className=" sm:w-1/3 w-full">
                    <Button className="w-full" >Request</Button>
                </Link>
				</CardFooter>
			</Card>
		</>
	)
}

export default PrescriptionPage
