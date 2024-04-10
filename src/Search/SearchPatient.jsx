import '../globals.css'
import { Input } from '../components/ui/input'
import searchIcon from './SearchAssets/search.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import login from '../Login/Login'

import PatientTab from './PatientTab'

export default function SearchFunction(){

    //Call data before routed to dashboard
	const [data, setData] = useState([]);
    const [search, setSearch]  = useState([]);

	const [ButtonPopup, setButtonPopup] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	login();
	const navigate = useNavigate();

	const handleButtonClick = (event) => {
		setSelectedEvent(event);
		setButtonPopup(true);
	};

	const [events, setEvents] = useState([]);
    const [display, setDisplay] = useState([]);



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



    function onSearch(patientName) {
        setDisplay([])
        setSearch([])
        data.filter((patient) => {
            
            const pattern = new RegExp('^' + patientName.target.value, 'i')
    
            if (patient.LastName.match(pattern)) {
                setSearch(search => [...search, patient])     
            }
        })

        if (patientName.target.value === '') {  
            setDisplay([])
            setSearch([])
            return;
        }

        search.map((patient) => (
            setDisplay(display => [...display, <PatientTab key={patient.id} patient={patient} />])
        ))
    }


    return(
        <div className='flex flex-col w-screen h-screen justify-center items-center gap-5'>
            <h2 className='float-end text-3xl'>Patient Search</h2>
            <div className='flex justify-center w-full'>
                <img src={searchIcon} alt="" className='flex w-6 h-6 mt-2'/>
                <Input className='flex w-1/2 input' id='input' placeholder="Patient Name" type='text' onChange={(value)=> onSearch(value)}></Input>
            </div>

            <div className='flex flex-col w-2/3 justify-center' id='resultsDiv'>
                {display}
            </div>

        </div>
    )
}