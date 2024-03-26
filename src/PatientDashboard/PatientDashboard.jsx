import '../globals.css'
import { Card } from "../components/ui/card"
import { Link } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import Accordion from "../components/Accordion"
import PatientChart from '../PatientInformation/PatientChart'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PrescriptionPage from '../PrescriptionPage/PrescriptionPage';
import PatientInformation from '../PatientInformation/PatientInformation';
import PatientLabs from '../PatientLabs/PatientLabs';
import axios from 'axios';



export function PatientDashboard() {


    const [display, setDisplay] = useState(<PatientInformation />);

    var token = localStorage.getItem('token');
    const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated") || false);


    // useEffect(() => {
    //     if (loggedInUser) {
    //         setauthenticated(loggedInUser);
    //     }
    // }, []);
    const handleNewUser = (e) => {
        fetch('https://wellspring.pfc.io:5175/createuser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ Username: 'webcreated', Password: 'webpass', Email: 'newemail', First_Name: 'firstname', Surname: 'surname', Role: "leader"})
        })
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('authenticated');
        setauthenticated(false);
    };


    /* Handles menu item color changes for menu selection*/     /*<-- Better way to do this rather than straight DOM manipulation? */
    const handleColor = (e) => {
        const container = document.querySelectorAll('.menuItem');
        container.forEach(node => {
            node.classList.add('bg-white');
            node.classList.remove('bg-slate-100');
        })
        e.target.parentNode.classList.add('bg-slate-100')
        e.target.parentNode.classList.remove('bg-white')
    }

    if (!authenticated) {
        console.log(authenticated);
        return <Navigate replace to="/login" />;
    } else {

        return (
            <div className="flex flex-col items-center" id="pageContainer"> {/*Primary container*/}

                {/*Header for navigation*/}
                <div className='w-full flex flex-col items-center top-0 sticky bg-white'>

                    {/*User header*/}
                    <div className="flex w-full mx-2 sticky " id="userHeader">

                        {/*Navigation menu for large screen */}
                        <div className="hidden md:flex w-full justify-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}><button>View Schedule List</button></NavigationMenuLink>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}><button>Search for patient</button></NavigationMenuLink>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}><button onClick={(e) => handleLogout(e)}>Logout</button></NavigationMenuLink>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}><button onClick={(e) => handleNewUser(e)}>New User</button></NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <img src='/PrescriptionAssets/user.png' alt="" className="m-2" />
                        </div>

                        {/*Hamburger Menu*/}
                        <div className="flex flex-row justify-between md:hidden w-full ">
                            <Accordion />
                        </div>
                    </div>

                    {/*Patient info and backspace header*/}
                    <Card className="flex flex-row w-full sm:w-2/3 items-center sticky">
                        <Card className="flex w-fit hover:bg-slate-100">
                            <img src="/PrescriptionAssets/arrow.png" alt="not found" className="w-10 p-2" />
                        </Card>
                    </Card>

                    {/*Patient info selections header*/}
                    <Card className="flex flex-row  sm:w-2/3 w-full justify-evenly mt-2 h-auto sticky" id="selectionHeader"> {/*Container*/}

                        {/*Patient Information*/}
                        <Card className="flex w-fit hover:bg-slate-100">
                            <button className="bg-slate-100 hover:bg-slate-100 rounded-md menuItem" id='patientInfo' onClick={(e) => { handleColor(e); setDisplay(<PatientInformation />) }}>
                                <img src="/PatientInformationAssets/info.png" alt="not found" className="w-10 p-2" />
                            </button>
                        </Card>

                        {/*Patient Chart*/}
                        <Card className="flex w-fit hover:bg-slate-100">
                            <button className="bg-white hover:bg-slate-100 rounded-md menuItem" id="patientChart" onClick={(e) => { setDisplay(<PatientChart />); handleColor(e) }}>
                                <img src="/PatientInformationAssets/clipboard.png" alt="not found" className="w-10 p-2" />
                            </button>
                        </Card>

                        {/*Prescriptions*/}
                        <Card className="flex w-fit hover:bg-slate-100">
                            <button className="bg-white hover:bg-slate-100 rounded-md menuItem" onClick={(e) => { handleColor(e); setDisplay(<PrescriptionPage />) }}>
                                <img src="/PatientInformationAssets/lab.png" alt="not found" className="w-10 p-2" />
                            </button>
                        </Card>

                        {/*Labs*/}
                        <Card className="flex w-fit hover:bg-slate-100">
                            <button className="bg-white hover:bg-slate-100 rounded-md menuItem" onClick={(e) => { handleColor(e); setDisplay(<PatientLabs />) }}>
                                <img src="/PatientInformationAssets/lab.png" alt="not found" className="w-10 p-2" />
                            </button>
                        </Card>
                    </Card>
                </div>


                {/*Primary Display*/}

                <div className='flex flex-col items-center w-full'>
                    {display}
                </div>

            </div>
        )
    }
}

export default PatientDashboard
