import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('people'); // Изначально устанавливаем любую категорию по умолчанию
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Определение категории поиска на основе текущего маршрута
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
        // Переходим на страницу результатов поиска
        navigate(`/search?query=${encodeURIComponent(query)}&category=${category}`);
    };

    return (
        <form className="d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder={`Search in ${category}`}
                aria-label="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="me-2"
            >
                <option value="people">People</option>
                <option value="planets">Planets</option>
                <option value="starships">Starships</option>
            </select>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

export default Search;
