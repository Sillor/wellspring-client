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
	
	/*Color seperation for each table row*/
	const colorSeparation = ()=>{
		const table = document.querySelectorAll('.table-row')
		for (let i = 0; i < table.length; i++) {
			if(i % 2 === 0){
				table.classList.add('bg-slate-100')
			}
		}
	}

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

				<table className='table m-6 justify-between'>
					<div className='table-row w-full'>	
						<Label htmlFor="generalInfo" className="table-cell w-1/2">MedicalName:</Label>
						<Label htmlFor="generalInfo" className="table-cell w-1/3">Dose Given:</Label>
						<Label htmlFor="generalInfo" className="table-cell w-1/3">Date Ordered:</Label>
					</div>
					<div className='table-row'>	
						<Label htmlFor="generalInfo" className="table-cell w-auto">Acetaminophen:</Label>
						<p className='table-cell w-1/3'>300mg</p>
						<p className='table-cell w-1/3'>12/25/13</p>
					</div>
					<div className='table-row'>	
						<Label htmlFor="generalInfo" className="table-cell w-auto">Promethazine:</Label>
						<p className='table-cell w-1/3'>500mg</p>
						<p className='table-cell w-1/3'>2/6/13</p>
					</div>
					<div className='table-row'>	
						<Label htmlFor="generalInfo" className="table-cell w-auto">Lexapro:</Label>
						<p className='table-cell w-1/3'>50mg</p>
						<p className='table-cell w-1/3'>6/10/15</p>
					</div>
				</table>
				{colorSeparation}
	
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
