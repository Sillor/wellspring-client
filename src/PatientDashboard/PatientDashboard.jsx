import '../globals.css'
import {Card} from "../components/ui/card"
import {Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import Accordion from "../components/Accordion"
import PatientChart from '../PatientInformation/PatientChart'
import { useState } from 'react';
import PrescriptionPage from '../PrescriptionPage/PrescriptionPage';
import PatientInformation from '../PatientInformation/PatientInformation';
import PatientLabs from '../PatientLabs/PatientLabs';
  


export function PatientDashboard() {


	const[display,setDisplay] = useState(<PatientInformation/>);

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
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}><button>Logout</button></NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <img src="../src/assets/PrescriptionAssets/user.png" alt="" className="m-2"/>
                    </div>

                    {/*Hamburger Menu*/}
                    <div className="flex flex-row justify-between md:hidden w-full ">
                        <Accordion/>
                    </div>
                </div>

                {/*Patient info and backspace header*/}
                <Card className="flex flex-row w-full sm:w-2/3 items-center sticky">
                    <Card className="flex w-fit hover:bg-slate-100">
                        <img src="../src/assets/PrescriptionAssets/arrow.png" alt="not found" className="w-10 p-2"/>
                    </Card>
                    <div id="patientInfo" className="flex flex-row m-2">
                        <h1>Patient Name</h1>
                        <img src="../src/assets/PrescriptionAssets/user.png" alt="" className="flex ml-4"/>
                    </div>
                </Card>

                {/*Patient info selections header*/}
                <Card className="flex flex-row  sm:w-2/3 w-full justify-evenly mt-2 h-auto sticky" id="selectionHeader"> {/*Container*/}

                    {/*Patient Information*/}
                    <Card className="flex w-fit hover:bg-slate-100">
                        <button className="bg-slate-100 hover:bg-slate-100 rounded-md menuItem" id='patientInfo' onClick={(e)=> {handleColor(e);setDisplay(<PatientInformation/>)}}>
                            <img src="../src/assets/PatientInformationAssets/info.png" alt="not found" className="w-10 p-2"/>
                        </button>
                    </Card>

                    {/*Patient Chart*/}
                    <Card className="flex w-fit hover:bg-slate-100">
                        <button className="bg-white hover:bg-slate-100 rounded-md menuItem" id="patientChart" onClick={(e)=> {setDisplay(<PatientChart/>);handleColor(e)}}>
                            <img src="../src/assets/PatientInformationAssets/clipboard.png" alt="not found" className="w-10 p-2"/>
                        </button>
                    </Card>

                    {/*Prescriptions*/}
                    <Card className="flex w-fit hover:bg-slate-100">
                        <button className="bg-white hover:bg-slate-100 rounded-md menuItem" onClick={(e)=> {handleColor(e);setDisplay(<PrescriptionPage/>)}}>
                            <img src="../src/assets/PatientInformationAssets/pill.png" alt="not found" className="w-10 p-2"/>
                        </button>
                    </Card>

                    {/*Labs*/}
                    <Card className="flex w-fit hover:bg-slate-100">
                        <button className="bg-white hover:bg-slate-100 rounded-md menuItem" onClick={(e)=>{handleColor(e); setDisplay(<PatientLabs/>)}}>
                            <img src="../src/assets/PatientInformationAssets/lab.png" alt="not found" className="w-10 p-2"/>
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

export default PatientDashboard
