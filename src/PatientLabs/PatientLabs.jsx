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
    return(
        <>
        <Card className="w-full sm:w-2/3">
        <CardHeader>
            <CardTitle>Patient's Lab Reports</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='table w-full'>
                <div className='table-row h-10'>
                    <Label htmlFor="generalInfo" className="table-cell font-bold text-md">Recent Labs:</Label>
                </div>
                <div className='table-row'>
                    <Label htmlFor="generalInfo" className="table-cell text-center w-auto">First Name:</Label>
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
            </div>

            <CardFooter className="flex sm:justify-center">
                <div className='sm:w-1/3 w-full'>
                    <Button className="w-full" >Request</Button>
                </div>
			</CardFooter>
        </CardContent>
    </Card>
    </>
    );    

}

export default PatientLabs