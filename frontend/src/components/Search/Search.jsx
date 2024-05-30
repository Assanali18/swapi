import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import './Search.css'

const Search = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('people');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.includes("/people")) {
            setCategory("people");
        } else if (location.pathname.includes("/planets")) {
            setCategory("planets");
        } else if (location.pathname.includes("/starships")) {
            setCategory("starships");
        }
    }, [location.pathname]);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(query)}&category=${category}`);
    };

    return (
        <form className="d-flex justify-content-center align-items-center font-monospace" onSubmit={handleSubmit}>
            <input
                className="form-control me-2 search-input"
                type="search"
                placeholder={`Search in ${category}`}
                aria-label="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <select
                className="form-select me-2 search-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option value="people">People</option>
                <option value="planets">Planets</option>
                <option value="starships">Starships</option>
            </select>
            <button className="btn search-button" type="submit">Search</button>
        </form>

    );
};

export default Search;
