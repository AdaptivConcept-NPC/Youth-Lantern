// import React from 'react'
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

const MainLayout = () => {
    return (
        <>
            {/* <!-- Navbar on every page --> */}
            <Navbar />
            <ToastContainer />
            {/* 
                In React, the <Outlet /> component is part of the React Router 
                library. It is used to render the child components defined in 
                the routing configuration.
                When you define routes in your application using React Router, 
                you typically have a parent component that acts as a layout or 
                container for the different pages or views. The <Outlet /> 
                component is a placeholder that tells React Router where to 
                render the child components based on the current route.
            */}
            <Outlet />
        </>
    )
}

export default MainLayout