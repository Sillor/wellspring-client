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




export function PatientInformation() {

	return (
		<>
	<Card className="w-full sm:w-2/3 overflow-hidden">
        <CardHeader>
            <CardTitle>Patient Information:</CardTitle>
        </CardHeader>
        <CardContent className=''> {/* overfloew and hieght here 500px */}
            <div className='table w-full'>

				{/*General Info*/}
                <div className='table-row h-10'>
                    <Label htmlFor="generalInfo" className="table-cell font-bold text-md">General Information:</Label>
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

			<div className='table w-full mt-10'>
				{/*Emergency Contact Info */}
				<div className='table-row h-10 align-bottom '>
                    <Label htmlFor="generalInfo" className="table-cell font-bold text-md">Emergency Contact Information:</Label>
                </div>
                <div className='table-row'>
                    <Label htmlFor="generalInfo" className="table-cell text-center w-auto">Contact First Name:</Label>
                    <p className='table-cell w-1/3'>FName</p>
                </div>
                <div className='table-row'>
                    <Label htmlFor="generalInfo" className="table-cell text-center w-auto">Contact Last Name:</Label>
                    <p className='table-cell w-1/3'>LName</p>
                </div>
                <div className='table-row'>
                    <Label htmlFor="generalInfo" className="table-cell text-center w-auto">Contact Address:</Label>
                    <p className='table-cell w-1/3'>Address</p>
                </div>
                <div className='table-row'>
                    <Label htmlFor="generalInfo" className="table-cell text-center w-auto">City:</Label>
                    <p className='table-cell w-1/3'>city</p>
                </div>
                <div className='table-row'>
                    <Label htmlFor="generalInfo" className="table-cell text-center w-auto">Emergency Contact Realtion:</Label>
                    <p className='table-cell w-1/3'>contact</p>
                </div>
                <div className='table-row'>
                    <Label htmlFor="generalInfo" className="table-cell text-center w-auto">Emergency Contact Phone:</Label>
                    <p className='table-cell w-1/3'>EC phone</p>
                </div>
			</div>
        </CardContent>
    </Card>
		</>
	)
}

export default PatientInformation
