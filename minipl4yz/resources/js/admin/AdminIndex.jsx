import { useEffect, useState } from "react";
import { Box, Typography,Tabs,Tab } from "@mui/material";
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';
import { useUser } from '$/auth/UserContext';

export default function AdminIndex(){
    const [tabValue,setTabValue]=useState(0);
    const [users,setUsers] = useState([])
    const [games,setGames] = useState([])

    const obtenerDatos=async ()=>{
        await fetch(`${APP__URL}/api/index`)
        .then((response)=>{
            setGames(response.json().games)
        })
        .catch((error)=>{
            console.error(error)
        })

        await fetch(`${APP__URL}/api/allUsers`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
        })
        .then((response)=>{
            setUsers(response.json())
        })
        .catch((error)=>{
            console.error(error)
        })
    }
    useEffect(()=>{
        obtenerDatos()
    },[])
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
                <Box>
                    
                </Box>
            }
            {tabValue===1 &&
                <Box>
                    
                </Box>   
            }
        </Box>
    )
}