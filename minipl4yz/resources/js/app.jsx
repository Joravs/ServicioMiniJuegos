import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from '$/auth/privateNavigate';
import { AuthProvider } from '$/auth/AuthContext';
import { UserProvider } from '$/auth/UserContext';
import WebAdmin from '$/auth/webAdmin';
import Index from '@/pages/index';
import GamesFav from '@/pages/gamesFav';
import NavBar from '@/components/navbar';
import Login from '$/pages/login';
import Register from '$/pages/register';
import Stats from '$/pages/stats';
import MyProfile from '$/pages/myProfile';
import Logout from '$/component/logout';

import AdminIndex from '!/AdminIndex'


import G1 from '#/pages/g1';
import G2 from '#/pages/g2';
import G2048 from '#/pages/g2048';

ReactDOM.createRoot(document.getElementById('root'))
.render(
    <StrictMode>
        <AuthProvider>
            <UserProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Index/>} />
                    {/**Admin */}
                    <Route path='/admin' element={<WebAdmin><AdminIndex/></WebAdmin>}/>


                    {/**User */}
                    <Route path='/stats' element={<PrivateRoute><Stats/></PrivateRoute>}/>
                    <Route path='/fav' element={<PrivateRoute><GamesFav/></PrivateRoute>}/>
                    <Route path='/my-profile' element={<PrivateRoute><MyProfile/></PrivateRoute>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                    <Route path='/register' element={<Register/>}/>

                    {/**Games */}
                    <Route path='/catalog/g1' element={<PrivateRoute><G1/></PrivateRoute>}/>
                    <Route path='/catalog/g2' element={<PrivateRoute><G2/></PrivateRoute>}/>
                    <Route path='/catalog/g2048' element={<PrivateRoute><G2048/></PrivateRoute>}/>
                </Routes>
            </Router>
            </UserProvider>
        </AuthProvider>
    </StrictMode>
)