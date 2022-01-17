import * as React from 'react';
import Navbar from '../../Components/Navigation/Navbar/Navbar'
import { } from './Home.css'
import Sidebar from '../../Components/Home/Sidebar/Sidebar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MainScreen from '../../Components/Home/MainScreen/MainScreen';
import ReplayIcon from '@mui/icons-material/Replay';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default class Home extends React.Component {


    render() {
        return (
            <>
                <Navbar />
                <div className="home container-fluid m-0 p-0">
                    <div className="row p-0 m-0 my-2">
                        <div className="col-md-3 col-lg-2 ">
                            <button id='upload-btn' type='up' className='d-flex align-items-center justify-content-center'> <CloudUploadIcon className="me-3" />Upload Resume</button>
                        </div>
                        <div className=" col-md-9 col-lg-10 d-flex align-items-center justify-content-around my-2 my-md-0 flex-wrap px-1">
                            <input className="form-check-input d-none d-md-block" type="checkbox" value="" id="flexCheckDefault" title="Select" />
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
                                <div>
                                    <button className='action-btn d-none d-md-block' ><ChevronLeftIcon /></button>
                                </div>
                                <div >
                                    <button className='action-btn d-none d-md-block' ><ChevronRightIcon /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-0 m-0 pe-3 ms-3 ms-md-0 ">
                        <div className="col-md-3 col-lg-2">
                            <Sidebar />
                        </div>
                        <div className="col-md-9 col-lg-10 p-0 mainscreen mb-3">
                            <MainScreen />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
