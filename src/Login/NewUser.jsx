import '../globals.css'
import { Button } from "../components/ui/button"
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"

  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  


import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
"use client"



//Zod schema for form validation
const formSchema = z.object({
    userName:z.string().min(2).max(18),
    // firstName: z.string().min(2).max(18),
    // lastName: z.string().min(2).max(18),
    // email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
    position: z.enum(["Doctor", "Nurse", "Technician"]),
    doctorCode: z.string().optional()
    
})
.refine((data) => {
    return data.password === data.confirmPassword
}, 
{
    message: "Passwords do not match",
    path:["confirmPassword"],
})
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


export default function NewUser() {
    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues: {
            userName:"",
            password:"",
            confirmPassword:"",
            position:"",
            doctorCode:"",
        }
    })
    

    const handleSubmit = (data) => {
        console.log(data)
    }

    return (
        <main className="flex flex-col items-center gap-2" id="pageContainer"> {/*Primary container*/}
            {/*Primary Display*/}
            <Card className="w-full sm:w-2/3">
                <CardHeader>
                    <CardTitle>New User Registration</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>

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
                                            <SelectItem value="Tech">Technician</SelectItem>
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

                        <Button className="w-full sm:w-1/3" type="submit" >Submit</Button>                              
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    )
}
