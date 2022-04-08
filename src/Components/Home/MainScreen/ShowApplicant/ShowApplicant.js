import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { baseUrl } from '../../../../constants';
import './ShowApplicant.css'
import { Modal } from '@mantine/core';

const ShowApplicant = () => {
    const { jobid } = useParams();
    const url = window.location.pathname
    const [applicants, setApplicants] = useState([])
    const [viewProfile, setViewProfile] = useState(false)
    const [currentlyViewing, setCurrentlyViewing] = useState({})

    const getData = () => {
        axios.get(`${baseUrl}/api/job_applicants/${jobid}`)
            .then(res => {
                // console.log(res.data);
                setApplicants(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData()
    }, [url])


    const PopViewProfile = (id) => {
        const curProfile = applicants.filter(eachApplicant => eachApplicant.id === id)
        if (curProfile && curProfile.length > 0) {
            setCurrentlyViewing(curProfile[0])
            setViewProfile(true)
        }
    }

    const ApplicantStatus = (code, appId) => {
        const payload = { applicant: appId, job: parseInt(jobid), status: code }
        console.log(payload);
        axios.put(`${baseUrl}/api/status/`, payload)
            .then(res => {
                console.log(res);
                alert("Sent")
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            {applicants.map((e) => {
                const { skills, first_name, last_name, email, id } = e
                return (
                    <div className="applicant-list ">
                        <div className="d-flex">
                            <p className='fw-500 me-3'>{`${first_name} ${last_name}`}</p>
                            <p className='me-3'>{email}</p>
                            <p>{`${skills}`}</p>
                        </div>
                        <button id='pro-btn' onClick={() => { PopViewProfile(id) }}>View Profile</button>
                    </div>
                )
            })}
            <Modal withCloseButton={false} opened={viewProfile} onClose={() => { setCurrentlyViewing({}); setViewProfile(false) }}>
                <h1>{currentlyViewing.email}</h1>
                <button onClick={() => ApplicantStatus(1, currentlyViewing.applicant)}>Accept</button>
            </Modal>
        </div>
    )
}

export default ShowApplicant
