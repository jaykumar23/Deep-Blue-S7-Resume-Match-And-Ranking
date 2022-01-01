import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark py-1 px-md-2 px-lg-3 d-flex align-items-center">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fw-700" to="/">Resume Matching</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                            <NavLink className="nav-link" to="/page2">Page2</NavLink>
                            <NavLink className="nav-link" to="/error">Error</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
