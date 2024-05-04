import React, { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< Updated upstream
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import '../output.css';
=======
import { Button, buttonVariants } from "/components/ui/button";
import { Checkbox } from "/components/ui/checkbox";

>>>>>>> Stashed changes

const NewPatient = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        phone: '',
        sex: '', // Change to boolean for checkbox
        address: '',
        emergencyContact: '',
        emergencyContactPhone: '',
        prescriptions: '',
        prescriptionHistory: '',
        healthHistory: '',
        familyHistory: '',
        photo: null, // Patients Photo
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    }

    const handlePhotoCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.addEventListener('dataavailable', async (event) => {
                const blob = event.data;
                const fileReader = new FileReader();
                fileReader.onload = function () {
                    const base64data = fileReader.result;
                    setFormData({ ...formData, photo: base64data });
                };
                fileReader.readAsDataURL(blob);
            });

            mediaRecorder.start();
            setTimeout(() => {
                mediaRecorder.stop();
                stream.getTracks().forEach(track => track.stop());
            }, 3000); // Capture for 3 seconds
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    const name= document.getElementById("firstName")
    console.log(name.value)
            //submission to database
        const submitNewPatient = (data) => {
            console.log(data)
<<<<<<< Updated upstream
            fetch('http://wellspring.pfc.io:5175/createnewpatient',{
=======
            fetch('http://http://152.44.224.138:5174/NewPatient',{
>>>>>>> Stashed changes
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ firstName: formData.firstName, lastName: formData.lastName, dob: formData.dob, phone: formData.phone, sex: formData.sex, address: formData.address, emergencyContact: formData.emergencyContact, emergencyContactPhone: formData.emergencyContactPhone, prescriptions: formData.prescriptions, prescriptionHistory: formData.prescriptionHistory, healthHistory: formData.healthHistory, familyHistory: formData.familyHistory, photo: formData.photo}),
            })
        }
        submitNewPatient

        console.log('NewPatient:', formData);
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-center mb-6">New Patient Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" id="firstName" name="firstName" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" id="lastName" name="lastName" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input type="date" id="dob" name="dob" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" id="phone" name="phone" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sex</label>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="male" name="sex" value="male" label="Male" onChange={handleCheckboxChange} />
                                <Checkbox id="female" name="sex" value="female" label="Female" onChange={handleCheckboxChange} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" id="address" name="address" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                            <input type="text" id="emergencyContact" name="emergencyContact" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                            <input type="tel" id="emergencyContactPhone" name="emergencyContactPhone" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="prescriptions" className="block text-sm font-medium text-gray-700">Prescriptions</label>
                            <input type="text" id="prescriptions" name="prescriptions" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="prescriptionHistory" className="block text-sm font-medium text-gray-700">Prescription History</label>
                            <input type="text" id="prescriptionHistory" name="prescriptionHistory" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="healthHistory" className="block text-sm font-medium text-gray-700">Health History</label>
                            <input type="text" id="healthHistory" name="healthHistory" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="familyHistory" className="block text-sm font-medium text-gray-700">Family History</label>
                            <input type="text" id="familyHistory" name="familyHistory" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Take Photo</label>
                        <Button onClick={handlePhotoCapture}>Capture</Button>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPatient;
