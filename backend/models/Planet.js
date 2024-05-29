import mongoose from 'mongoose';

const PlanetSchema = new mongoose.Schema({
    name: String,
    climate: String,
    population: String,
    diameter: String
});

const Planet = mongoose.model('Planet', PlanetSchema);
export default Planet;
