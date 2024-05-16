import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import '../output.css';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
const NewPatient = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        id: '',
        dob: '',
        phone: '',
        sex: '',
        address: '',
        emergencyContact: '',
        emergencyContactPhone: '',
        prescriptions: '',
        prescriptionHistory: '',
        healthHistory: '',
        familyHistory: '',
        diagnosis: '',
        bloodType: '',
        RHFactor: '',
        allergies: '',
        photo: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        setFormData({ ...formData, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        fetch('http://152.44.224.138:5174/createpatient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            
            body: JSON.stringify({
                FirstName: formData.firstName, LastName: formData.lastName, DOB: formData.dob, Phone: formData.phone, Sex: formData.sex, Address: formData.address, EmergencyContact: formData.emergencyContact, EmergencyContactPhone: formData.emergencyContactPhone, Prescriptions: formData.prescriptions, PrescriptionHistory: formData.prescriptionHistory, HealthHistory: formData.healthHistory, FamilyHistory: formData.familyHistory, Diagnosis: formData.diagnosis, BloodType: formData.bloodType, RHFactor: formData.RHFactor, Allergies: formData.allergies
            }),
        
        })


        console.log('Form submitted:', formData);
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

                                <select name="sex" id="sexSelect" onChange={handleCheckboxChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-Binary">Non-Binary</option>
                                </select>


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
                        <div>
                            <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Diagnosis</label>
                            <input type="text" id="diagnosis" name="diagnosis" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type</label>
                            <input type="text" id="bloodType" name="bloodType" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="RHFactor" className="block text-sm font-medium text-gray-700">RH Factor</label>
                            <input type="text" id="RHFactor" name="RHFactor" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
                            <input type="text" id="allergies" name="allergies" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Upload Photo</label>
                        <input type="file" id="photo" name="photo" accept="image/*" className="mt-1 p-2 w-full border rounded-md" />
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