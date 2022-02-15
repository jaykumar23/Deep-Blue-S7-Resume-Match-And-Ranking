import React, { Component } from 'react'
import { } from './Login.css'
import axios from 'axios';
import image from '../../Assets/LoginHome.svg'
import { NavLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { baseUrl } from '../../constants'
import Spinner from '../../Components/Spinner/Spinner';


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
        this.setState({ isLoading: true })
        // console.log(`${baseUrl}/api/login`);
        e.preventDefault();
        axios.post(`${baseUrl}/api/login/`, this.state)
            .then(response => {
                if (response.status === 200) {
                    // alert("Login Successfull")
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("USER_ID", response.data.id);
                    localStorage.setItem("USER_NAME", response.data.first_name);
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
                                        <input name="email" type="email" placeholder='Email' required id='email' autoComplete='off' value={email} onChange={this.changeHandler} />
                                        <input name="password" type="password" placeholder='Password' required id='password' value={password} onChange={this.changeHandler} />
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
