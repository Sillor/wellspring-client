import '../globals.css';
import './button.css';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useNavigate, useLocation } from 'react-router-dom';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import login from './Login';
import Login from '../Login';
('use client');

//Zod schema for form validation
const formSchema = z
  .object({
    userName: z.string().min(2).max(18),
    firstName: z.string().min(2).max(18),
    lastName: z.string().min(2).max(18),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
    position: z.enum(['Doctor', 'Nurse', 'Technician', 'Pharmacist']),
    doctorCode: z.string().optional(),
  })
  //Error for password matching
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  )

  // Check for doctor code if needed
  .refine(
    (data) => {
      if (data.position === 'Doctor') {
        return !!data.doctorCode;
      }
      return true;
    },

    {
      message: 'Doctor authorization code required',
      path: ['doctorCode'],
    }
  );

//Default values for zod form initialization
export default function NewUser() {
  const navigate = useNavigate();

  //Submition to database
  const submitNewUser = (data) => {
    navigate('/');

    fetch('http://152.44.224.138:5174/createuser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        Username: data.userName,
        Password: data.password,
        Email: data.email,
        FirstName: data.firstName,
        LastName: data.lastName,
        Role: data.position,
      }),
    });
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      position: '',
      doctorCode: '',
    },
  });

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="flex-1 md:flex-none md:w-1/2 md:p-8 bg-white rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-2">Wellspring</CardTitle>
          <CardDescription className="text-xl mb-4">
            Create a new user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitNewUser)}>
              {/* User Name */}
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-4">
                      <FormLabel className="text-lg">Username:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Username"
                          type="text"
                          className="p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/*Password*/}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-4">
                      <FormLabel className="text-lg">Password:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
                          type="password"
                          className="p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/*Password Confirm*/}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-4">
                      <FormLabel className="text-lg">
                        Password Confirm:
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Confirm Password"
                          type="password"
                          className="p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-4">
                      <FormLabel className="text-lg">First Name:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="First Name"
                          type="text"
                          className="p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-4">
                      <FormLabel className="text-lg">Last Name:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Last Name"
                          type="text"
                          className="p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-4">
                      <FormLabel className="text-lg">Email:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          type="email"
                          className="p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-4">
                      <FormLabel className="text-lg">Position:</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Doctor">Doctor</SelectItem>
                          <SelectItem value="Nurse">Nurse</SelectItem>
                          <SelectItem value="Technician">Technician</SelectItem>
                          <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="doctorCode"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-4">
                      <FormLabel className="text-lg">Doctor Code:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Doctor Code"
                          type="password"
                          className="p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <CardFooter className="flex sm:justify-center mt-10 justify-center">
                <button
                  type="submit"
                  className="submit-button px-4 py-2 rounded-md w-1/2"
                >
                  Submit
                </button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
