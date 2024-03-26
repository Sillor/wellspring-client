import './globals.css';
import {PatientDashboard }from './PatientDashboard/PatientDashboard';
import { useEffect, useState } from 'react';
import login from './Login/Login';
import NewUser from './Login/NewUser'


function App() {

  //Login for development purposes
  login()


  //Call data before routed to dashboard
  const [data,setData] = useState([])
  useEffect(()=>{
    fetch('http://152.44.224.138:5174/patients',{
    method: 'GET',
    headers: {
        'content-type' : 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
},[data])
.then((res) => res.json())
.then((data) => {
    if(data.message === 'success'){
        localStorage.setItem('token', data.token)
        setData(data.patients)
    }
    else{
        alert(data.message)
    }
})

},[data])

//Dont render if data isnt there
if(data.length < 1){
  return(
    <div>Loading...</div>
  )
}
else{
  return(<PatientDashboard data={data}/>)}

}

// return(
//   <>
//   <NewUser/>
//   </>
// )

// }


export default App;
