import React, { Component } from 'react'
import { } from './PrimaryTab.css'
import axios from "axios"

export default class PrimaryTab extends Component {

    state = {
        primaryOffers: []
    }

    componentDidMount() {
        axios.get("http://e2b2-2402-3a80-1865-75da-b99b-9d94-a0bb-12ab.ngrok.io/api/all_job/")
            .then(res => {
                // console.log(res.data);
                this.setState({ primaryOffers: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <>
                {this.state.primaryOffers.map((curElem, index) => {
                    return (
                        <div className="conatiner-fluid tab-card" key={index}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <h5>{curElem.recruiter.company_name}</h5>
                            <p>{`Description: ${curElem.job.job_description} | and | ${curElem.job.perks}`}</p>
                        </div>
                    )

                })}
            </>
        )
    }
}
