import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import PrivateRoute from '$/auth/privateNavigate'
import { AuthProvider } from '$/auth/AuthContext';
import Index from '@/pages/index';
import NavBar from '@/components/navbar'
import Login from '$/pages/login'
import Logout from '$/component/logout'
import '../css/app.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root'))
.render(
    <StrictMode>
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/stats' />
                    <Route path='/fav' />
                    <Route path='/my-profile' />
                    
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                    <Route path='/register' />
                    <Route path='/' element={<Index/>} />
                </Routes>
            </Router>
        </AuthProvider>
    </StrictMode>
)