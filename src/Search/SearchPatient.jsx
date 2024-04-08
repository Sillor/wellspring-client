import '../globals.css'
import { Input } from '../components/ui/input'
import searchIcon from './SearchAssets/search.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import login from '../Login/Login'
export default function SearchFunction(){

    //Call data before routed to dashboard
	const [data, setData] = useState([]);
    const [search, setSearch]  = useState([]);

    login();

	useEffect(() => {
		fetch('http://152.44.224.138:5174/patients', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		}, [data])
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'success') {
					localStorage.setItem('token', data.token)
					setData(data.patients);
				}
				else {
					alert(data.message)
				}
			})
	})



    function onSearch(patientName){

        data.filter( (patient) => {

            const pattern = new RegExp(patientName.target.value)

            if(patient.FirstName.match(pattern) && !search.includes(patient) && patientName.target.value.length != 0){
                console.log('here');

                search.push(patient)
            }
            // if(patientName.target.value.length != 0){
            //    // 
            // }
        })
        console.log(search);

    }


    return(
        <div className='flex flex-col w-screen h-screen justify-center items-center gap-5'>
            <h2 className='float-end text-3xl'>Patient Search</h2>
            <div className='flex justify-center w-full'>
                <img src={searchIcon} alt="" className='flex w-6 h-6 mt-2'/>
                <Input className='flex w-1/2 input' id='input' placeholder="Patient Name" type='text' onChange={(value)=> onSearch(value)}></Input>
            </div>

            <div className='flex w-full' id='resultsDiv'>
                {search}
            </div>

        </div>
    )
}