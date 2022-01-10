import * as React from 'react';
import { } from './Register.css'
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';



export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            password: "",
            gender: "",
            role: "",
            email: "",
            mobile_no: "",
            showPassword: false,
        }
    }

    getTodayDate = () => {
        const today = new Date();
        var month = today.getMonth() + 1;
        var date = today.getDate();

        if (month < 10) {
            month = "0" + month;
        }

        if (date < 10) {
            date = "0" + date;
        }

        return (`${today.getFullYear()}-${month}-${date}`);
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://c45b-2401-4900-1724-4e7a-6d-495d-ee22-a12f.ngrok.io/api/signup/', this.state)
            .then(response => {
                if (response.status === 201) {
                    alert("Account Created")
                }
            })
            .catch((error) => {
                if (error.response.status === 406) {
                    alert("User already exist")
                } else if (error.response.status === 204) {
                    alert("Coudln't get data from site")
                } else {
                    alert("Something Went Wrong!")
                }
            })
    }


    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        const { first_name, last_name, password, gender, role, email, mobile_no, showPassword } = this.state;
        return (
            <>
                <div className='d-flex align-items-center justify-content-center px-3 py-5' >
                    <div className="register container bg-light overflow-hidden">
                        <div className="d-flex register-title align-items-center w-100 p-3 mb-3">
                            <NavLink to="/login">
                                <div className="icon-div d-flex align-items-center justify-content-center p-1">
                                    <ArrowBackIcon />
                                </div>
                            </NavLink>
                            <h2 className='ms-4 text-center fw-800'>Register</h2>
                        </div>

                        <div className="p-4">
                            <form onSubmit={this.submitHandler} className="row gy-4 gx-4" >

                                <div className="col-md-6">
                                    <TextField name="first_name" value={first_name} color='success' required id="outlined-basic" label="First Name" variant="outlined" fullWidth onChange={this.changeHandler} />
                                </div>
                                <div className="col-md-6">
                                    <TextField name="last_name" value={last_name} color='success' required id="outlined-basic" label="Last Name" variant="outlined" fullWidth onChange={this.changeHandler} />
                                </div>
                                <div className="col-md-6 ps-4">
                                    <FormControl component="fieldset" required className='ms-2'>
                                        <FormLabel component="legend" color='success'>Gender</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender" color='success' value={gender} onChange={this.changeHandler}>
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="col-md-6">
                                    <TextField name="mobile_no" value={mobile_no} color='success' required type="number" id="outlined-basic" label="Mobile Number" variant="outlined" fullWidth onChange={this.changeHandler} />
                                </div>
                                <div className="col-md-12">
                                    <TextField name="email" value={email} color='success' required type="email" id="outlined-basic" label="Email" variant="outlined" fullWidth onChange={this.changeHandler} />
                                </div>
                                <div className="col-md-12">
                                    <FormControl variant="outlined" fullWidth required color='success'>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            name="password"
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={this.changeHandler}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                </div>


                                <div className="col-md-12">
                                    <FormControl required fullWidth color='success'>
                                        <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                                        <Select name="role" value={role}
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            label="Role"
                                            onChange={this.changeHandler}
                                        >
                                            <MenuItem value={"admin"}>Admin</MenuItem>
                                            <MenuItem value={"applicant"}>Applicant</MenuItem>
                                            <MenuItem value={"recuriter"}>Recuriter</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-2">
                                    <button type='submit' className='mt-4 button' >Submit</button>
                                </div>

                            </form>
                        </div>
                    </div >
                </div >
            </>
        )
    }
}
