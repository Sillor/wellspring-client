import React, { useState } from 'react';
import './output.css'; 

const LabForm = () => {
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
        const submitLabForm = (data) => {
            fetch('https://wellspring.pfc.io:5175/createlabform',{
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
        <div>
            <div className="bg-teal-600">
                <h1 className="text-6xl block text-left text-bg text-white font-semibold"><i className="fas fa-dna"></i> WellSpring</h1>
            </div>
            <div className="bg-teal-600 flex justify-center items-center h-screen">
                <div className="w-full max-w-md p-4 shadow-lg bg-white rounded-md">
                    <h1 className="text-2xl font-semibold text-teal-800 mb-4 text-center mt-3"><i className="fas fa-dna"></i> Lab Information Form</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex space-x-5">
                            <div>
                                <label htmlFor="labFacility" className="block text-sm font-medium text-teal-800 mt-5">Lab Work</label>
                                <div className="relative inline-block">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" aria-haspopup="true" aria-expanded="true">
                                        Lab Selection
                                    </button>
                                    <ul className="absolute hidden mt-2 bg-teal-300 border border-gray-300 rounded-md shadow-lg">
                                        <li className="py-2 px-4 hover:bg-blue-100" data-value="X-Ray">X-Ray</li>
                                        <li className="py-2 px-4 hover:bg-blue-100" data-value="Bloodwork">Bloodwork</li>
                                        <li className="py-2 px-4 hover:bg-blue-100" data-value="Physical">Physical</li>
                                        <li className="py-2 px-4 hover:bg-blue-100" data-value="Maternal">Maternal</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="labOrderDate" className="block text-sm font-medium text-teal-800 mt-5">Lab Order Date</label>
                                <input type="date" id="labOrderDate" name="labOrderDate" className="mt-1 p-2 w-full border rounded-md" onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="patientName" className="block text-sm font-medium text-teal-800 mt-5">Patient's Name</label>
                            <input type="text" id="patientName" name="patientName" className="mt-1 p-2 w-full border rounded-md" placeholder="Enter Patient" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="doctorName" className="block text-sm font-medium text-teal-800 mt-5">Doctor's Name</label>
                            <input type="text" id="doctorName" name="doctorName" className="mt-1 p-2 w-full border rounded-md" placeholder="Enter Doctor" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="Notes" className="block text-sm font-medium text-teal-600 mt-3">Notes</label>
                            <input type="text" id="Notes" name="notes" className="mt-3 p-8 w-full border rounded-md" placeholder="Enter Notes" onChange={handleInputChange} />
                        </div>
                        <div>
                            <button type="submit" className="border-1 border-l-teal-800 bg-teal-600 text-white px-8 py-2 rounded-md w-full hover:bg-teal-800 font-semibold">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LabForm;
