import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Index from '@/pages/index';
import NavBar from '@/components/navbar'
import '../css/app.css'
import * as bootstrap from 'bootstrap'


ReactDOM.createRoot(document.getElementById('root'))
.render(
    <StrictMode>
        <NavBar />
        <Index/>
    </StrictMode>
)