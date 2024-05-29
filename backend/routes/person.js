import express from 'express';
import axios from 'axios';

const router = express.Router();


router.get('/', async (req, res) => {
    const page = req.query.page; // Получение номера страницы из запроса
    const url = `https://swapi.dev/api/people/${page ? '?page=' + page : ''}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching peoples from SWAPI:', error.message);
        res.status(500).send('Failed to fetch data');
    }
});

router.get('/:name', async (req, res)=>{
    const { name } = req.params;

    try {
        const response = await axios.get(`https://swapi.dev/api/people/?search=${name}`);
        
        const peopleData = response.data.results[0] || null;
        if (peopleData) {
            res.json(peopleData);
        } else {
            console.log(name);
            res.status(404).send('Person not found');
        } 
    } catch (error) {
        console.error('Error fetching person details:', error);
        res.status(500).send('Failed to fetch person details');
    }
})

export default router;
