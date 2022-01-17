import React, { Component } from 'react'
import { } from './SelectedInterview.css'
import axios from "axios"

export default class SelectedInterview extends Component {
    state = {
        selected: []
    }

    componentDidMount() {
        axios.get("http://e2b2-2402-3a80-1865-75da-b99b-9d94-a0bb-12ab.ngrok.io/api/applied_job/1")
            .then(res => {
                // console.log(res.data);
                this.setState({ selected: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <>
                <div className="selected-interview container-fluid p-2 my-4 my-lg-2 ">
                    <h5 className='text-center'>Selected For Interview</h5>
                    <div className="list-div pb-3">
                        {this.state.selected.map((curElem, index) => {
                            let selectStatus = curElem.job.status;
                            switch (selectStatus) {
                                case 1:
                                    return (<div className='interview-div my-2' key={index} title="Selected for Interview Round">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p>{curElem.recruiter.company_name}</p>
                                            <div className="status" code="1" ></div>
                                        </div>
                                    </div>)

                                case 2:
                                    return (<div className='interview-div my-2' key={index} title="Selected">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p>{curElem.recruiter.company_name}</p>
                                            <div className="status" code="2"></div>
                                        </div>
                                    </div>)

                                case 3:
                                    return (<div className='interview-div my-2' key={index} title="Rejected">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p>{curElem.recruiter.company_name}</p>
                                            <div className="status" code="3" ></div>
                                        </div>
                                    </div>)

                                default: return (<div className='interview-div my-2' key={index} title="Not Selected yet">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p>{curElem.recruiter.company_name}</p>
                                        <div className="status" code="0" ></div>
                                    </div>
                                </div>)

                            }
                        })}
                    </div>
                </div>
            </>
        )
    }
}
