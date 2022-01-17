import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { } from './MainScreen.css'
import PrimaryTab from './PrimaryTab/PrimaryTab';
import SecondaryTab from './SecondaryTab/SecondaryTab';
import TertiaryTab from './TertiaryTab/TertiaryTab';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

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
                    <Typography>{children}</Typography>
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
            <div className="MainScreen">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth" >
                            <Tab label=" Primary" {...a11yProps(0)} />
                            <Tab label="Secondary" {...a11yProps(1)} />
                            <Tab label="Tertiary" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className="container-fluid tab-container p-0 m-0">
                            <PrimaryTab />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className="container-fluid tab-container p-0 m-0">
                            <SecondaryTab />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TertiaryTab />
                    </TabPanel>
                </Box>
            </div>
        </>
    )
}

export default MainScreen
