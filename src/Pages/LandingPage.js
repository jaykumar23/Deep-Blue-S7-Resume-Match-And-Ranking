import React, { useState } from 'react';
import Pages from './Pages';
import { BrowserRouter } from 'react-router-dom';
import LoginRegister from './LoginRegister';

const LandingPage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    localStorage.setItem("isLoggedIn", isLoggedIn)

    console.log(isLoggedIn);

    return (
        <BrowserRouter>
            {isLoggedIn ? <Pages /> : <LoginRegister />}
        </BrowserRouter>
    );
};

export default LandingPage;
