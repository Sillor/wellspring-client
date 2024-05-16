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
import '../globals.css'
import { Input } from "../components/ui/input"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";
import emailjs from '@emailjs/browser'

function sendMail(code) {
    var params = {code: code}

    emailjs
      .send('service_wellspring', 'template_wellspring', params,'lYZsvBVCuWFju6Aic')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        () => {
            //
        },
      );
}
function inviteDoctor(){
    let code = makeid(8)
    fetch('http://152.44.224.138:5174/updatedoctorcode', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({id:"49710D95-05A9-477B-B8B8-5F5FD0DFE2C3", activecode: code, invitedby: localStorage.getItem('user') })
    },)

    .then((res) => res.json())
    .then((res) => {
        if(res.message === 'success'){
            sendMail(code)
            document.getElementById('inputBox').classList.toggle('flex')
        }
    })
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

//console.log(makeid(8));

function AdminTools(){
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
							<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/newpatient'}>New Patient</Link></NavigationMenuLink>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild><Link to={'/newappointment'}>New Appointment</Link></NavigationMenuLink>
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
                                <Link to={'/main'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">View Schedule</Link>
                                <Link to={'/search'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Search Patient</Link>
                                <Link to={'/newpatient'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">New Patient</Link>
                                <Link to={'/newappointment'} className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">New Appointment</Link>

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
            
            <div className='md:w-full flex flex-col w-screen h-screen justify-center items-center gap-5'>
                <h2 className='float-end text-3xl'>Admin Tools</h2>
                <div className='flex justify-center w-full'>

                </div>

                <div className='flex flex-col h-1/3 w-full justify-center items-center gap-2' id='resultsDiv'>
                    <button className="inline-flex w-1/2 items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90" onClick={()=> document.getElementById('inputBox').classList.toggle('flex')}>Invite Doctor</button>
                        <div id="inputBox" className="inputBox w-1/2 hidden flex-row gap-3">
                            <Input className='flex w-2/3 input' id='input' placeholder="Email of Recipient" name="email" type='text' ></Input>
                            <button className="inline-flex w-1/3 items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90" onClick={inviteDoctor}>Invite</button>
                        </div>
                    <button className="inline-flex w-1/2 items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">Delete User</button>
                </div>

            </div>

        </>
    )
}
export default AdminTools