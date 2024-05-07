import '../globals.css'
import { Input } from '../components/ui/input'
import searchIcon from './SearchAssets/search.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";

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
  import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu"
import PatientTab from './PatientTab'
import { useLocation } from 'react-router-dom';


export default function SearchFunction(){
    const [searchFiltered, setSearchFiltered] = useState([]);

    //Call data before routed to dashboard
	const [data, setData] = useState([]);
    const [search, setSearch]  = useState("");
    const [display, setDisplay] = useState([]);

    const location = useLocation();
    const handleSearch = (value) => {
        setDisplay([])
        setSearch(value)
    }

    //Fetch data on page load
	useEffect(() => {
		fetch('http://152.44.224.138:5174/patients', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		},)
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'success') {
					setData(data.patients);
				}
				else {
					alert(data.message)
				}
			})

            setSearchFiltered(

                // Filter data array for contents of search state
                data.filter((patient) => {
                    const pattern = new RegExp('^' + search, 'i')

                    //If empty show nothing
                    if(search === ""){
                        setDisplay([])
                    }
                    //If Last name matches add to search array state
                    else if (patient.LastName.match(pattern)) {
                        location.state = {state:{selectedPatient:patient}}
                        console.log(location);
                        setDisplay(display => [...display, <PatientTab key={patient.id} state={patient} />])
                    }
                })
            )
	},[search])




    return(
        <>
            {/*User header*/}
            <div className="flex w-full mx-2 sticky " id="userHeader">

                {/*Navigation menu for large screen */}
                <div className="hidden md:flex w-full justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/main'}>View Schedule List</Link></NavigationMenuLink>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/search'}>Search Patient</Link></NavigationMenuLink>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/admin'}>Admin Tools</Link></NavigationMenuLink>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/'}>Logout</Link></NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <User size={32} className='flex float-end'/>
                </div>

                {/*Hamburger Menu*/}
                <div className="p-4 flex visible md:invisible md:absolute flex-row justify-between w-full">
                    <Drawer>
                        <DrawerTrigger>
                            <Menu size={32}/>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>What would you like to do?</DrawerTitle>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Link to={'/search'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Search Patient</Link>
                                <Link to={'/main'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">View Schedule</Link>
                                <Link to={'/admin'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Admin Tools</Link>

                                <Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Logout</Link>
                                <DrawerClose asChild>
                                    <Button variant="outline" classList='inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium'>Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    <User size={32}/>
                </div>
            </div>
            
            <div className='flex flex-col w-screen h-screen justify-center items-center gap-5'>
                <h2 className='float-end text-3xl'>Patient Search</h2>
                <div className='flex justify-center w-full'>
                    <img src={searchIcon} alt="" className='flex w-6 h-6 mt-2' />
                    <Input className='flex w-1/2 input' id='input' placeholder="Patient Name" type='text' onChange={(e) => {handleSearch(e.target.value)}}></Input>
                </div>

                <div className='flex flex-col h-1/3 w-2/3 justify-start overflow-y-scroll' id='resultsDiv'>
                    {display}
                </div>

            </div>

        </>
    )
}