import '../globals.css'
import {Card} from "../components/ui/card"
import { Button } from '../components/ui/button';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import PatientChart from '../PatientInformation/PatientChart'
import { useState } from 'react';
import PrescriptionPage from '../PrescriptionPage/PrescriptionPage';
import PatientInformation from '../PatientInformation/PatientInformation';
import PatientLabs from '../PatientLabs/PatientLabs';
import arrow from './PatientDashboardAssets/arrow.png'
import lab from './PatientDashboardAssets/lab.png'
import clipboard from './PatientDashboardAssets/clipboard.png'
import info from './PatientDashboardAssets/info.png'
import menu from './PatientDashboardAssets/menu.png'
import pill from './PatientDashboardAssets/pill.png'
import user from './PatientDashboardAssets/user.png'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  


export function PatientDashboard() {
	const[display,setDisplay] = useState(<PatientInformation/>);


    // Function showing what patient tab is selected by changing background color
    function currentOpenTab(e){
        const tabs = document.querySelectorAll('.menuItem');
        tabs.forEach( tab => tab.classList.add('bg-white'));
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
                        <img src={user} alt="" className="m-2"/>
                    </div>

                    {/*Hamburger Menu*/}
                    <div className="flex flex-row justify-between md:hidden w-full">
                    <Drawer>
                            <DrawerTrigger><img src={menu} alt="" className='m-2'/></DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                <DrawerTitle>What would you like to do?</DrawerTitle>
                                </DrawerHeader>
                                <DrawerFooter>
                                    <Button>Search Patient</Button>
                                    <Button>View Schedule</Button>
                                    <Button>Logout</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                            </Drawer>
                        <img src={user} alt="" className='m-2'/>
                    </div>
                </div>

                {/*Patient info and backspace header*/}
                <Card className="flex flex-row w-full sm:w-2/3 items-center sticky">
                    <Card className="flex w-fit hover:bg-slate-100">
                        <img src={arrow} alt="not found" className="w-10 p-2"/>
                    </Card>
                    <div id="patientInfo" className="flex flex-row m-2">
                        <h1>Patient Name</h1>
                        <img src={user} alt="" className="flex ml-4"/>
                    </div>
                </Card>

                {/*Patient info selections header*/}
                <Card className="flex flex-row  sm:w-2/3 w-full justify-evenly mt-2 h-auto sticky" id="selectionHeader"> {/*Container*/}

                    {/*Patient Information*/}
                    <Card className="flex w-fit hover:bg-slate-100">
                        <button className="bg-slate-100 hover:bg-slate-100 rounded-md menuItem" id='patientInfo' onClick={(e)=> {setDisplay(<PatientInformation/>);currentOpenTab(e)}}>
                            <img src={info} alt="not found" className="w-10 p-2"/>
                        </button>
                    </Card>

                    {/*Patient Chart*/}
                    <Card className="flex w-fit hover:bg-slate-100">
                        <button className="bg-white hover:bg-slate-100 rounded-md menuItem" id="patientChart" onClick={(e)=> {setDisplay(<PatientChart/>); currentOpenTab(e)}}>
                            <img src={clipboard} alt="not found" className="w-10 p-2"/>
                        </button>
                    </Card>

                    {/*Prescriptions*/}
                    <Card className="flex w-fit hover:bg-slate-100">
                        <button className="bg-white hover:bg-slate-100 rounded-md menuItem" onClick={(e)=> {setDisplay(<PrescriptionPage/>); currentOpenTab(e)}}>
                            <img src={pill} alt="not found" className="w-10 p-2"/>
                        </button>
                    </Card>

                    {/*Labs*/}
                    <Card className="flex w-fit hover:bg-slate-100">
                        <button className="bg-white hover:bg-slate-100 rounded-md menuItem" onClick={(e)=>{ setDisplay(<PatientLabs/>);currentOpenTab(e)}}>
                            <img src={lab} alt="not found" className="w-10 p-2"/>
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
