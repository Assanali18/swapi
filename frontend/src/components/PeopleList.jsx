import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import personImage from "../images/person.jpg"

const PeopleList = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState('http://localhost:4444/api/people/');
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
        <div className="container">
            <h1 className="text-md-center pt-3 font-monospace mb-4 ">People</h1>
            <div className="row">
                {people.map((person, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card w-60">
                            <img src={personImage} className="card-img-top" alt={person.name}/>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/people/${encodeURIComponent(person.name)}`}
                                    >{person.name}</Link>
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

export default PeopleList;
