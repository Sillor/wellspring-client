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
import LabTab from './LabTab'
import { useEffect, useState } from 'react'


/* Shows Individual Patient Dashboard layout*/
export function PatientLabs(props){
    const [display,setDisplay] = useState([]);

    useEffect(() => {
        let temp = []
        fetch('http://152.44.224.138:5174/labs', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        },)
        .then((res) => (res.json()))
        .then( (labs) => {
            labs.forEach(lab => {
                if(lab.Patientid === props.data[0].id){
                    temp = [...temp, <LabTab lab={lab} data={props.data} key=''/>];
                }
            });
            setDisplay(temp)
        })
    },[])

    return (
        <>
        <Card className="w-full sm:w-2/3">
            <CardHeader>
                <CardTitle>Patient's Lab Reports</CardTitle>
                <CardDescription>Lab History & Information</CardDescription>

            </CardHeader>
            <CardContent className="flex flex-col justify-between gap-10">
            
            {display}

            </CardContent>
            <CardFooter className="flex w-full justify-center ">
                    <div className='w-full justify-center md:w-1/3'>
                        <Button className="w-full" >Request</Button>
                    </div>
                </CardFooter>
        </Card>
        </>
    );    

}

export default PatientLabs