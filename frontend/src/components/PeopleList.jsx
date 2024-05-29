import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PeopleList = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState('http://localhost:4444/api/people/');
    const navigate = useNavigate();
    useEffect(() => {

        fetchPeople(nextPageUrl);
    }, []);

    const fetchPeople = (url) => {

        // setLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPeople(prevPeople => [...prevPeople, ...data.results]);
                const nextPageNumber = new URLSearchParams(new URL(data.next).search).get('page');
                setNextPageUrl(nextPageNumber ? `http://localhost:4444/api/people?page=${nextPageNumber}` : null);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching people:', error);
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>
    const handleLoadMore = () => {
        if (nextPageUrl) {
            fetchPeople(nextPageUrl);
        }
    };


    return (
        <div>
            <h1>People</h1>
            <ul>
                {people.map((person, index) => (
                    <li key={index} onClick={() => navigate(`/people/${encodeURIComponent(person.name)}`) }>{person.name}</li>
                ))}
            </ul>
            {nextPageUrl && <button onClick={handleLoadMore}>Load More</button>}
        </div>
    );
};

export default PeopleList;
