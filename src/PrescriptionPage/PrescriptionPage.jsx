import '../globals.css'
import { Button } from "../components/ui/button"
import {Link } from "react-router-dom";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card"

export function PrescriptionPage(props) {
	
	/*Color seperation for each table row*/

	return (
		<>
			{/*Primary Display*/}
			<Card className="w-full sm:w-2/3">
				<CardHeader>
					<CardTitle>Patient Prescriptions</CardTitle>
					<CardDescription>Prescription History</CardDescription>
				</CardHeader>
				<CardHeader>
					<CardTitle className="text-md">Current Prescription Information:</CardTitle>
				</CardHeader>
				<CardContent>
				<table className='table justify-between w-full'>
					<tbody>
						<tr className='table-row w-full h-10'>	
							<td htmlFor="generalInfo" className="table-cell w-1/2 font-bold">Medical Name:</td>
							<td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Dose:</td>
							<td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Ordered:</td>
						</tr>
						<tr className='table-row'>	
							<td htmlFor="generalInfo" className="table-cell w-auto">{props.data[0].Prescriptions}</td>
							<td className='table-cell w-1/3'>300mg</td>
							<td className='table-cell w-1/3'>12/25/13</td>
						</tr>
					</tbody>
				</table>

				</CardContent>
				<CardHeader>
					<CardTitle className="text-md">Previous Prescription Information:</CardTitle>
				</CardHeader>
				<CardContent>
				<table className='table justify-between w-full'>
					<tbody>
						<tr className='table-row w-full h-10'>	
							<td htmlFor="generalInfo" className="table-cell w-1/2 font-bold">Medical Name:</td>
							<td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Dose:</td>
							<td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Ordered:</td>
						</tr>
						<tr className='table-row'>	
							<td htmlFor="generalInfo" className="table-cell w-auto">{props.data[0].PrescriptionHistory}</td>
							<td className='table-cell w-1/3'>300mg</td>
							<td className='table-cell w-1/3'>12/25/13</td>
						</tr>
						<tr className='table-row'>	
							<td htmlFor="generalInfo" className="table-cell w-auto">Promethazine:</td>
							<td className='table-cell w-1/3'>500mg</td>
							<td className='table-cell w-1/3'>2/6/13</td>
						</tr>
					</tbody>
				</table>

				</CardContent>
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
