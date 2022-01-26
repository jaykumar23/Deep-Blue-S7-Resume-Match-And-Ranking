import React from 'react';
import Login from './Login/Login'
import Register from './Register/Register';
import { Route, Routes } from 'react-router-dom';

const LoginRegister = () => {
    return (
        <Routes>
            <Route exact path="*" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
        </Routes>
    )
};

export default LoginRegister;
