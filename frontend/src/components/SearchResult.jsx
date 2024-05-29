import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';

const SearchResults = () => {
    const [results, setResults] = useState([]);
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
        }
    }, [query, category]);

    return (
        <div>
            <h1>Search Results</h1>
            {results.length > 0 ? (
                <ul>
                    {results.map((item, index) => (
                        <li key={index}>
                            <Link to={`/${category}/${encodeURIComponent(item.name)}`}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : <p>No results found.</p>}
        </div>
    );
};

export default SearchResults;
