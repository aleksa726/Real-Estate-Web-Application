import express from 'express';
import { StateController } from '../controllers/state.controller';
const stateRoutes = express.Router();

stateRoutes.route('/getAllStates').get(
    (req, res) => new StateController().getAllStates(req, res)
)

stateRoutes.route('/getAllStatesForCity').post(
    (req, res) => new StateController().getAllStatesForCity(req, res)
)

stateRoutes.route('/getStateName').post(
    (req, res) => new StateController().getStateName(req, res)
)

export default stateRoutes;