import './globals.css';
import { LoginPage }from './LoginPage/LoginPage';
import { PatientDashboard }from './PatientDashboard/PatientDashboard';
import { useState } from 'react';

function App() {
  
  const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated") || false);

  return (
      authenticated ? <PatientDashboard/> : <LoginPage/>
  );
}

export default App;
