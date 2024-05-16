import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import './output.css';

const LabForm1 = () => {
    const [formData, setFormData] = useState({
        labSelection: '',
        labOrderDate: '',
        patientName: '',
        doctorName: '',
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        //submission to database
        const submitLabForm1 = (data) => {
            fetch('https://152.44.224.138:5174/createlabform1',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ labSelection: data.labSelection, labOrderDate: data.labOrderDate, patientName: data.patientName, doctorName: data.doctorName, Notes: data.Notes}),
    })
    }
    
        console.log('Form submitted:', formData);
    }

    return (
        <div className="bg-white-600 flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-4 shadow-lg bg-white rounded-md">
                <h1 className="text-2xl font-semibold text-teal-800 mb-4 text-center mt-3"><i className="fas fa-dna"></i> Lab Information Form</h1>
                
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="labSelection">Lab Work</Label>
                        <select id="labSelection" name="labSelection" className="input" onChange={handleInputChange} required>
                            <option value="">Select Lab</option>
                            <option value="X-Ray">X-Ray</option>
                            <option value="Bloodwork">Bloodwork</option>
                            <option value="Physical">Physical</option>
                            <option value="Maternal">Maternal</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="labOrderDate">Lab Order Date</Label>
                        <Input type="date" id="labOrderDate" name="labOrderDate" className="input" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="patientName">Patient's Name</Label>
                        <Input type="text" id="patientName" name="patientName" className="input" placeholder="Enter Patient" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="doctorName">Doctor's Name</Label>
                        <Input type="text" id="doctorName" name="doctorName" className="input" placeholder="Enter Doctor" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Input type="text" id="notes" name="notes" className="input" placeholder="Enter Notes" onChange={handleInputChange} />
                    </div>
                    <div>
                        <Button type="submit" className="bg-blue-500 w-full">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LabForm1;
