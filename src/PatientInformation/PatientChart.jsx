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



/* Shows Individual Patient Dashboard layout*/
export function PatientChart(){
    return(
        <>
        <Card className="w-full sm:w-2/3">
            <CardHeader>
                <CardTitle>Patient Chart</CardTitle>
            </CardHeader>
            <CardContent>

                <table className='table w-full'>

                    {/*General Info*/}
                    <tr className='table-row h-10'>
                        <td htmlFor="generalInfo" className="table-cell font-bold text-md">Medical Information:</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">First Name:</td>
                        <td className='table-cell w-1/3'>FName</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Last Name:</td>
                        <td className='table-cell w-1/3'>LName</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Date of Birth:</td>
                        <td className='table-cell w-1/3'>bday</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Sex at birth:</td>
                        <td className='table-cell w-1/3'>psex</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Address:</td>
                        <td className='table-cell w-1/3'>Address</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">City:</td>
                        <td className='table-cell w-1/3'>city</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Emergency Contact:</td>
                        <td className='table-cell w-1/3'>contact</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Emergency Contact Phone:</td>
                        <td className='table-cell w-1/3'>EC phone</td>
                    </tr>


                    <tr className='table-row h-10'>
                        <td htmlFor="generalInfo" className="table-cell font-bold text-md">Family Illness History:</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">First Name:</td>
                        <td className='table-cell w-1/3'>FName</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Last Name:</td>
                        <td className='table-cell w-1/3'>LName</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Date of Birth:</td>
                        <td className='table-cell w-1/3'>bday</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Sex at birth:</td>
                        <td className='table-cell w-1/3'>psex</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Address:</td>
                        <td className='table-cell w-1/3'>Address</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">City:</td>
                        <td className='table-cell w-1/3'>city</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Emergency Contact:</td>
                        <td className='table-cell w-1/3'>contact</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Emergency Contact Phone:</td>
                        <td className='table-cell w-1/3'>EC phone</td>
                    </tr>
                </table>
            </CardContent>
        </Card>
        </>
    );    

}

export default PatientChart