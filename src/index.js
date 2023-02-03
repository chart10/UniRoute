import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link, Outlet,} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from './components/pages/Login';
import Getroute from "./components/pages/Getroute";
import Profile from "./components/pages/Profile";


const AppLayout = () =>{
  return(
    <>
    <Navbar/>
    <Outlet />
    <App />
    </>
  )
}
/**Routes for the navbar that gives the path and element */
const router = createBrowserRouter([
  {
    /** This allows the navbar to cover everything in the navbar*/
    element: <AppLayout />,
    children:[
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/",
        element: <Getroute/>,
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ]
  },
  
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
