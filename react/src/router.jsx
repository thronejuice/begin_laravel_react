import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Master/Users";
import Positions from "./views/Master/Positions";
import UserForm from "./views/Master/UserForm";
import PositionsForm from "./views/Master/PositionsForm.jsx";
import Departments from "./views/Master/Departments";
import DepartmentsForm from "./views/Master/DepartmentsForm.jsx";
import Status from "./views/Master/Status";
import StatusForm from "./views/Master/StatusForm.jsx";
import Jobs from "./views/Master/Jobs";
import JobsForm from "./views/Master/JobsForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
      { 
        path: "/positions" ,
        element: <Positions /> 
      },
      {
        path: "/positions/new",
        element: <PositionsForm key="positionsCreate" />,
      },
      {
        path: "/positions/:id",
        element: <PositionsForm key="positionsUpdate" />,
      },
      { 
        path: "/departments" ,
        element: <Departments /> 
      },
      {
        path: "/departments/new",
        element: <DepartmentsForm key="departmentsCreate" />,
      },
      {
        path: "/departments/:id",
        element: <DepartmentsForm key="departmentsUpdate" />,
      },
      { 
        path: "/status" ,
        element: <Status /> 
      },
      {
        path: "/status/new",
        element: <StatusForm key="statusCreate" />,
      },
      {
        path: "/status/:id",
        element: <StatusForm key="statusUpdate" />,
      },
      { 
        path: "/jobs" ,
        element: <Jobs /> 
      },
      {
        path: "/jobs/new",
        element: <JobsForm key="jobsCreate" />,
      },
      {
        path: "/jobs/:id",
        element: <JobsForm key="jobsUpdate" />,
      },

    
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
