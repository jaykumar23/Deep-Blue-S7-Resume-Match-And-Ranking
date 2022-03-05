import React from 'react';
import { Navigate, Route, Routes, Redirect } from 'react-router-dom';
import Home from './Home/Home';
import Page2 from './Page2/Page2';
import Error from './Error/Error';
import ViewMail from './ViewMail/ViewMail';
import Sidebar from '../Components/Home/Sidebar/Sidebar'
import Profile from './Profile/Profile';

const Pages = () => {
    return (
        <>

            {/* <Sidebar /> */}
            <Routes>
                {/* <Route exact path="/" element={<Home />} /> */}
                <Route exact path="/" element={<Navigate replace to="/home" />} />

                <Route path="/home/*" element={<Home />} />
                <Route exact path="/login" element={<Navigate replace to="/" />} />
                <Route exact path="/register" element={<Navigate replace to="/" />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/page2" element={<Page2 />} />
                {/* <Route path="/view" element={<ViewMail />} /> */}
                {/* <Route path="*" element={<Error />} /> */}
            </Routes>
        </>
    );
};

export default Pages;
