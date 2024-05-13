import '../globals.css'
import { Button } from "../components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"

  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  
import { useNavigate, useLocation} from "react-router-dom";


import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
"use client"

//Zod schema for form validation
const formSchema = z.object({
    userName:z.string().min(2).max(18),
    firstName: z.string().min(2).max(18),
    lastName: z.string().min(2).max(18),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
    position: z.enum(["Doctor", "Nurse", "Technician", "Pharmacist"]),
    doctorCode: z.string().optional()
    
})
//Error for password matching
.refine((data) => {
    return data.password === data.confirmPassword
}, 
{
    message: "Passwords do not match",
    path:["confirmPassword"],
})

// Check for doctor code if needed
.refine((data) => {
    if(data.position === "Doctor"){
        return !!data.doctorCode;
    }
    return true;
    }, 
    
    {
        message: "Doctor authorization code required",
        path: ["doctorCode"]
    }
)



//Default values for zod form initialization
export default function NewUser() {

    const navigate = useNavigate();

    //Submition to database
    const submitNewUser = (data) => {

        navigate('/')

        fetch('http://152.44.224.138:5174/createuser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ Username: data.userName, Password: data.password, Email: data.email, FirstName: data.firstName, LastName: data.lastName, Role: data.position }),
        })

    }



    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues: {
            userName:"",
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            position:"",
            doctorCode:"",
        }
    })
    

    return (
        <main className=" w-full justify-center flex flex-col items-center gap-2" id="pageContainer"> {/*Primary container*/}
            {/*Primary Display*/}
            <Card className="w-full sm:w-2/3">
                <CardHeader>
                    <CardTitle>New User Registration</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitNewUser)}>

                            {/* User Name */}
                            <FormField control={form.control} name="userName" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>User Name:</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Username" type="text"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            }}/>

                            {/*Password*/}
                            <FormField control={form.control} name="password" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Password:</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="password" type="password"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            }}/>

                            {/*Password Confirm*/}
                            <FormField control={form.control} name="confirmPassword" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Password Confirm:</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="confirmPassword" type="password"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            }}/>
                
                            <FormField control={form.control} name="firstName" render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>First Name:</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="first name" type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />

                            <FormField control={form.control} name="lastName" render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>Last Name:</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="last name" type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />

                            <FormField control={form.control} name="email" render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="email" type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />

                            <FormField control={form.control} name="position" render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Position:</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Position"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Doctor">Doctor</SelectItem>
                                            <SelectItem value="Nurse">Nurse</SelectItem>
                                            <SelectItem value="Technician">Technician</SelectItem>
                                            <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            }}/>

                            <FormField control={form.control} name="doctorCode" render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>Doctor Code:</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Doctor Code" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                        <CardFooter className="flex sm:justify-center mt-10 justify-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-1/2">Submit</button>
                        </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    )
}
