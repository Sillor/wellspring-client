import '../globals.css'
import { useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card"
import editIcon from './PatientInformationAssets/pencil.png'
import saveIcon from './PatientInformationAssets/save.png'
import { useLocation } from 'react-router-dom'


/* Shows Individual Patient Dashboard layout*/
export function PatientChart(props){

    //Submition to database
    function updatePatient(data){
        fetch('https://wellspring.pfc.io:5175/updatepatient/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                FirstName: data[0].FirstName,
                LastName: data[0].LastName,
                DOB: data[0].DOB,
                Sex: data[0].Sex,
                Address: data[0].Address,
                Phone: data[0].Phone,
                id: data[0].id,
                EmergencyContact: data[0].EmergencyContact,
                EmergencyContactPhone: data[0].EmergencyContactPhone,
                Prescriptions: data[0].Prescriptions,
                PrescriptionHistory: data[0].PrescriptionHistory,
                HealthHistory: data[0].HealthHistory,
                FamilyHistory: data[0].FamilyHistory,
                Diagnoses: data[0].Diagnoses
            }),
        })
        props.setData(data)
    }

    
    //Handles swaping from 'td' tags to 'input' tags for editing
    function editInformation(){
        const edit = document.getElementById('editBtn');
        const save = document.getElementById('saveEditBtn');
        const cellNodes = document.getElementsByClassName('info');
        edit.classList.toggle('invisible');
        save.classList.toggle('invisible');

        Array.from(cellNodes).forEach(element => {
            element.insertAdjacentHTML('afterend',"<input type='text' class='newInput rounded-md border border-slate-200 bg-white'>")
            element.parentNode.lastChild.value = element.textContent;
            element.parentNode.removeChild(element);
        });
    }
                                                                                /* TODO: Consolidate to 1 function? */
    //Handles swaping from 'input' tags to 'td' tags after editing
    function saveEdit(){
        let updatedValuesArray = [];
        const edit = document.getElementById('editBtn');
        const save = document.getElementById('saveEditBtn');
        const inputNodes = document.getElementsByClassName('newInput');
        edit.classList.toggle('invisible');
        save.classList.toggle('invisible');
        
        Array.from(inputNodes).forEach(element => {
            updatedValuesArray.push(element.value)
            element.insertAdjacentHTML('afterend',`<td class='info table-cell w-1/3'></td>`)
            element.parentNode.lastChild.textContent = element.value;
            element.parentNode.removeChild(element);
        });

        const updatedPatient = [{           
            FirstName: props.data[0].FirstName,
            LastName: props.data[0].LastName,
            DOB: props.data[0].DOB,
            Sex: props.data[0].Sex,
            Address: props.data[0].Address,
            Phone: props.data[0].Phone,
            id: props.data[0].id,
            EmergencyContact: props.data[0].EmergencyContact,
            EmergencyContactPhone: props.data[0].EmergencyContactPhone,
            Prescriptions: props.data[0].Prescriptions,
            PrescriptionHistory: props.data[0].PrescriptionHistory,
            HealthHistory: updatedValuesArray[0],
            FamilyHistory: updatedValuesArray[2],
            Diagnoses: updatedValuesArray[1]
        }]


       updatePatient(updatedPatient);
    }

    return(
        <>
        <Card className="w-full sm:w-2/3">
            <CardHeader>
                <CardTitle>Patient Chart

                {/*Edit Button */}
                <Card className="flex w-fit hover:bg-slate-100 float-right" id="editBtn">
                        <button className=" bg-white hover:bg-slate-100 rounded-md menuItem"  onClick={editInformation}>
                            <img src={editIcon} alt="not found" className=" w-10 p-2" id="editIcon"/>
                        </button>
                    </Card>
                    <Card className="invisible flex w-fit hover:bg-slate-100 float-right"  id="saveEditBtn">
                        <button className=" bg-white hover:bg-slate-100 rounded-md menuItem" onClick={saveEdit}>
                            <img src={saveIcon} alt="not found" className=" w-10 p-2" id="saveIcon"/>
                        </button>
                    </Card>
                </CardTitle>
            </CardHeader>
            <CardContent>

                <table className='table w-full'>
                    <tbody>
                    {/*General Info*/}
                    <tr className='table-row h-10'>
                        <td htmlFor="generalInfo" className="table-cell font-bold text-md">Medical Information:</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Existing Conditions:</td>
                        <td className='info table-cell w-1/3'>{props.data[0].HealthHistory}</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Recent Diagnoses:</td>
                        <td className='info table-cell w-1/3'>{props.data[0].Diagnoses}</td>
                    </tr>

                    {/*Family History*/}
                    <tr className='table-row h-10'>
                        <td htmlFor="generalInfo" className="table-cell font-bold text-md">Family Illness History:</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">Condition:</td>
                        <td className='info table-cell w-1/3'>{props.data[0].FamilyHistory}</td>
                    </tr>

                    </tbody>
                </table>
                
            </CardContent>
        </Card>
        </>
    );    

}

export default PatientChart