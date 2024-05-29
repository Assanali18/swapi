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
        <div>
            <h1>{starship.name}</h1>
            <p>Model: {starship.model}</p>
            <p>Cargo Capacity: {starship.cargo_capacity}</p>
            <p>Cost: {starship.cost_in_credits}</p>
            <p>Max Atmosphering Speed: {starship.max_atmosphering_speed}</p>
            <p>Length: {starship.length}</p>
            <p>Max Passengers: {starship.passengers}</p>
            <p>HyperDrive rating: {starship.hyperdrive_rating}</p>
        </div>
    );
};

export default StarshipInfo;