import '../globals.css'
import { Button } from "../components/ui/button"
import {Link } from "react-router-dom";
import { Menu, PaintBucket } from "lucide-react";
import { User } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card"

import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import PrescriptionTab from './PrescriptionTab';
import { useState } from 'react';


export function PrescriptionPage(props) {

	const location = useLocation();

    const [displayCurrent,setDisplayCurrent] = useState([]);
    const [displayPrevious,setDisplayPrevious] = useState([]);


    useEffect(() => {
        let tempCurr = []
        let tempPrev = []
        fetch('http://152.44.224.138:5174/prescriptions', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        },)
        .then((res) => (res.json()))
        .then( (prescriptions) => {
            prescriptions.forEach(prescription => {
                if(prescription.Patientid === props.data[0].id && prescription.Active === 'yes'){
                    tempCurr = [...tempCurr, <PrescriptionTab prescription={prescription} data={props.data} key={tempCurr.length}/>];
                }
                else if(prescription.Patientid === props.data[0].id && prescription.Active === 'no'){
                    tempPrev = [...tempPrev, <PrescriptionTab prescription={prescription} data={props.data} key={tempCurr.length}/>];
                }
            });
            setDisplayCurrent(tempCurr)
            setDisplayPrevious(tempPrev)
        })
    },[])

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
				<CardContent className="">
				
				{displayCurrent}

				</CardContent>
				<CardHeader>
					<CardTitle className="text-md">Previous Prescription Information:</CardTitle>
				</CardHeader>
				<CardContent>

				{displayPrevious}

				</CardContent>
				<CardFooter className="flex sm:justify-center">
                <Link to={"/prescriptioninfo/request"} state={{selectedPatient:location.state.selectedPatient}} className=" sm:w-1/3 w-full">
                    <Button className="w-full" >Request</Button>
                </Link>
				</CardFooter>
			</Card>
		</>
	)
}

export default PrescriptionPage
