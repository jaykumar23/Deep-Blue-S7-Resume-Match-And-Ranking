import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Page2 from './Page2/Page2';
import Error from './Error/Error';

const Pages = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Navigate replace to="/" />} />
            <Route exact path="/register" element={<Navigate replace to="/" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default Pages;
