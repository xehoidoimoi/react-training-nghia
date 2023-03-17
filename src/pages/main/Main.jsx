import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from './../../components/header/Header';

function Main() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Main