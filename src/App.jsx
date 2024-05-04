import './globals.css';
import {PatientDashboard }from './PatientDashboard/PatientDashboard';
import { useEffect, useState } from 'react';
import login from './Login/Login';
import NewUser from './Login/NewUser'
import Dashboard from './ScheduleDashboard/Dashboard';


function App() {
  let user = "admintest";
  let pass = "admintest2"

  login(user,pass);

//For dev purposes


return(
  <>
    <Dashboard currentUser = {user}/>
  </>
)

}


export default App;
