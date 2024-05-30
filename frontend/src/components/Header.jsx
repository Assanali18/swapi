import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './Search';
import  './Header.css'

export const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/')
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary] border-bottom">
            <div className="container-fluid d-flex justify-content-between m-0 p-0">
                <div className="d-flex flex-nowrap">
                    <div className="navbar-brand font-monospace">Star Wars</div>
                    <div className="collapse navbar-collapse">
                        <div className="navbar-nav font-monospace">
                            <NavLink className="nav-link nav-text" activeClassName="custom-active-link"
                                     to="/planets">Planets</NavLink>
                            <NavLink className="nav-link nav-text " activeClassName="custom-active-link"
                                     to="/people">People</NavLink>
                            <NavLink className="nav-link nav-text" activeClassName="custom-active-link"
                                     to="/starships">Starships</NavLink>
                        </div>
                    </div>
                </div>
                <Search/>
                <div>
                    {token ? (
                        <>
                            <span className="navbar-text mr-3 font-monospace nav-text">Hello, <span>{username}</span></span>
                            <button type="button" className="btn btn-outline-danger font-monospace m-lg-2"
                                    onClick={handleLogout}>Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button  className="btn font-monospace login"
                                     onClick={()=>navigate('login')}>Sign in</button>
                            <button className="btn  font-monospace m-lg-2 register"
                                    onClick={()=>navigate('register')}>Register</button>
                        </>
                    )}
                </div>
            </div>
        </nav>

    );
};
