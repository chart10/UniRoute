import React, {useState} from "react";
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FaSearchLocation} from 'react-icons/fa'
import { CgProfile} from 'react-icons/cg'
import { IconContext } from "react-icons";

function Navbar(){
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)



    return(
        <>
        <IconContext.Provider value={{color: "#fff"}}>
        <nav className="navbar">
            <Link to='/' className="navbar-logo">
                <AiOutlineDeploymentUnit className="navbar-icon"/>
                UNIROUTE
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />} 
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-route">
                    <NavLink to='/' className={({ isActive }) => "nav-links" +(isActive ? " activated" : "") }>
                        Get Route
                        <FaSearchLocation className="navbar-icon" onClick={closeMobileMenu}/>
                    </NavLink>
                </li>
                <li className="nav-login">
                    <NavLink to='/Login' className={({ isActive }) => "nav-links" +(isActive ? " activated" : "") }>
                        Login
                        <CgProfile className="navbar-icon" onClick={closeMobileMenu}/>
                    </NavLink>
                </li>

            </ul>
            
        </nav>
    </IconContext.Provider>
        </>
    )
}
export default Navbar;