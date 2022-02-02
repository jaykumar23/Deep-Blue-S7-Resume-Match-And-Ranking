import React, { useState, useEffect } from 'react';
import Pages from './Pages';
import { BrowserRouter } from 'react-router-dom';
import LoginRegister from './LoginRegister';

const LandingPage = () => {
    const local = localStorage.getItem("isLoggedIn")
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (local) {
            (local === "true" ? setIsLoggedIn(true) : setIsLoggedIn(false))
        } else {
            localStorage.setItem("isLoggedIn", "false")
        }
    }, []);

    return (
        <BrowserRouter>
            {isLoggedIn ? <Pages /> : <LoginRegister />}
        </BrowserRouter>
    );
};

export default LandingPage;
