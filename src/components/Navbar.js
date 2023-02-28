import React, {useState, useContext} from "react";
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FaSearchLocation} from 'react-icons/fa'
import { CgProfile} from 'react-icons/cg'
import { IconContext } from "react-icons";
import  {LoginContext} from '../index'

function Navbar() {
    const [click, setClick] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext); // access isLoggedIn value
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const handleLogout = () => {
      setIsLoggedIn(false); // set isLoggedIn to false
      localStorage.removeItem("token"); // remove auth token
    };
    
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <Link to="/" className="navbar-logo">
              <AiOutlineDeploymentUnit className="navbar-icon" />
              UNIROUTE
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-route">
                <NavLink
                  to="/"
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                >
                  Get Route
                  <FaSearchLocation className="navbar-icon" onClick={closeMobileMenu} />
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-profile">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                      onClick={closeMobileMenu}
                    >
                      Profile
                      <CgProfile className="navbar-icon" />
                    </NavLink>
                  </li>
                  <li className="nav-login">
                    <NavLink
                      to="/login"
                      className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                      onClick={() => {
                        closeMobileMenu();
                        handleLogout(); // call handleLogout function
                      }}
                    >
                      Logout
                      <CgProfile className="navbar-icon" />
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-login">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                    onClick={closeMobileMenu}
                  >
                    Login
                    <CgProfile className="navbar-icon" />
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
export default Navbar;