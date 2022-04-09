import * as React from 'react';
import Navbar from '../../Components/Navigation/Navbar/Navbar'
import { } from './Home.css'
import Sidebar from '../../Components/Home/Sidebar/Sidebar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MainScreen from '../../Components/Home/MainScreen/MainScreen';
import ReplayIcon from '@mui/icons-material/Replay';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Route, Routes } from 'react-router-dom';
import ViewMail from '../ViewMail/ViewMail';
import axios from 'axios';
import { baseUrl } from '../../constants';
import Spinner from '../../Components/Spinner/Spinner';
import { currentRole } from '../../constants';
import UploadJob from '../../Components/Home/Modals/UploadJob';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        {
            this.state = {
                id: `${localStorage.getItem("USER_ID")}`,
                resume: "",
                isLoading: false,
            }
        }

    }
    render() {
        const changeHandler = (e) => {
            this.setState({ "resume": e.target.value })
        }

        const uploadResume = () => {
            const payload = { resume: this.state.resume, applicant: parseInt(this.state.id) }
            console.log(payload);
            const id = localStorage.getItem("USER_ID")
            if (this.state.resume.trim() === "") {
                alert("Field cannot be empty!")
            } else {
                this.setState({ isLoading: true })
                axios.post(`${baseUrl}/api/resume/${id}`, payload)
                    .then((res) => {
                        alert("Resume Uploaded succesfully!")
                        this.state.resume = ""
                        // window.location.reload();
                        this.setState({ isLoading: false })
                    })
                    .catch((e) => {
                        alert("Something went wrong!")
                        this.setState({ isLoading: false })
                    })
            }
        }

        return (
            <>
                <Navbar />
                <div className="home container-fluid m-0 p-0">
                    <div className="row p-0 m-0 my-2">
                        <div className="col-md-3 col-lg-2 ">

                            {currentRole === "applicant" ? <button id='upload-btn' data-bs-toggle="modal" data-bs-target="#uploadResume" type='up' className='d-flex align-items-center justify-content-center' > <CloudUploadIcon className="me-3" />Upload Resume</button> : <button id='upload-btn' data-bs-toggle="modal" data-bs-target="#uploadJob" type='up' className='d-flex align-items-center justify-content-center' > <CloudUploadIcon className="me-3" />Upload Job</button>}

                            {/* Upload Resume */}
                            <div className="modal fade" id="uploadResume" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Upload your Resume Link</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <input type="ur;" name="upload" id="upload" onChange={changeHandler} value={this.state.resume} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={uploadResume}>
                                                {this.state.isLoading === true ? <div className="spinner-border text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : "Send"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <UploadJob />


                        </div>
                        <div className=" col-md-9 col-lg-10 d-flex align-items-center justify-content-around my-2 my-md-0 flex-wrap px-1">
                            <div >
                                <button className='action-btn d-none d-lg-block' id="reloadButton" onClick={() => {
                                    window.location.reload();
                                }}> <ReplayIcon></ReplayIcon></button>
                            </div>
                            <div className="search-bar">
                                <input type="text" placeholder='Search Here...' />
                            </div>
                            <div className=" d-flex">
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-0 m-0 pe-3 ms-3 ms-md-0 ">
                        <div className="col-md-3 col-lg-2">
                            <Sidebar />
                        </div>
                        <div className="col-md-9 col-lg-10 p-0 mainscreen mb-3">
                            <Routes>
                                <Route path="*" element={<MainScreen />} />
                                <Route exact path="view/:id" element={<ViewMail />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
