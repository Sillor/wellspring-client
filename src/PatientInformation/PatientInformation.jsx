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
        <CardContent>

                    <table className='table w-full'>
                        <tbody>
                            {/*General Info*/}
                            <tr className='table-row h-10'>
                                <td htmlFor="generalInfo" className="table-cell font-bold text-md">General Information:</td>
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
                        </tbody>
                    </table>

                    <table className='table w-full mt-5'>
                        <tbody>
                            {/*General Info*/}
                            <tr className='table-row h-10'>
                                <td htmlFor="generalInfo" className="table-cell font-bold text-md">Emergency Contact Information:</td>
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
                                <td htmlFor="generalInfo" className="table-cell text-center w-auto">Address:</td>
                                <td className='table-cell w-1/3'>address</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" className="table-cell text-center w-auto">Relation:</td>
                                <td className='table-cell w-1/3'>relation</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" className="table-cell text-center w-auto">Phone:</td>
                                <td className='table-cell w-1/3'>Address</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" className="table-cell text-center w-auto">City:</td>
                                <td className='table-cell w-1/3'>city</td>
                            </tr>
                        </tbody>
                    </table>

        </CardContent>
    </Card>
		</>
	)
}

export default PatientInformation
