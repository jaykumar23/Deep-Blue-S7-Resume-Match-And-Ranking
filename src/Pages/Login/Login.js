import React, { Component } from 'react'
import { } from './Login.css'
import axios from 'axios';
import image from '../../Assets/Login.png'
import { NavLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    // componentDidMount() {
    // const handleReq = axios.get(`http://37d9-2402-3a80-69d-f78e-953-3f73-22a5-6f99.ngrok.io/api/applicants/5`)
    //     .then(res => {
    //         const persons = res.data;
    //         const reqData = persons[0].job
    //         // const div = document.getElementById("result");
    //         // div.innerHTML = reqData;
    //         console.log(reqData);
    //         // this.setState({ persons });
    //         // return reqData
    //     })

    // handleReq()

    // }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post('http://c45b-2401-4900-1724-4e7a-6d-495d-ee22-a12f.ngrok.io/api/login/', this.state)
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                    alert("Login Successfull")
                    localStorage.setItem("USER_ID", response.data.id);
                    localStorage.setItem("USER_NAME", response.data.first_name);
                }
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 400) {
                    alert("Invalid Credential")
                } else {
                    alert("Something Went Wrong!")
                }
            })
    }

    logout = () => {
        const id = localStorage.getItem("USER_ID");
        const name = localStorage.getItem("USER_NAME");
        axios.post(`http://c45b-2401-4900-1724-4e7a-6d-495d-ee22-a12f.ngrok.io/api/logout/${id}`,)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert(`${name}, Logout Successfull!`)
                    localStorage.clear();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const { email, password } = this.state;
        return (
            <>
                <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
                    <div className="login container bg-light my-auto mx-3" style={{ position: "relative" }}>
                        <div className="row">
                            <div className="col-lg-5 d-flex flex-column align-items-center justify-content-center d-none d-lg-flex" style={{ height: "90vh" }}>
                                <img src={image} alt="login" className='img-fluid' />
                            </div>
                            <div className="col-lg-7 d-flex flex-column align-items-center justify-content-center" style={{ height: "90vh" }}>
                                <h2 className='fw-800 text-center'>Member Login</h2>

                                <div className="login-inputs my-4 d-flex flex-column w-100 align-items-center justify-content-center">
                                    <form onSubmit={this.submitHandler} className='d-flex flex-column justify-content-center align-items-center w-100'>
                                        <input name="email" type="email" placeholder='Email' required id='email' autoComplete='off' value={email} onChange={this.changeHandler} />
                                        <input name="password" type="password" placeholder='Password' required id='password' value={password} onChange={this.changeHandler} />
                                        <button type='submit' >Login</button>
                                    </form>
                                </div>

                                <p id='forgot'>Forgot <span> Username / Password ?</span></p>

                                <button className="btn " onClick={this.logout}>Logout</button>

                                <NavLink to="/register" id='register-btn'>Register Yourself <ArrowForwardIcon /></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
