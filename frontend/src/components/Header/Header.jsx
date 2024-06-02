import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Search from '../Search/Search';
import style from './Header.module.css';

export const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <nav className={`navbar navbar-expand-lg bg-body-tertiary border-bottom p-0`}>
            <div className="container-fluid d-flex justify-content-between m-0">
                <div className="d-flex flex-nowrap">
                    <div className={`navbar-brand font-monospace ${style.navbarBrand}`}>Star Wars</div>
                    <div className="collapse navbar-collapse">
                        <div className={`navbar-nav font-monospace`}>
                            <NavLink className={({isActive}) => isActive ?
                                `${style.navLink} ${style.navLinkActive}` : style.navLink}
                                     to="/planets">Planets</NavLink>
                            <NavLink className={({isActive}) => isActive ?
                                `${style.navLink} ${style.navLinkActive}` : style.navLink}
                                     to="/people">People</NavLink>
                            <NavLink className={({isActive}) => isActive ?
                                `${style.navLink} ${style.navLinkActive}` : style.navLink}
                                     to="/starships">Starships</NavLink>
                        </div>
                    </div>
                </div>
                <Search/>
                <div>
                    {token ? (
                        <>
                            <span
                                className={`navbar-text mr-3 font-monospace ${style.navText}`}>
                                Hello, <span>{username}</span></span>
                            <button type="button" className={"btn btn-outline-danger font-monospace m-lg-2"}
                                    onClick={handleLogout}>Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={`btn font-monospace ${style.login}`}
                                    onClick={() => navigate('login')}>Sign in
                            </button>
                            <button className={`btn font-monospace m-lg-2 ${style.register}`}
                                    onClick={() => navigate('register')}>Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;


