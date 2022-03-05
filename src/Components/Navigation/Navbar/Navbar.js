import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

    const [dropDown, setDropDown] = useState(false)

    const fName = "Karan"
    const lName = "Sandhu"
    const role = "Applicant"

    const avatar = `${fName.slice(0, 1)}${lName.slice(0, 1)}`
    console.log(avatar);

    const openDropDown = () => {
        setDropDown(!dropDown)
    }

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark py-0 px-md-2 px-lg-3 d-flex align-items-center">
                <div className="container-fluid">
                    <NavLink to="/home">
                        <div className="navbar-brand fw-700" >Resume Matching</div>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <div className="nav-link d-flex" onClick={openDropDown}>
                                <div className="details me-3 text-end">
                                    <p id='name'>{fName} {lName}</p>
                                    <p id='role'>{role}</p>
                                </div>
                                <div className="avatar">{avatar}</div>
                                <div className={`drop-down ${dropDown === false ? "d-none" : ""} `}>
                                    <div className="drop-link">
                                        <NavLink to="/profile">Profile</NavLink>
                                    </div>
                                    <div className="drop-link" onClick={handleLogout}>
                                        <p>Logout</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
