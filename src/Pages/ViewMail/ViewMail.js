import * as React from 'react';
import Navbar from '../../Components/Navigation/Navbar/Navbar'
import { } from './ViewMail.css'
import Sidebar from '../../Components/Home/Sidebar/Sidebar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MainScreen from '../../Components/Home/MainScreen/MainScreen';
import ReplayIcon from '@mui/icons-material/Replay';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailContainer from '../../Components/Home/MailContainer/MailContainer';
import { NavLink } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

class ViewMailCC extends React.Component {
    render() {
        console.log(this.props.location.state);
        const { job, recruiter } = this.props.location.state

        const viewWebsite = (link) => {
            window.location.href = link
        }

        return (
            <>
                <div className="container-fluid ViewJob p-0">
                    <div className="backToHome ps-3">
                        <Link to="/" className="d-flex align-items-center">
                            <ArrowBackIosIcon />
                            <p>Back to Jobs </p>
                        </Link>
                    </div>
                    <div>
                        <div className="container-fluid p-0 m-0">
                            <div className="container-title d-flex align-items-md-center flex-column w-100">
                                <div className="top-div d-flex align-items-md-center justify-content-between flex-column flex-md-row w-100 px-4">
                                    <div className="d-flex flex-column">
                                        <h3 className='fw-600' id='designation'>{job.designation}</h3>
                                        <p className='fw-600' id='company-name'> <BusinessIcon /> {recruiter.company_name}</p>
                                        <div className="location d-flex justify-content-start mt-1">
                                            <LocationOnIcon />
                                            <p className='text-light'>{job.location}</p>
                                        </div>
                                    </div>
                                    <button id='applyButton' className='my-3 my-md-0'>
                                        Apply Now
                                    </button>
                                </div>
                                <div className="container-fluid main-cover">
                                    <div className="details d-flex align-items-center justify-content-center justify-content-lg-start w-100 flex-wrap my-3 w-100">
                                        <div className="jobInfo me-5 d-flex flex-column mt-2">
                                            <p className='d-flex align-items-center'> <PlayCircleFilledWhiteIcon /> Start Date</p>
                                            <span> <p>{job.start_date}</p> </span>
                                        </div>
                                        <div className="jobInfo me-5 d-flex flex-column mt-2">
                                            <p className='d-flex align-items-center'> <CardGiftcardIcon /> Stipend</p>
                                            <span> <p>₹{job.stipend} /month</p></span>
                                        </div>
                                        <div className="jobInfo me-5 d-flex flex-column mt-2">
                                            <p className='d-flex align-items-center'> <DateRangeIcon /> Duration</p>
                                            <span> <p>{job.duration} months</p></span>
                                        </div>
                                        <div className="jobInfo me-5 d-flex flex-column mt-2">
                                            <p className='d-flex align-items-center'> <HourglassBottomIcon /> Apply By</p>
                                            <span> <p>{job.apply_by}</p></span>
                                        </div>
                                    </div>

                                    <div className="detailed-info my-3">

                                        <div className="about-company my-4">
                                            <h4 className='fw-600'>About {recruiter.company_name}</h4>
                                            <NavLink to="#" className="company-link" onClick={() => viewWebsite(`http://${recruiter.company_website}`)} >Visit {recruiter.company_name} Webiste</NavLink>
                                            <p className='my-3 '>{recruiter.company_description}</p>
                                        </div>

                                        <div className="row">

                                            <div className="col-md-6 flex-column justify-content-center align-content-center">
                                                <div className="about-job my-4">
                                                    <h4 className='fw-600'>About Job</h4>

                                                    <div className="job-description">
                                                        <p>{job.job_description}</p>
                                                    </div>

                                                    <div className="who-can-apply my-3">
                                                        <p className='title'>Who can Apply</p>
                                                        <p>{job.who_can_apply}</p>
                                                    </div>

                                                    <div className="skills d-flex flex-column my-3">
                                                        <p className='title'>Skill (s) Required</p>
                                                        <p>{job.skills_required}</p>
                                                    </div>

                                                    <div className="skills d-flex flex-column my-3">
                                                        <p className='title'>Perks</p>
                                                        <p>{job.perks}</p>
                                                    </div>

                                                    <div className="skills d-flex flex-column my-3">
                                                        <p className='title'>Number of openings</p>
                                                        <p>{job.number_of_openings}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 d-flex flex-column justify-content-center align-content-center">
                                                <div className="additional-info my-4">
                                                    <h4 className='fw-600'>Additional Information</h4>
                                                    <div className="skills d-flex flex-column my-3">
                                                        <p className='title'>Last updated at</p>
                                                        <p>{recruiter.updated_at}</p>
                                                    </div>

                                                    <div className="created-at">
                                                        <p className='title'>Created by</p>
                                                        <p>{recruiter.first_name} {recruiter.last_name} - ({recruiter.designation})</p>
                                                    </div>

                                                    <div className="created-at my-3">
                                                        <p className='title'>Created at</p>
                                                        <p>{recruiter.created_at}</p>
                                                    </div>

                                                    <div className="total-candidates-hired ">
                                                        <p className='title'>Total candidates hired </p>
                                                        <p>{recruiter.total_candidates_hired}</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


const ViewMail = (props) => {
    return <ViewMailCC props={{ ...props }} location={useLocation()} />
};
export default ViewMail;
