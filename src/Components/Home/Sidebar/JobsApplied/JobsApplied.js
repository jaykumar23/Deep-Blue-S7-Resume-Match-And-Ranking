import React, { Component } from 'react'
import { } from './JobsApplied.css'
import axios from "axios"
import { baseUrl } from '../../../../constants'
import Spinner from '../../../Spinner/Spinner'
import { currentRole } from '../../../../constants'
import { Link } from "react-router-dom"

export default class JobsApplied extends Component {

    state = {
        jobsApplied: [],
        jobsPosted: [],
        isLoading: true,
        USER_ID: localStorage.getItem("USER_ID")
    }


    componentDidMount() {

        {
            currentRole === "applicant" ?

                axios.get(`${baseUrl}/api/applied_jobs/${this.state.USER_ID}`)
                    .then(res => {
                        this.setState({ isLoading: true })
                        this.setState({ jobsApplied: res.data })
                        this.setState({ isLoading: false })
                    })
                    .catch(err => {
                        console.log(err);
                    })

                :
                axios.get(`${baseUrl}/api/applicants/${this.state.USER_ID}`)
                    .then(res => {
                        this.setState({ isLoading: true })
                        this.setState({ jobsPosted: res.data })
                        this.setState({ isLoading: false })
                        // console.log(res);
                        // console.log(this.state.jobsPosted);
                    })
                    .catch(err => {
                        console.log(err);
                    })

        }
    }


    render() {
        return (
            <>
                <div className="jobs-applied container-fluid p-2 m-0">
                    <h3 className='text-center fw-600' >{currentRole === "applicant" ? "Jobs Applied" : "Jobs Posted"}</h3>
                    <div className="job-container container-fluid p-0 ">
                        {this.state.isLoading ? <Spinner /> : ""}

                        {currentRole === "applicant" ?
                            <>
                                {this.state.jobsApplied.length === 0 ?
                                    <div className="cotainer-fluid w-100 h-100 d-flex align-items-center justify-content-center">
                                        <p>No Jobs Applied</p>
                                    </div> : ""}
                                {this.state.jobsApplied.map((curElem, index) => {
                                    return (
                                        <div className="job-div my-2" key={index} >
                                            <div className="d-flex align-items-center justify-content-between w-100">
                                                <h5>{curElem.recruiter.company_name}</h5>
                                                <p>Rank</p>
                                            </div>
                                            <p>{curElem.job.designation}</p>
                                        </div>
                                    )
                                })}
                            </>
                            :
                            <>
                                {
                                    this.state.jobsPosted.length === 0 ?
                                        <div className="cotainer-fluid w-100 h-100 d-flex align-items-center justify-content-center">
                                            <p>No Jobs Posted</p>
                                        </div> : ""
                                }
                                {this.state.jobsPosted.map((curElem, index) => {
                                    const { job } = curElem
                                    return (
                                        <Link to={`${job.id}`}>
                                            <div className="job-div my-2" key={index} >
                                                <div className="d-flex align-items-center justify-content-between w-100">
                                                    <h5>{job.designation}</h5>
                                                    <p>{job.number_of_openings} Openings</p>
                                                </div>
                                                <p>{job.start_date}</p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </>
                        }

                    </div>
                </div>
            </>
        )
    }
}
