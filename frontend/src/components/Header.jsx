import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Search from './Search'; // Убедитесь, что путь до компонента Search верный

export const Header = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Star Wars Wiki</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/planets"
                                 activeClassName="active"
                        >Planets</NavLink>
                        <NavLink className="nav-link" to="/people">People</NavLink>
                        <NavLink className="nav-link" to="/starships">Starships</NavLink>
                    </div>
                </div>
                <Search />
            </div>
        </nav>
    );
};
