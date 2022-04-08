import React, { useState } from 'react'
import { MultiSelect } from '@mantine/core';
import axios from 'axios';
import { baseUrl } from '../../../constants.js'

const UploadJob = () => {

    const [jobDetails, setJobDetails] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([]);

    const changeHandlerRec = (e) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })
    }

    const HandleSubmitRec = (e) => {
        e.preventDefault()
        const reqPayload = { ...jobDetails, skills_required: [...data], recruiter: parseInt(localStorage.getItem("USER_ID")) }
        setIsLoading(true)

        axios.post(`${baseUrl}/api/jobs/`, reqPayload)
            .then((res) => {
                console.log(res);
                alert("Job Uploaded succesfully!")
                setIsLoading(false)
                window.location.reload();
            })
            .catch((e) => {
                alert("Something went wrong!")
                setIsLoading(false)
            })
    }

    const dateInput = (e) => {
        e.target.type = "date";
    }


    return (
        <>
            {/* Upload Job */}
            <div className="modal fade" id="uploadJob" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Job Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={HandleSubmitRec}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 my-2">
                                        <input type="text" name="designation" id="designation" onChange={changeHandlerRec} placeholder="Designation" />
                                    </div>
                                    <div className="col-12 my-2">
                                        <textarea rows="3" name="job_description" onChange={changeHandlerRec} placeholder="Job Description" />
                                    </div>
                                    <div className="col-12 my-2">
                                        <input type="text" name="location" onChange={changeHandlerRec} placeholder="Location" />
                                    </div>
                                    <div className="col-6 my-2">
                                        <input type="text" onFocus={dateInput} name="start_date" onChange={changeHandlerRec} placeholder="Start Date" />
                                    </div>
                                    <div className="col-6 my-2">
                                        <input type="text" onFocus={dateInput} name="apply_by" onChange={changeHandlerRec} placeholder="Apply By" />
                                    </div>
                                    <div className="col-6 my-2">
                                        <input type="number" name="duration" onChange={changeHandlerRec} placeholder="Duration" />
                                    </div>
                                    <div className="col-6 my-2">
                                        <input type="number" name="stipend" onChange={changeHandlerRec} placeholder="Stipend" />
                                    </div>
                                    <div className="col-12 my-2">
                                        <MultiSelect
                                            data={data}
                                            placeholder="Skills required"
                                            searchable
                                            creatable
                                            getCreateLabel={(query) => `+ Create ${query}`}
                                            onCreate={(query) => setData((current) => [...current, query])}
                                        />
                                    </div>
                                    <div className="col-12 my-2">
                                        <input type="text" name="perks" onChange={changeHandlerRec} placeholder="Perks" />
                                    </div>
                                    <div className="col-6 my-2">
                                        <input type="text" name="who_can_apply" onChange={changeHandlerRec} placeholder="Who can Apply" />
                                    </div>
                                    <div className="col-6 my-2">
                                        <input type="number" name="number_of_openings" onChange={changeHandlerRec} placeholder="No. of openings" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" >
                                    {isLoading === true ? <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : "Send"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadJob