import { NavLink } from "react-router"
import './NavBar.css'
import { Routes, Route } from 'react-router' 
import HomePage from '../pages/Home/HomePage.jsx'
import SignIn from '../pages/SignIn/SignIn.jsx'
import LogIn from '../pages/LogIn/LogIn.jsx'
import Shop from '../pages/Shop.jsx'
import NotFound from '../pages/NotFound.jsx'
import ItemPage from '../pages/ItemPage.jsx'
import profileIcon from "../assets/profile-icon.png"; 
import assistance from '../assets/assistance.png'
import Profile from '../pages/Profile/Profile.jsx'
import Hangman from '../pages/Hangman/Hangman.jsx'
import ChatBox from '../pages/Chatbox/ChatBox.jsx'

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Meedea</div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/Home" className="nav-link" end>
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/SignIn" className="nav-link" end>
                        Sign In
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/LogIn" className="nav-link" end>
                        Log In
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Channel" className="nav-link" end>
                        Channel
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Hangman" className="nav-link" end>
                        Hangman
                    </NavLink>
                </li>
            </ul>
            <NavLink to="/profile" className="profile-link">
                <img src={profileIcon} alt="Profile" className="profile-icon" />
            </NavLink>
            <NavLink to="/ChatBox" className="profile-link">
                <img src={assistance} alt="ChatBox" className="profile-icon" />
            </NavLink>
        </nav>
    );
}