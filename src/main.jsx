import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
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
import NewPatient from './ScheduleDashboard/NewPatient.jsx';

import LabForm1 from './PatientLabs/Labform1.jsx';
import SearchPatient from './Search/SearchPatient.jsx'
import Login from './Login.jsx';
import AdminTools from './AdminTools/AdminTools.jsx'
import NewUser from './Login/NewUser.jsx';
import NewAppointmentPage from './AppointmentPage/NewAppointmentPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <p>404</p>,
  },
  {
    path: "/main",
    element: <App />,
    errorElement: <p>404</p>,
  },
  {
    path: "/admin",
    element: <AdminTools />,
    errorElement: <p>404</p>,
  },
  {
    path: "/dashboard",
    element: <PatientDashboard />,
    errorElement: <p>404</p>,
  },

  {
    path: "/dashboard/prescriptioninfo",
    element: <PrescriptionPage />,
    errorElement: <p>404</p>,
  },

  {
    path: "/prescriptioninfo/request",
    element: <PrescriptionRequestPage />,
  },

  {
    path: "/newpatient",
    element: <NewPatient/>,
  },

  {
    path: "/createuser",
    element: <NewUser/>,
  },

  {
    path: "/labform1",
    element: <LabForm1 />,
  },

  {
    path: "/search",
    element: <SearchPatient />,
  },

  {
    path: "/newappointment",
    element: <NewAppointmentPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
