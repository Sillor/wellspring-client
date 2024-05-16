import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button'
import saveIcon from '../PatientInformation/PatientInformationAssets/save.png'


export default function LabTab(props){

    const [role,setRole] = useState('Technician');
    useEffect(() => {
        function getRole(username){
            fetch('http://152.44.224.138:5174/user',{
              method: 'POST',
              headers: {
                  'content-type' : 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({Username: username})
            })
            .then((res) => res.json())
            .then((data) => {
                setRole(data[0].Role);

            })

        }
        getRole(localStorage.getItem('user'))
    },[role])



    let dateFormat = props.lab.OrderDate.replace("T00:00:00.000Z", "")

        //Handles swaping from 'td' tags to 'input' tags for editing
        function editInformation(){
            if(role === 'Technician'){
                const edit = document.getElementById('editBtn' + " " + props.index);
                const save = document.getElementById('saveBtn' + " " + props.index);
                let results = document.getElementById('results' + " " + props.index);
    
                edit.classList.toggle('invisible');
                save.classList.toggle('invisible');
    
                //Create Text Area for Input                
                let text = document.createElement('textarea')
                text.classList.add("border")
                text.classList.add("border-2")
                text.setAttribute("id",'results ' + props.index);
    
                text.innerText = results.innerText
    
                results.replaceWith(text)
            }

        }


        function saveEdit(){
            let updatedValuesArray = [];
            const edit = document.getElementById('editBtn' + " " + props.index);
            const save = document.getElementById('saveBtn' + " " + props.index);
            let results = document.getElementById('results' + " " + props.index);

            edit.classList.toggle('invisible');
            save.classList.toggle('invisible');

                // Swap back from text area to table cell
                let text = document.createElement('td');
                text.setAttribute("id",'results ' + props.index);
                text.innerText = results.value;
                updatedValuesArray.push(results.value)
                results.replaceWith(text)
    
                fetch('http://152.44.224.138:5174/updatelab/', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        id: props.lab.id,
                        Results: results.value
                    })
                },)
        }


    return(
        <>
            <table className='table-fixed justify-between w-full border-separate' id='table'>
                <tbody>
                    <tr className='table-row w-full h-10 border-spacing-y-3'>
                        <td htmlFor="generalInfo" className="table-cell w-1/2 font-bold">Procedure Name:</td>
                        <td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Ordered By:</td>
                        <td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Date:</td>

                    </tr>

                    <tr className='table-row h-4'>
                        <td htmlFor="generalInfo" className="table-cell w-auto">{props.lab.Lab}</td>
                        <td className='table-cell w-1/3'>Dr. self</td>
                        <td className='table-cell w-1/3'>{dateFormat}</td>
                    </tr>
                    <tr className='table-row'>
                        <td className='table-cell w-1/3 font-bold'>Results & Notes:</td>
                    </tr>
                    <tr>
                        <td className='table-cell break-all' id={"results" + " " + props.index} colSpan={"2"}>{props.lab.Results}</td>

                    </tr>
                    <tr>
                        <td className='h-10'></td>
                    </tr>
                    {props.status === 'current' && role === 'Technician' ? <tr className='table-row'>
                        <td colSpan={2}>
                            <div className='flex flex-col w-1/2'>
                                <Button onClick={editInformation} className="visible" id={"editBtn" + " " + props.index}>Edit {props.lab.Lab} Results</Button>
                                <Button onClick={saveEdit} id={"saveBtn" + " " + props.index} className="invisible" >Save Results</Button>
                            </div>

                        </td>
                    </tr> : null}

                </tbody>
            </table>
        </>
    )
}