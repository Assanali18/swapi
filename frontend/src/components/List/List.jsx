import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import style from './List.module.css'

const List = ({ apiUrl, itemName, image, itemKey }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState(apiUrl);


    const fetchItems = (url) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setItems(prevItems => [...prevItems, ...data.results]);
                const nextPageNumber = new URLSearchParams(new URL(data.next).search).get('page');
                setNextPageUrl(nextPageNumber ? `${apiUrl}?page=${nextPageNumber}` : null);
                setLoading(false);
            })
            .catch(error => {
                console.error(`Error fetching ${itemName}:`, error);
                setLoading(false);
            });
    };
    
    useEffect(() => {
        fetchItems(nextPageUrl);
    }, []);

    const handleLoadMore = () => {
        if (nextPageUrl) {
            fetchItems(nextPageUrl);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1 className="text-md-center pt-3 font-monospace mb-4">{itemName}</h1>
            <div className="row">
                {items.map((item, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <Link to={`/${itemKey}/${encodeURIComponent(item.name)}`}>
                            <div className={`card w-60 ${style.card}`}>
                                <img src={image} className="card-img-top" alt={item.name}/>
                                <div className="card-body">
                                    <h5 className={`card-title ${style.cardTitle}`}>
                                        <Link to={`/${itemKey}/${encodeURIComponent(item.name)}`}
                                              className={style.linkToInfo}>
                                            {item.name}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {nextPageUrl && <button className="btn btn-primary center mt-4"
                                    onClick={handleLoadMore}>
                Load More
            </button>}
        </div>
    );
};

export default List;
