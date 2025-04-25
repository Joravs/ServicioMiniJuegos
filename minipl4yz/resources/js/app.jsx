import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Index from '@/pages/index';
import NavBar from '@/components/navbar'
import Login from '$/pages/login'
import '../css/app.css'
import * as bootstrap from 'bootstrap'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root'))
.render(
    <StrictMode>
        <Router>
            <NavBar />
            <Routes>
                <Route path='/stats' />
                <Route path='/fav' />
                <Route path='/my-profile' />

                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' />
                <Route path='/register' />
                <Route path='/' element={<Index/>} />
            </Routes>
        </Router>
    </StrictMode>
)