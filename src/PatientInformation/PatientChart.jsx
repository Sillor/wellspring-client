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
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import editIcon from './PatientInformationAssets/pencil.png'
import saveIcon from './PatientInformationAssets/save.png'


/* Shows Individual Patient Dashboard layout*/
export function PatientChart(props){
    
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

    //Handles swaping from 'input' tags to 'td' tags after editing
    function saveEdit(){
        const edit = document.getElementById('editBtn');
        const save = document.getElementById('saveEditBtn');
        const inputNodes = document.getElementsByClassName('newInput');


        edit.classList.toggle('invisible');
        save.classList.toggle('invisible');

        Array.from(inputNodes).forEach(element => {
            element.insertAdjacentHTML('afterend',`<td class='info table-cell w-1/3'></td>`)
            element.parentNode.lastChild.textContent = element.value;
            element.parentNode.removeChild(element);
        });
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
                        <td htmlFor="generalInfo" className="table-cell text-center w-auto">First Name:</td>
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