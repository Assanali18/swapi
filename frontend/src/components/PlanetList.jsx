import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlanetsList = () => {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState('http://localhost:4444/api/planets/'); // Используйте относительный URL вашего API
    const navigate = useNavigate();
    useEffect(() => {

        fetchPlanets(nextPageUrl);
    }, []);

    const fetchPlanets = (url) => {

        // setLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPlanets(prevPlanets => [...prevPlanets, ...data.results]);
                const nextPageNumber = new URLSearchParams(new URL(data.next).search).get('page');
                setNextPageUrl(nextPageNumber ? `http://localhost:4444/api/planets?page=${nextPageNumber}` : null);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching planets:', error);
                setLoading(false);
            });
    };

    const handleLoadMore = () => {
        if (nextPageUrl) {
            fetchPlanets(nextPageUrl);
        }
    };

    if(loading) return <div>Loading...</div>

    return (
        <div>
            <h1>Planets</h1>
            <ul>
                {planets.map((planet, index) => (
                    <li key={index} onClick={() => navigate(`/planets/${encodeURIComponent(planet.name)}`)}>{planet.name}</li>
                ))}
            </ul>
            {nextPageUrl && <button onClick={handleLoadMore}>Load More</button>}
        </div>
    );
};

export default PlanetsList;
