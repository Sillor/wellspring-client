import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { PrescriptionPage } from './PrescriptionPage/PrescriptionPage.jsx';
import PrescriptionRequestPage from './PrescriptionPage/PrescriptionRequestPage.jsx';
import PatientDashboard from './PatientDashboard/PatientDashboard.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import NewPatient from './ScheduleDashboard/NewPatient.jsx';
import LabForm1 from './labform1.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <p>404</p>
  },

  {
    path: "/dashboard",
    element: <PatientDashboard/>,
    errorElement: <p>404</p>
  },

  {
    path: "/dashboard/prescriptioninfo",
    element: <PrescriptionPage/>,
    errorElement: <p>404</p>
  },

  {
    path: "/prescriptioninfo/request",
    element: <PrescriptionRequestPage/>,
  },

  {
    path: "/*",
    element: <Navigate to="/" replace={true} />,
  },

  {
    path: "*",
    element: <Navigate to="/" replace={true} />,
  },

  {
    path: "/NewPatient",
    element: <NewPatient/>,
  },

  {
    path: "/labform1",
    element: <LabForm1/>,
  },

]);



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
