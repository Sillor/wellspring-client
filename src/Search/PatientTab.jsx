import '../globals.css'
import { Input } from '../components/ui/input'
import searchIcon from './SearchAssets/search.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { User } from "lucide-react";
import defaultPatientImg from "../components/images/patient_default.jpg";
import Popup from '../components/ui/popup'




export default function PatientTab(props){


    const [ButtonPopup, setButtonPopup] = useState(false);
    const navigate = useNavigate();
    
    const handleButtonClick = () => {
        setButtonPopup(true);
    };
    

    return (
        <div key={props.patient.id} className="border p-4 rounded-md mb-4">
        <Button
            variant="outline"
            className="schedule-btn"
            onClick={() => handleButtonClick(props.patient)}
        >
            <img
                src={defaultPatientImg}
                alt="Default image for patients"
                className="patientImage"
            />
            <div>
                <h1> {props.patient.LastName},{props.patient.FirstName}</h1>
                <p></p>
            </div>
        </Button>
        {props.patient && (
            <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
                <h1 className="text-xl font-bold">{props.patient.LastName}, {props.patient.FirstName}</h1>

                {/* Weird stuff happens when Link instead of button*/}
                <button onClick={ ()=>{ navigate('/dashboard', {state : [props.patient]} ) } } className="flex float-end border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 w-36 justify-center text-center items-center rounded-lg">Patient Chart</button>
            </Popup>
        )}
    </div>)
    
}