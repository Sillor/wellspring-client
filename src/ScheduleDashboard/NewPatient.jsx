import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import '../output.css';

const NewPatient = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        id: '',
        dob: '',
        phone: '',
        sex: false,
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
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    }

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64data = reader.result;
            setFormData({ ...formData, photo: base64data });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('NewPatient:', formData);

        const submitNewPatient = (data) => {
            fetch('https://152.44.224.138:5174/createpatient',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ firstName: data.firstName, lastName: data.lastName, dob: data.dob, phone: data.phone, sex: data.sex, address: data.address, emergencyContact: data.emergencyContact, emergencyContactPhone: data.emergencyContactPhone, prescriptions: data.prescriptions, prescriptionHistory: data.prescriptionHistory, healthHistory: data.healthHistory, familyHistory: data.familyHistory, diagnosis: data.diagnosis, bloodType: data.bloodType, RHFactor: data.RHFactor, allergies: data.allergies, photo: data.photo
            }),
    })
    }
    
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
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                            <input type="text" id="id" name="id" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
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
                        <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoUpload} className="mt-1 p-2 w-full border rounded-md" />
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
