import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';

const PeopleInfo = () => {
    const { name } = useParams();
    const [people, setPeople] = useState(null);
    const [loading, setLoading] = useState(true);
    const [starships, setStarships] = useState([]);
    const [homeworld, setHomeworld] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4444/api/people/${encodeURIComponent(name)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
            setPeople(data);
            const starshipPromises = data.starships.map(url =>
                fetch(url).then(response => response.json())
            );
            const homeworldPromise = fetch(data.homeworld).then(response => response.json());

            return Promise.all([...starshipPromises, homeworldPromise]);
        }).then(results => {
            const homeworldData = results.pop();
            setStarships(results);
            setHomeworld(homeworldData);
            setLoading(false);
        })
            .catch(error => {
                console.error('Error fetching person details:', error);
                setLoading(false);
            });
    }, [name]);

    if(loading) return <div>Loading...</div>
    if (!people) return <div>Person not found.</div>;


    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <div className="card font-monospace" style={{width: "50%"}}>
                <div className="card-header bg-success text-white">
                    <h1>{people.name}</h1>
                </div>
                <div className="card-body bg-light">
                    <p className="text-secondary"><strong>Gender:</strong> {people.gender}</p>
                    <p className="text-secondary"><strong>Hair color:</strong> {people.hair_color}</p>
                    <p className="text-secondary"><strong>Height:</strong> {people.height}</p>
                    <p className="text-secondary"><strong>Homeworld:</strong> {homeworld ?
                        <Link to={`/planets/${encodeURIComponent(homeworld.name)}`}>{homeworld.name}</Link> : 'Unknown'}
                    </p>
                    <p className="text-secondary"><strong>Birth year:</strong> {people.birth_year}</p>
                    <p className="text-secondary"><strong>Starships:</strong></p>
                    {starships.length > 0 ? (
                        <ul>
                            {starships.map((starship, index) => (
                                <li key={index}>
                                    <Link to={`/starships/${encodeURIComponent(starship.name)}`}>{starship.name}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : <p>No starships.</p>}
                </div>
            </div>
        </div>
    );
};

export default PeopleInfo;
