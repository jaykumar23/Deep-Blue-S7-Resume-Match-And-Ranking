import React, { Component } from 'react'
import { } from './PrimaryTab.css'
import axios from "axios"
import { baseUrl } from '../../../../constants'
import Spinner from '../../../Spinner/Spinner'

export default class PrimaryTab extends Component {

    state = {
        primaryOffers: [],
        isLoading: true,
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/all_job/`)
            .then(res => {
                this.setState({ isLoading: true })
                this.setState({ primaryOffers: res.data })
                this.setState({ isLoading: false })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <>

                {this.state.isLoading ? <Spinner /> : ""}
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
