import './globals.css';
import {PatientDashboard }from './PatientDashboard/PatientDashboard';
import { useEffect, useState } from 'react';
import login from './Login/Login';
import NewUser from './Login/NewUser'
import Dashboard from './ScheduleDashboard/Dashboard';


function App() {

//For dev purposes
login();



return(
  <>
    <Dashboard/>
  </>
)

}


export default App;
