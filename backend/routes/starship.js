import express from 'express';
import axios from 'axios';

const router = express.Router();


router.get('/', async (req, res) => {
    const page = req.query.page; 
    const url = `https://swapi.dev/api/starships/${page ? '?page=' + page : ''}`;


    try {
        const response = await axios.get(url);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching starships from SWAPI:', error.message);
        res.status(500).send('Failed to fetch data');
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
