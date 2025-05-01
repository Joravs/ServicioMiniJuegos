import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import PrivateRoute from '$/auth/privateNavigate'
import { AuthProvider } from '$/auth/AuthContext';
import { UserProvider } from '$/component/levels/UserContext';
import Index from '@/pages/index';
import GamesFav from '@/pages/gamesFav';
import NavBar from '@/components/navbar'
import Login from '$/pages/login'
import Register from '$/pages/register'
import Stats from '$/pages/stats'
import MyProfile from '$/pages/myProfile'
import Logout from '$/component/logout'
import '../css/app.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Buscaminas from '#/pages/Buscaminas'
import Snake from '#/pages/Snake'
import T2048 from '#/pages/T2048'

ReactDOM.createRoot(document.getElementById('root'))
.render(
    <StrictMode>
        <AuthProvider>
            <UserProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Index/>} />

                    <Route path='/stats' element={<PrivateRoute><Stats/></PrivateRoute>}/>
                    <Route path='/fav' element={<PrivateRoute><GamesFav/></PrivateRoute>}/>
                    <Route path='/my-profile' element={<PrivateRoute><MyProfile/></PrivateRoute>}/>

                    {/**User */}
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                    <Route path='/register' element={<Register/>}/>

                    {/**Games */}
                    <Route path='/catalog/Buscaminas' element={<PrivateRoute><Buscaminas/></PrivateRoute>}/>
                    <Route path='/catalog/Snake' element={<PrivateRoute><Snake/></PrivateRoute>}/>
                    <Route path='/catalog/T2048' element={<PrivateRoute><T2048/></PrivateRoute>}/>
                </Routes>
            </Router>
            </UserProvider>
        </AuthProvider>
    </StrictMode>
)