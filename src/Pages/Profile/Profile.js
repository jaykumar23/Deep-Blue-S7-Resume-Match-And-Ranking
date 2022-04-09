import React from 'react'
import Navbar from '../../Components/Navigation/Navbar/Navbar'
import { } from './Profile.css'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NavLink } from 'react-router-dom'

const Profile = () => {
    const fName = localStorage.getItem("USER_FNAME");
    const lName = localStorage.getItem("USER_LNAME");
    const role = localStorage.getItem("USER_ROLE")

    const avatar = `${fName.slice(0, 1)}${lName.slice(0, 1)}`
    return (
        <>
            <Navbar></Navbar>
            <div className="px-3 px-lg-0">
                <div className="container profile mt-4 p-0">
                    <div className="top ">
                        <div className="d-flex align-items-center">
                            <NavLink to="/home">
                                <ChevronLeftIcon />
                            </NavLink>
                            <h3 className='text-light ms-3'>Profile</h3>
                        </div>
                        <div className="display d-flex align-items-center justify-content-start">
                            <div className="avatar me-3">{avatar}</div>
                            <div className="display-info d-flex align-items-center justify-content-between w-100">
                                <p id='name'>{fName} {lName}</p>
                                <p className='text-light me-3 text-capitalize'>{localStorage.getItem("USER_ROLE")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="container m-3 p-2 py-3">

                            <div className="d-flex info-div">
                                <p className='title'>Email :</p>
                                <p className='info'>{localStorage.getItem("USER_EMAIL")}</p>
                            </div>
                            <div className="d-flex info-div">
                                <p className='title'>Mobile No. :</p>
                                <p className='info'>{localStorage.getItem("USER_MOBILE")}</p>
                            </div>
                            <div className="d-flex info-div">
                                <p className='title'>Gender :</p>
                                <p className='info'>{localStorage.getItem("USER_GENDER")}</p>
                            </div>
                            <div className={role === "recruiter" ? "d-none" : ""}>
                                <div className="d-flex info-div">
                                    <p className='title'>Eduction :</p>
                                    <p className='info'>Inidian Institute of Technology Mumbai</p>
                                </div>
                                <div className="d-flex info-div">
                                    <p className='title'>Skills :</p>
                                    <p className='info'>Machine Learning, Natural Language Processing and Big Data Handling</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile