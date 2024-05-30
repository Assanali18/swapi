import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import planetImage from "../images/planet.webp";

const PlanetsList = () => {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState('http://localhost:4444/api/planets/');
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
        <div className="container">
            <h1 className="text-md-center pt-3 font-monospace mb-4 ">Planets</h1>
            <div className="row">
                {planets.map((planet, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card w-60">
                            <img src={planetImage} className="card-img-top" alt={planet.name}/>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/planets/${encodeURIComponent(planet.name)}`}
                                    >{planet.name}</Link>
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

export default PlanetsList;
