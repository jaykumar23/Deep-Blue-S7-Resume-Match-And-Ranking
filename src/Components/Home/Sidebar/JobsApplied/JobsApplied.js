import React, { Component } from 'react'
import { } from './JobsApplied.css'
import axios from "axios"
import { baseUrl } from '../../../../constants'
import Spinner from '../../../Spinner/Spinner'

export default class JobsApplied extends Component {

    state = {
        jobsApplied: [],
        isLoading: true,
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/applied_jobs/1`)
            .then(res => {
                this.setState({ isLoading: true })
                this.setState({ jobsApplied: res.data })
                this.setState({ isLoading: false })
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
                        {this.state.isLoading ? <Spinner /> : ""}
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
