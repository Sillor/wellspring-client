import "./globals.css";
import { PatientDashboard } from "./PatientDashboard/PatientDashboard";
import { useEffect, useState } from "react";
import login from "./Login/Login";
import NewUser from "./Login/NewUser";
import Dashboard from "./ScheduleDashboard/Dashboard";

function App() {
  let username = "admintest";
  let pass = "admintest2"


  //For dev purposes


return(
  <>                  
    <Dashboard currentUser = {username}/>
  </>
)

}

export default App;
