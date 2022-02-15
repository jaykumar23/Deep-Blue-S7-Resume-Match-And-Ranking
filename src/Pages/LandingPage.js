import React, { useState, useEffect } from 'react';
import Pages from './Pages';
import { BrowserRouter } from 'react-router-dom';
import LoginRegister from './LoginRegister';

const LandingPage = () => {
    const currLoginStatus = localStorage.getItem("isLoggedIn")
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (currLoginStatus) {
            (currLoginStatus === "true" ? setIsLoggedIn(true) : setIsLoggedIn(false))
        } else {
            localStorage.setItem("isLoggedIn", "false")
        }
    }, [currLoginStatus]);

    return (
        <BrowserRouter>
            {isLoggedIn ? <Pages /> : <LoginRegister />}
        </BrowserRouter>
    );
};

export default LandingPage;
