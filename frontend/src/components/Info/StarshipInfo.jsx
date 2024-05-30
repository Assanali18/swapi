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
            <div className="card font-monospace" style={{
                width: "50%",
                backgroundColor: 'transparent',
                borderColor: 'yellow',
                borderWidth: '1px',
                borderStyle: 'solid'
            }}>
                <div className="card-header">
                    <h1 style={{color: "yellow"}}>{starship.name}</h1>
                </div>
                <div className="card-body">
                    <p><strong style={{color: "yellow"}}>Model:</strong> {starship.model}</p>
                    <p><strong style={{color: "yellow"}}>Cargo Capacity:</strong> {starship.cargo_capacity}</p>
                    <p><strong style={{color: "yellow"}}>Cost:</strong> {starship.cost_in_credits}</p>
                    <p><strong style={{color: "yellow"}}>Max Atmosphering
                        Speed:</strong> {starship.max_atmosphering_speed}</p>
                    <p><strong style={{color: "yellow"}}>Length:</strong> {starship.length}</p>
                    <p><strong style={{color: "yellow"}}>Max Passengers:</strong> {starship.passengers}</p>
                    <p><strong style={{color: "yellow"}}>HyperDrive rating:</strong> {starship.hyperdrive_rating}</p>
                </div>
            </div>
        </div>


    );
};

export default StarshipInfo;