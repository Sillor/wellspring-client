import '../globals.css'
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
import { Button } from '../components/ui/button'


/* Shows Individual Patient Dashboard layout*/
export function PatientLabs(){
    return (
        <>
        <Card className="w-full sm:w-2/3">
            <CardHeader>
                <CardTitle>Patient's Lab Reports</CardTitle>
                <CardDescription>Lab History & Information</CardDescription>

            </CardHeader>
            <CardContent className="flex flex-col justify-between gap-10">
            <table className='table justify-between w-full border-separate'>
					<tbody>
						<tr className='table-row w-full h-10 border-spacing-y-3'>	
							<td htmlFor="generalInfo" className="table-cell w-1/2 font-bold">Procedure Name:</td>
							<td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Ordered By:</td>
                            <td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Date:</td>
						</tr>

						<tr className='table-row h-4'>	
							<td htmlFor="generalInfo" className="table-cell w-auto">Labotomy</td>
							<td className='table-cell w-1/3'>Dr. self</td>
							<td className='table-cell w-1/3'>12/25/13</td>
						</tr>
                        <tr>
                            <td>Notes:</td>
                            <td>Patient something something notes of something else.</td>
                        </tr>

						<tr className='table-row w-full h-10 border-spacing-y-3'>	
							<td htmlFor="generalInfo" className="table-cell w-1/2 font-bold">Procedure Name:</td>
							<td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Ordered By:</td>
                            <td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Date:</td>
						</tr>

						<tr className='table-row h-4'>	
							<td htmlFor="generalInfo" className="table-cell w-auto">Apendectimy</td>
							<td className='table-cell w-1/3'>Dr. ME</td>
							<td className='table-cell w-1/3'>8/25/13</td>
						</tr>
                        <tr>
                            <td>Notes:</td>
                            <td>Removed parts</td>
                        </tr>
                        

                        
					</tbody>
				</table>


            </CardContent>
            <CardFooter className="flex sm:justify-center">
                    <div className='sm:w-1/3 w-full'>
                        <Button className="w-full" >Request</Button>
                    </div>
                </CardFooter>
        </Card>
        </>
    );    

}

export default PatientLabs