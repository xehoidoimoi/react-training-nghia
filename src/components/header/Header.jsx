import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
    const location = useLocation();
    const pathName = location.pathname;
    const users = useSelector(state => state.users);
    // console.log(users.currentUser)

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand">conduit</Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        {/* Add "active" className when you're on that page" */ }
                        <Link to="/" className={ pathName === "/" ? "nav-link active" : "nav-link" }>Home</Link>
                    </li>
                    {
                        users.currentUser
                            ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/editor" className={ pathName === "/editor" ? "nav-link active" : "nav-link" }> <i className="ion-compose"></i>&nbsp;New Article </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/settings" className={ pathName === "/settings" ? "nav-link active" : "nav-link" }> <i className="ion-gear-a"></i>&nbsp;Settings </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={ `/profile/${users.currentUser.user.username}` }
                                            className="nav-link ng-binding">
                                            <img src={ users.currentUser.user.image } alt="" className='user-pic' />{ users.currentUser.user.username }
                                        </Link>
                                    </li>
                                </>
                            )
                            : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/login" className={ pathName === "/login" ? "nav-link active" : "nav-link" }>Sign in</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className={ pathName === "/register" ? "nav-link active" : "nav-link" } >Sign up</Link>
                                    </li>
                                </>
                            )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Header;