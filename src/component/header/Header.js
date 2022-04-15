import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from "../../redux/login/loginAction";

const Header = () => {

    const dispatch = useDispatch()
    const { loginStatus, userName, userType } = useSelector(state => state.user)
    const test = useSelector(state => state.user)

    const handalLogoutUser = () => {
        dispatch(LogoutUser())
    }

    return (
        <>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <NavLink to="/" className="navbar-brand"><b>Doctor Appointment</b></NavLink>
                    </div>
                    {loginStatus ?
                        <>
                            <ul className="nav navbar-nav">
                                {userType === "user" ?
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/doctor-list">Doctor List</NavLink>
                                    </li>
                                    : null}
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/appointment-request-list">Appointment</NavLink>
                                </li>
                                {userType === "doctor" ?
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/doctor-time-slot">Add Slot</NavLink>
                                    </li>
                                    : null}
                            </ul>
                            <ul className="nav navbar-nav pull-right" >
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="#">
                                        <span className="user-name" aria-hidden="true">{userName}</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" onClick={handalLogoutUser}>
                                        <i className="fa fa-sign-out" aria-hidden="true" title="Logout"></i>
                                        <span>Logout</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </> :
                        <ul className="nav navbar-nav pull-right" >
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Login</NavLink>
                            </li>
                        </ul>}
                </div>
            </nav>
        </>
    )
}

export default Header;
