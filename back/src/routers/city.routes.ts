import express from 'express';
import { CityController } from '../controllers/city.controller';
const cityRoutes = express.Router();

cityRoutes.route('/getAllCities').get(
    (req, res) => new CityController().getAllCities(req, res)
)

cityRoutes.route('/getCity').post(
    (req, res) => new CityController().getCity(req, res)
)

export default cityRoutes;