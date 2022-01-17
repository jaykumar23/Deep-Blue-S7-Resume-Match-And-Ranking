import React, { Component } from 'react'
import { } from './JobsApplied.css'
import axios from "axios"

export default class JobsApplied extends Component {

    state = {
        jobsApplied: []
    }

    componentDidMount() {
        axios.get("http://e2b2-2402-3a80-1865-75da-b99b-9d94-a0bb-12ab.ngrok.io/api/applied_jobs/1")
            .then(res => {
                this.setState({ jobsApplied: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                <div className="jobs-applied container-fluid p-2 m-0">
                    <h3 className='text-center fw-600' >Jobs Applied</h3>
                    <div className="job-container container-fluid p-0 ">

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

                    </div>
                </div>
            </>
        )
    }
}
