import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { } from './MainScreen.css'
import PrimaryTab from './PrimaryTab/PrimaryTab';
import { currentRole } from '../../../constants';
import { useParams, Route, Routes } from 'react-router-dom';
import ShowApplicant from './ShowApplicant/ShowApplicant';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    const { id } = useParams();
    console.log(id);

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const MainScreen = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="MainScreen h-100">

                {currentRole === "applicant" ? <>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth" >
                                <Tab label=" Primary" {...a11yProps(0)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <div className="container-fluid tab-container p-0 m-0">
                                <PrimaryTab />
                            </div>
                        </TabPanel>
                    </Box></>
                    :
                    <>
                        <Routes>
                            <Route path="" element={<><h4 className='text-center silent-text h-100 mt-5'>Select a Job</h4></>} />
                            <Route path="/:jobid" element={<ShowApplicant />} />
                        </Routes>
                    </>}
            </div>
        </>
    )
}

export default MainScreen
