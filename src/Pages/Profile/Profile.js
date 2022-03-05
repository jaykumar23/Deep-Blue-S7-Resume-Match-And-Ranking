import React from 'react'
import Navbar from '../../Components/Navigation/Navbar/Navbar'
import { } from './Profile.css'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NavLink } from 'react-router-dom'

const Profile = () => {
    const fName = "Karan"
    const lName = "Sandhu"
    const role = "Applicant"

    const avatar = `${fName.slice(0, 1)}${lName.slice(0, 1)}`
    console.log(avatar);
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
                        <div className="display d-flex align-items-top justify-content-start">
                            <div className="avatar me-3">{avatar}</div>
                            <div className="display-info">
                                <p id='name'>Karandeep Sandhu</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="container m-5 p-2 py-3">

                            <div className="d-flex info-div">
                                <p className='title'>Mobile No. :</p>
                                <p className='info'>7977215936</p>
                            </div>
                            <div className="d-flex info-div">
                                <p className='title'>Mobile No. :</p>
                                <p className='info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quidem!</p>
                            </div>
                            <div className="d-flex info-div">
                                <p className='title'>Mobile No. :</p>
                                <p className='info'>7977215936</p>
                            </div>
                            <div className="d-flex info-div">
                                <p className='title'>Mobile No. :</p>
                                <p className='info'>7977215936</p>
                            </div>
                            <div className="d-flex info-div">
                                <p className='title'>Mobile No. :</p>
                                <p className='info'>7977215936</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile