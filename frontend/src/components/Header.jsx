import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './Search';



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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-between">
                <div className="d-flex flex-nowrap">
                    <NavLink className="navbar-brand" to="/">
                        <img src={'/logo.png'} alt={logo}/>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link" to="/planets">Planets</NavLink>
                            <NavLink className="nav-link" to="/people">People</NavLink>
                            <NavLink className="nav-link" to="/starships">Starships</NavLink>
                        </div>
                    </div>
                </div>
                <Search/>
                <div>
                    {token ? (
                        <>
                            <span className="navbar-text mr-3">Hello, {username}</span>
                            <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link type="button" className="btn btn-outline-primary" to="/login">Sign in</Link>
                            <Link className="btn btn-primary" type="submit" to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
