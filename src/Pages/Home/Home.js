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

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: `${localStorage.getItem("USER_ID")}`,
            url: "",
            isLoading: false,
        }
    }
    render() {
        const changeHandler = (e) => {
            this.setState({ "url": e.target.value })
        }
        const uploadResume = () => {
            const id = localStorage.getItem("USER_ID")
            if (this.state.url.trim() === "") {
                alert("Field cannot be empty!")
            } else {
                this.setState({ isLoading: true })
                console.log(this.state);
                axios.post(`${baseUrl}/api/resume/${id}`, this.state)
                    .then((res) => {
                        alert("Resume Uploaded succesfully!")
                        window.location.reload();
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
                            <button id='upload-btn' data-bs-toggle="modal" data-bs-target="#exampleModal" type='up' className='d-flex align-items-center justify-content-center' > <CloudUploadIcon className="me-3" />Upload Resume</button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Upload your Resume Link</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <input type="url" name="upload" id="upload" onChange={changeHandler} />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-success" onClick={uploadResume}>
                                                {this.state.isLoading === true ? <div class="spinner-border text-light" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div> : "Send"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-md-9 col-lg-10 d-flex align-items-center justify-content-around my-2 my-md-0 flex-wrap px-1">
                            {/* <input className="form-check-input d-none d-md-block" type="checkbox" value="" id="flexCheckDefault" title="Select" /> */}
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
                                {/* <div>
                                    <button className='action-btn d-none d-md-block' ><ChevronLeftIcon /></button>
                                </div>
                                <div >
                                    <button className='action-btn d-none d-md-block' ><ChevronRightIcon /></button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="row p-0 m-0 pe-3 ms-3 ms-md-0 ">
                        <div className="col-md-3 col-lg-2">
                            <Sidebar />
                        </div>
                        <div className="col-md-9 col-lg-10 p-0 mainscreen mb-3">
                            <Routes>
                                <Route path="" element={<MainScreen />} />
                                <Route exact path="view/:id" element={<ViewMail />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
