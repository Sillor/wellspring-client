import '../globals.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import editIcon from './PatientInformationAssets/pencil.png';
import saveIcon from './PatientInformationAssets/save.png';
import { useState } from 'react';
import { useEffect } from 'react';

/* Shows Individual Patient Dashboard layout*/
export function PatientChart(props) {
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);

  //Submition to database
  function updatePatient(updatedPatient) {
    fetch('http://152.44.224.138:5174/updatepatient/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedPatient[0]),
    }).then(() => {
      props.setData(updatedPatient);
    });
  }

  //Disable Edits for non-doctors
  function disableBtn() {
    const edit = document.getElementById('editBtn');
    edit.classList.add('disable');
  }

  //Handles swaping from 'td' tags to 'input' tags for editing
  function editInformation() {
    const edit = document.getElementById('editBtn');
    const save = document.getElementById('saveEditBtn');
    const cellNodes = document.getElementsByClassName('info');
    edit.classList.toggle('invisible');
    save.classList.toggle('invisible');

    Array.from(cellNodes).forEach((element) => {
      element.insertAdjacentHTML(
        'afterend',
        `<input type='text' class='newInput rounded-md border border-slate-200 bg-white' name='${element.parentNode.firstChild.textContent.trim()}'>`
      );
      element.parentNode.lastChild.value = element.textContent;
      element.parentNode.removeChild(element);
    });
  }

  const fieldMapping = {
    'Address:': 'Address',
    'Allergies:': 'Allergies',
    'Blood Type:': 'BloodType',
    'Condition:': 'FamilyHistory',
    'Existing Conditions:': 'HealthHistory',
    'Recent Diagnosis:': 'Diagnosis',
    'RH Factor:': 'RHFactor',
    'Previous Diagnoses:': 'PreviousDiagnosis',
  };

  //Handles swaping from 'input' tags to 'td' tags after editing
  function saveEdit() {
    let updatedValues = {};
    const edit = document.getElementById('editBtn');
    const save = document.getElementById('saveEditBtn');
    const inputNodes = document.getElementsByClassName('newInput');
    edit.classList.toggle('invisible');
    save.classList.toggle('invisible');

    Array.from(inputNodes).forEach((element) => {
      let fieldName = element.name.trim();
      if (fieldName in fieldMapping) {
        fieldName = fieldMapping[fieldName]; // Use the mapped field name
      }
      updatedValues[fieldName] = element.value;
      element.insertAdjacentHTML(
        'afterend',
        `<td class='info table-cell w-1/3'></td>`
      );
      element.parentNode.lastChild.textContent = element.value;
      element.parentNode.removeChild(element);
    });

    const updatedPatient = [
      {
        ...props.data[0], // Copy all existing fields
        ...updatedValues, // Overwrite with updated values
      },
    ];

    updatePatient(updatedPatient);
  }

  function getRole(username) {
    fetch('http://152.44.224.138:5174/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ Username: username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRole(data[0].Role);
        setLoading(false); // Set loading to false when the data is ready
      });
  }
  getRole(localStorage.getItem('user'));

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while waiting for data
  } else {
    return (
      <>
        <Card className="w-full sm:w-2/3">
          <CardHeader>
            <CardTitle>
              Patient Chart
              {/*Edit Button */}
              <Card
                className="flex w-fit hover:bg-slate-100 float-right"
                id="editBtn"
              >
                <button
                  className=" bg-white hover:bg-slate-100 rounded-md menuItem"
                  onClick={role === 'Doctor' ? editInformation : disableBtn}
                >
                  <img
                    src={editIcon}
                    alt="not found"
                    className=" w-10 p-2"
                    id="editIcon"
                  />
                </button>
              </Card>
              <Card
                className="invisible flex w-fit hover:bg-slate-100 float-right"
                id="saveEditBtn"
              >
                <button
                  className=" bg-white hover:bg-slate-100 rounded-md menuItem"
                  onClick={saveEdit}
                >
                  <img
                    src={saveIcon}
                    alt="not found"
                    className=" w-10 p-2"
                    id="saveIcon"
                  />
                </button>
              </Card>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="table w-full">
              <tbody>
                {/*General Info*/}
                <tr className="table-row h-10">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell font-bold text-md"
                  >
                    Medical Information:
                  </td>
                </tr>
                <tr className="table-row">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell text-center w-auto"
                  >
                    Existing Conditions:
                  </td>
                  <td className="info table-cell w-1/3">
                    {props.data[0].HealthHistory}
                  </td>
                </tr>
                <tr className="table-row">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell text-center w-auto"
                  >
                    Recent Diagnosis:
                  </td>
                  <td className="info table-cell w-1/3">
                    {props.data[0].Diagnosis}
                  </td>
                </tr>
                <tr className="table-row">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell text-center w-auto"
                  >
                    Blood Type:
                  </td>
                  <td className="info table-cell w-1/3">
                    {props.data[0].BloodType}
                  </td>
                </tr>
                <tr className="table-row">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell text-center w-auto"
                  >
                    RH Factor:
                  </td>
                  <td className="info table-cell w-1/3">
                    {props.data[0].RHFactor}
                  </td>
                </tr>
                <tr className="table-row">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell text-center w-auto"
                  >
                    Previous Diagnoses:
                  </td>
                  <td className="info table-cell w-1/3">
                    {props.data[0].PreviousDiagnosis}
                  </td>
                </tr>
                <tr className="table-row">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell text-center w-auto"
                  >
                    Allergies:
                  </td>
                  <td className="info table-cell w-1/3">
                    {props.data[0].Allergies}
                  </td>
                </tr>
                {/*Family History*/}
                <tr className="table-row h-10">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell font-bold text-md"
                  >
                    Family Illness History:
                  </td>
                </tr>
                <tr className="table-row">
                  <td
                    htmlFor="generalInfo"
                    className="table-cell text-center w-auto"
                  >
                    Condition:
                  </td>
                  <td className="info table-cell w-1/3">
                    {props.data[0].FamilyHistory}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default PatientChart;
