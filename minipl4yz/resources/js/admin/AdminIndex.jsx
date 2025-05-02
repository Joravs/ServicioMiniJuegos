import { useEffect, useState } from "react";
import { Box, Typography,Tabs,Tab } from "@mui/material";
import { useUser } from '$/auth/UserContext';
import UserTable from "./components/UserTable";
import GamesTable from "./components/GamesTable";

export default function AdminIndex(){
    const [tabValue,setTabValue]=useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                className="animate__animated animate__fadeIn"
            >
                <Tab label='Usuarios'/>
                <Tab label='Juegos'/>
            </Tabs>
            {tabValue===0 &&
                <Box sx={{width: '80vw',mx:'auto'}}>
                    <UserTable/>
                </Box>
            }
            {tabValue===1 &&
                <Box sx={{width: '80vw',mx:'auto'}}>
                    <GamesTable/>
                </Box>
            }
        </Box>
    )
}