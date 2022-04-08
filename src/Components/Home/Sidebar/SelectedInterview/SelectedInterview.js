import React, { Component } from 'react'
import { } from './SelectedInterview.css'
import axios from "axios"
import { baseUrl } from '../../../../constants'
import Spinner from '../../../Spinner/Spinner'
import Tooltip from '@mui/material/Tooltip';
import { currentRole } from '../../../../constants'

export default class SelectedInterview extends Component {

    state = {
        selected: [],
        expiredJobs: [],
        isLoading: true,
        USER_ID: localStorage.getItem("USER_ID")
    }

    componentDidMount() {

        {
            currentRole === "applicant" ?
                axios.get(`${baseUrl}/api/applied_job/${this.state.USER_ID}`)
                    .then(res => {
                        // console.log(res.data);
                        this.setState({ isLoading: true })
                        this.setState({ selected: res.data })
                        this.setState({ isLoading: false })
                    })
                    .catch(err => {
                        console.log(err);
                    })
                :
                axios.get(`${baseUrl}/api/expired_jobs/${this.state.USER_ID}`)
                    .then(res => {
                        // console.log(res.data);
                        this.setState({ isLoading: true })
                        this.setState({ expiredJobs: res.data })
                        this.setState({ isLoading: false })
                        // console.log(this.state.expiredJobs);
                    })
                    .catch(err => {
                        console.log(err);
                    })
        }


    }

    render() {

        return (
            <>
                <div className="selected-interview container-fluid p-2 my-4 my-lg-2 ">
                    <h5 className='text-center'>{currentRole === "applicant" ? "Check Status" : "Expired Jobs"}</h5>
                    <div className="list-div pb-3">
                        {this.state.isLoading ? <Spinner /> : ""}

                        {currentRole === "applicant" ?

                            <>
                                {this.state.selected.length === 0 ?
                                    <div className="cotainer-fluid w-100 h-100 d-flex align-items-center justify-content-center">
                                        <p>No Jobs Applied</p>
                                    </div> : ""}

                                {this.state.selected.map((curElem, index) => {
                                    let selectStatus = curElem.job.status;
                                    switch (selectStatus) {
                                        case 1:
                                            return (
                                                <div className='interview-div my-2' key={index} >
                                                    <Tooltip title="Selected for Interview Round" placement="right" >
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <p>{curElem.recruiter.company_name}</p>
                                                            <div className="status" code="1" ></div>
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            )

                                        case 2:
                                            return (<div className='interview-div my-2' key={index} >
                                                <Tooltip title="Selected" placement="right" >
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <p>{curElem.recruiter.company_name}</p>
                                                        <div className="status" code="2"></div>
                                                    </div>
                                                </Tooltip>
                                            </div>)

                                        case 3:
                                            return (<div className='interview-div my-2' key={index}>
                                                <Tooltip title="Rejected" placement="right" >
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <p>{curElem.recruiter.company_name}</p>
                                                        <div className="status" code="3" ></div>
                                                    </div>
                                                </Tooltip>
                                            </div>)

                                        default: return (<div className='interview-div my-2' key={index} >
                                            <Tooltip title="Not Selected yet" placement="right" >
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <p>{curElem.recruiter.company_name}</p>
                                                    <div className="status" code="0" ></div>
                                                </div>
                                            </Tooltip>
                                        </div>)

                                    }
                                })}
                            </>
                            :
                            <>
                                {this.state.expiredJobs.length === 0 ?
                                    <div className="cotainer-fluid w-100 h-100 d-flex align-items-center justify-content-center">
                                        <p>No Jobs Expired</p>
                                    </div> : ""}
                                {this.state.expiredJobs.map((curElem, index) => {
                                    const { designation, apply_by } = curElem
                                    return (
                                        <>
                                            <div className="expired-job">
                                                <p className='fw-500' id='desig'>{designation}</p>
                                                <p id='exp-date'>Expired on : <br /> {apply_by}</p>
                                            </div>
                                        </>
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
