import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';

const PlanetInfo = () => {
    const { name } = useParams();
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4444/api/planets/${encodeURIComponent(name)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPlanet(data);
                const residentPromises = data.residents.map(url =>
                    fetch(url).then(response => response.json())
                );
                return Promise.all(residentPromises);
            }).then(residentData => {
            setResidents(residentData);
            setLoading(false);
        })
            .catch(error => {
                console.error('Error fetching planet details:', error);
                setLoading(false);
            });
    }, [name]);

    if (loading) return <div>Loading...</div>;
    if (!planet) return <div>Planet not found.</div>;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <div className="card font-monospace" style={{width: "50%"}}>
                <div className="card-header text-white" style={{backgroundColor: "red"}}>
                    <h1>{planet.name}</h1>
                </div>
                <div className="card-body bg-light">
                    <p className="text-secondary"><strong>Diameter:</strong> {planet.diameter} km</p>
                    <p className="text-secondary"><strong>Population:</strong> {planet.population}</p>
                    <p className="text-secondary"><strong>Climate:</strong> {planet.climate}</p>
                    <p className="text-secondary"><strong>Terrain:</strong> {planet.terrain}</p>
                    <p className="text-secondary"><strong>Residents:</strong></p>
                    <ul>
                        {residents.map((resident, index) => (
                            <li key={index}>
                                <Link to={`/people/${encodeURIComponent(resident.name)}`}>{resident.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlanetInfo;
