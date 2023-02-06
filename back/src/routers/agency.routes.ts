import express from 'express';
import { AgencyController } from '../controllers/agency.controller';
const agencyRoutes = express.Router();

agencyRoutes.route('/register').post(
    (req, res) => new AgencyController().register(req, res)
)

agencyRoutes.route('/getAllAgencies').get(
    (req, res) => new AgencyController().getAllAgencies(req, res)
)

agencyRoutes.route('/getAgency').post(
    (req, res) => new AgencyController().getAgency(req, res)
)

agencyRoutes.route('/checkAgency').post(
    (req, res) => new AgencyController().checkAgency(req, res)
)

export default agencyRoutes;