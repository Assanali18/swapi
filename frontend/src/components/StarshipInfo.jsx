import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StarshipInfo = () => {
    const { name } = useParams();
    const [starship, setStarship] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:4444/api/starships/${encodeURIComponent(name)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setStarship(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching starship details:', error);
                setLoading(false);
            });
    }, [name]);

    if (loading) return <div>Loading...</div>;
    if (!starship) return <div>Starship not found.</div>;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <div className="card font-monospace" style={{width: "50%"}}>
                <div className="card-header bg-primary text-white">
                    <h1>{starship.name}</h1>
                </div>
                <div className="card-body bg-light">
                    <p className="text-secondary"><strong>Model:</strong> {starship.model}</p>
                    <p className="text-secondary"><strong>Cargo Capacity:</strong> {starship.cargo_capacity}</p>
                    <p className="text-secondary"><strong>Cost:</strong> {starship.cost_in_credits}</p>
                    <p className="text-secondary"><strong>Max Atmosphering
                        Speed:</strong> {starship.max_atmosphering_speed}</p>
                    <p className="text-secondary"><strong>Length:</strong> {starship.length}</p>
                    <p className="text-secondary"><strong>Max Passengers:</strong> {starship.passengers}</p>
                    <p className="text-secondary"><strong>HyperDrive rating:</strong> {starship.hyperdrive_rating}</p>
                </div>
            </div>
        </div>


    );
};

export default StarshipInfo;