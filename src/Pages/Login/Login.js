import React, { Component } from 'react'
import { } from './Login.css'
import axios from 'axios';
import image from '../../Assets/LoginHome.svg'
import { NavLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { baseUrl } from '../../constants'
import Spinner from '../../Components/Spinner/Spinner';
import validator from 'validator'


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            isLoading: false,
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        // console.log(`${baseUrl}/api/login`);
        e.preventDefault();
        if (!validator.isEmail(this.state.email) || validator.isEmpty(this.state.email)) {
            alert("Enter valid email")
        } else if (validator.isEmpty(this.state.password)) {
            alert("Password cannot be empty")
        } else {
            this.setState({ isLoading: true })
            axios.post(`${baseUrl}/api/login/`, this.state)
                .then(response => {
                    if (response.status === 200) {
                        // alert("Login Successfull")
                        localStorage.setItem("isLoggedIn", "true");
                        localStorage.setItem("USER_ID", response.data.id);
                        localStorage.setItem("USER_FNAME", response.data.first_name);
                        localStorage.setItem("USER_LNAME", response.data.last_name);
                        localStorage.setItem("USER_GENDER", response.data.gender);
                        localStorage.setItem("USER_MOBILE", response.data.mobile_no);
                        localStorage.setItem("USER_EMAIL", response.data.email);
                        localStorage.setItem("USER_ROLE", response.data.role);
                        localStorage.setItem("USER_SKILLS", response.data.skills);
                        localStorage.setItem("USER_EDUCATION", response.data.education);
                        this.setState({ isLoading: false })
                        window.location.reload()
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401 || error.response.status === 400) {
                        alert("Invalid Credential")
                        this.setState({ isLoading: false })
                    } else {
                        alert("Something Went Wrong!")
                        this.setState({ isLoading: false })
                    }
                })
        }
    }

    logout = () => {
        const id = localStorage.getItem("USER_ID");
        const name = localStorage.getItem("USER_NAME");
        axios.post(`${baseUrl}/api/logout/${id}`,)
            .then(response => {
                if (response.status === 200) {
                    alert(`${name}, Logout Successfull!`)
                    localStorage.clear();
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong!")
            })
    }

    render() {
        const { email, password } = this.state;
        return (
            <>
                <div className='main-container d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
                    <div className="login container  my-auto mx-3" style={{ position: "relative" }}>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column align-items-center justify-content-center d-none d-md-flex ps-5" style={{ height: "80vh" }}>
                                <img src={image} alt="login" className='img-fluid ms-4' />
                            </div>
                            <div className="col-md-6 d-flex flex-column align-items-center justify-content-center " style={{ height: "80vh" }}>
                                <h2 className='fw-800 text-center'>Member Login</h2>

                                <div className="login-inputs my-4 d-flex flex-column w-100 align-items-center justify-content-center">
                                    <form onSubmit={this.submitHandler} className='d-flex flex-column justify-content-center align-items-center w-100'>
                                        <input name="email" type="email" placeholder='Email' id='email' autoComplete='off' value={email} onChange={this.changeHandler} required />
                                        <input name="password" type="password" placeholder='Password' id='password' value={password} onChange={this.changeHandler} required />
                                        <button type='submit' className={this.state.isLoading ? "bg-dark" : ""}>
                                            {this.state.isLoading ? <Spinner /> : "Login"}
                                        </button>
                                    </form>
                                </div>

                                <p id='forgot'>Forgot <span> Username / Password ?</span></p>

                                {/* <button className="btn " onClick={this.logout}>Logout</button> */}

                                <NavLink to="/register" id='register-btn'>Register Yourself
                                    <span>
                                        <ArrowForwardIcon />
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
