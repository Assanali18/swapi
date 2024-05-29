import express from 'express';
import axios from 'axios';

const router = express.Router();


router.get('/', async (req, res) => {
    const page = req.query.page; // Получение номера страницы из запроса
    const url = `https://swapi.dev/api/planets/${page ? '?page=' + page : ''}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching planets from SWAPI:', error.message);
        res.status(500).send('Failed to fetch data');
    }
});

router.get('/:name', async (req, res)=>{
    const { name } = req.params;
    try {
        const response = await axios.get(`https://swapi.dev/api/planets/?search=${name}`);
        const planetData = response.data.results[0] || null;
        if (planetData) {
            res.json(planetData);
        } else {
            res.status(404).send('Planet not found');
        } 
    } catch (error) {
        console.error('Error fetching planet details:', error);
        res.status(500).send('Failed to fetch planet details');
    }
})

export default router;
