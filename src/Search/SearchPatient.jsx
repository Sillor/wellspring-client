import '../globals.css'
import { Input } from '../components/ui/input'
import searchIcon from './SearchAssets/search.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card } from '../components/ui/card'

import menu from '../PatientDashboard/PatientDashboardAssets/menu.png'
import user from '../PatientDashboard/PatientDashboardAssets/user.png'
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

export default function SearchFunction(){

    //Call data before routed to dashboard
	const [data, setData] = useState([]);
    const [search, setSearch]  = useState([]);

    const [display, setDisplay] = useState([]);

    //Fetch data on page load
	useEffect(() => {
		fetch('https://152.44.224.138:5174/patients', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		}, [data])
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'success') {
					localStorage.setItem('token', data.token)
					setData(data.patients);
				}
				else {
					alert(data.message)
				}
			})
	})


    /* Search functionality */
    function onSearch(patientName) {            //TODO: Search is 1 character behind
        //Clear state data on each call
        setDisplay([])
        setSearch([])

        //Filter through patient list
        data.filter((patient) => {
            const pattern = new RegExp('^' + patientName.target.value, 'i')
    
            //If Last name matches add to search array state
            if (patient.LastName.match(pattern)) {

                setSearch(search => [...search, patient])     
            }
        })

        //Clear all if empty
        if (patientName.target.value === '') {
            setSearch([])
            return;
        }

        //Map over each element in search array and create individual tab component
        search.map((patient) => (
            setDisplay(display => [...display, <PatientTab key={patient.id} patient={patient} />])
        ))
    }


    return(
        <>
            {/*User header*/}
            <div className="flex w-full mx-2 sticky " id="userHeader">

                {/*Navigation menu for large screen */}
                <div className="hidden md:flex w-full justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/'}>View Schedule List</Link></NavigationMenuLink>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/search'}>Search Patient</Link></NavigationMenuLink>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/'}>Logout</Link></NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <img src={user} alt="" className="m-2" />
                </div>

                {/*Hamburger Menu*/}
                <div className="flex flex-row justify-between md:hidden w-full">
                    <Drawer>
                        <DrawerTrigger><img src={menu} alt="" className='m-2' /></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>What would you like to do?</DrawerTitle>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Link to={'/search'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Search Patient</Link>
                                <Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">View Schedule</Link>
                                <Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Logout</Link>
                                <DrawerClose asChild>
                                    <Button variant="outline" classList='inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium'>Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    <img src={user} alt="" className='m-2' />
                </div>
            </div>
            <div className='flex flex-col w-screen h-screen justify-center items-center gap-5'>
                <h2 className='float-end text-3xl'>Patient Search</h2>
                <div className='flex justify-center w-full'>
                    <img src={searchIcon} alt="" className='flex w-6 h-6 mt-2' />
                    <Input className='flex w-1/2 input' id='input' placeholder="Patient Name" type='text' onChange={(value) => onSearch(value)}></Input>
                </div>

                <div className='flex flex-col h-1/3 w-2/3 justify-start overflow-y-scroll' id='resultsDiv'>
                    {display}
                </div>

            </div>

        </>



    )
}