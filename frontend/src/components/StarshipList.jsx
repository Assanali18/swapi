import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import starshipImage from '../images/starship.webp';

const StarshipList = () => {
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState('http://localhost:4444/api/starships/');
    useEffect(() => {

        fetchStarship(nextPageUrl);
    }, []);

    const fetchStarship = (url) => {

        // setLoading(true);
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

    const handleLoadMore = () => {
        if (nextPageUrl) {
            fetchStarship(nextPageUrl);
        }
    };

    if(loading) return <div>Loading...</div>

    return (
        <div className="container">
            <h1 className="text-md-center pt-3 font-monospace mb-4 ">Starships</h1>
            <div className="row">
                {starships.map((starship, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card w-60">
                            <img src={starshipImage} className="card-img-top" alt={starship.name}/>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/starships/${encodeURIComponent(starship.name)}`}
                                    >{starship.name}</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {nextPageUrl && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={handleLoadMore}>Load More</button>
                </div>
            )}
        </div>
    );
};

export default StarshipList;
