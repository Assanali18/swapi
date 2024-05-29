import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StarshipList = () => {
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState('http://localhost:4444/api/starships/');
    const navigate = useNavigate();
    useEffect(() => {

        fetchStarship(nextPageUrl);
    }, []);

    const fetchStarship = (url) => {

        setLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setStarships(prevStarship => [...prevStarship, ...data.results]);
                const nextPageNumber = new URLSearchParams(new URL(data.next).search).get('page');
                setNextPageUrl(nextPageNumber ? `http://localhost:4444/api/starships?page=${nextPageNumber}` : null);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching starship:', error);
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>
    const handleLoadMore = () => {
        if (nextPageUrl) {
            fetchStarship(nextPageUrl);
        }
    };


    return (
        <div>
            <h1>Starship</h1>
            <ul>
                {starships.map((starship, index) => (
                    <li key={index} onClick={() => navigate(`/starships/${encodeURIComponent(starship.name)}`) }>{starship.name}</li>
                ))}
            </ul>
            {nextPageUrl && <button onClick={handleLoadMore}>Load More</button>}
        </div>
    );
};

export default StarshipList;
