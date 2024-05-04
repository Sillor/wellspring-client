import '../globals.css'
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


export default function PatientInformation(props) {

    //Submition to database
    function updatePatient(data){
        fetch('http://152.44.224.138:5174/updatepatient', {
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
                HealthHistory: data[0].HealthHistory,
                FamilyHistory: data[0].FamilyHistory,
                Diagnoses: data[0].Diagnoses
            }),
        })
        console.log(data)
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
            FirstName: updatedValuesArray[0],
            LastName: updatedValuesArray[1],
            DOB: updatedValuesArray[2],
            Sex: updatedValuesArray[3],
            Address: updatedValuesArray[4],
            Phone: updatedValuesArray[5],
            id: updatedValuesArray[6],
            EmergencyContact: updatedValuesArray[7],
            EmergencyContactPhone: updatedValuesArray[8],
            Prescriptions: props.data[0].Prescriptions,
            PrescriptionHistory: props.data[0].PrescriptionHistory,
            HealthHistory: props.data[0].HealthHistory,
            FamilyHistory: props.data[0].FamilyHistory,
            Diagnoses: props.data[0].Diagnoses
        }]

       updatePatient(updatedPatient);
    }





	return (
		<>
        <Card className="w-full sm:w-2/3 overflow-hidden">
            <CardHeader>
                <CardTitle>Patient Information:
                {/*Edit button*/}    
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
                                <td htmlFor="generalInfo" className="table-cell font-bold text-md">General Information:</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="firstName" className="table-cell text-center w-auto">First Name:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].FirstName}</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="lastName" className="table-cell text-center w-auto">Last Name:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].LastName}</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="dob" className="table-cell text-center w-auto">Date of Birth:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].DOB}</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="sex" className="table-cell text-center w-auto">Sex at birth:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].Sex}</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="address" className="table-cell text-center w-auto">Address:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].Address}</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="city" className="table-cell text-center w-auto">Phone:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].Phone}</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="city" className="table-cell text-center w-auto">Identification Number:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].id}</td>
                            </tr>

                        </tbody>
                    </table>

                    <table className='table w-full mt-5'>
                        <tbody>
                            {/*Emergency Info*/}
                            <tr className='table-row h-10'>
                                <td htmlFor="generalInfo" className="table-cell font-bold text-md">Emergency Contact Information:</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="emergencyContact" className="table-cell text-center w-auto">Emergency Contact:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].EmergencyContact}</td>
                            </tr>
                            <tr className='table-row'>
                                <td htmlFor="generalInfo" name="emergencyPhone" className="table-cell text-center w-auto">Emergency Contact Phone:</td>
                                <td className='info table-cell w-1/3'>{props.data[0].EmergencyContactPhone}</td>
                            </tr>
                        
                        </tbody>
                    </table>
        </CardContent>
    </Card>
		</>
	)
}
