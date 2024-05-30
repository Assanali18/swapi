import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import starshipImage from '../images/starship.webp';
import planetImage from "../images/planet.webp";
import personImage from "../images/person.jpg"

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const category = queryParams.get('category');

    useEffect(() => {
        if (query && category) {
            fetch(`http://localhost:4444/api/search/${category}?query=${query}`)
                .then(response => response.json())
                .then(data => setResults(data.results))
                .catch(error => console.error('Error loading search results:', error));
            setLoading(false);
        }
    }, [query, category]);

    const getImageUrl = (item, category) => {
        switch (category) {
            case 'planets':
                return item.imageUrl || planetImage;
            case 'people':
                return item.imageUrl || personImage;
            case 'starships':
                return item.imageUrl || starshipImage;
            default:
                return '/images/default.jpg';
        }
    };
    if (loading) return <div>Loading...</div>
    return (
        <div className="container mt-4 font-monospace">
            <h1 className="mb-3">Search Results</h1>
            {results.length > 0 ? (
                <div className="row">
                    {results.map((item, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={getImageUrl(item, category)} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/${category}/${encodeURIComponent(item.name)}`}>
                                            {item.name}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                loading? <div>Loading...</div> :
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
