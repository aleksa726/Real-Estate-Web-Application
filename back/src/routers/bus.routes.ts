import express from 'express';
import { BusController } from '../controllers/bus.controller';
const busRoutes = express.Router();

busRoutes.route('/getAllLines').get(
    (req, res) => new BusController().getAllLines(req, res)
)

export default busRoutes;