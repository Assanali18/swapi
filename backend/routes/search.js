import express from 'express';
import axios from 'axios';

const router = express.Router();


router.get('/:category', async (req, res) => {
    const { category } = req.params;
    const { query } = req.query;

    try {
        const response = await axios.get(`https://swapi.dev/api/${category}/?search=${query}`);
        res.json(response.data);
    } catch (error) {
        console.error('Search API error:', error);
        res.status(500).send('Error performing search');
    }
});

router.get('/:name', async (req, res)=>{
    const { name } = req.params;

    try {
        const response = await axios.get(`https://swapi.dev/api/starships/?search=${name}`);
        
        const starshipData = response.data.results[0] || null;
        if (starshipData) {
            res.json(starshipData);
        } else {
            console.log(name);
            res.status(404).send('Starship not found');
        } 
    } catch (error) {
        console.error('Error fetching starship details:', error);
        res.status(500).send('Failed to fetch starship details');
    }
})

export default router;
