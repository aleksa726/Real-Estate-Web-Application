import express from 'express';
import { MicrolocationController } from '../controllers/microlocation.controller';
const microlocationRoutes = express.Router();

microlocationRoutes.route('/getAllMicrolocations').get(
    (req, res) => new MicrolocationController().getAllMicrolocations(req, res)
)

microlocationRoutes.route('/getAllMicrolocationsForState').post(
    (req, res) => new MicrolocationController().getAllMicrolocationsForState(req, res)
)

microlocationRoutes.route('/getAllMicrolocationsForState2').post(
    (req, res) => new MicrolocationController().getAllMicrolocationsForState2(req, res)
)

microlocationRoutes.route('/getMicrolocationName').post(
    (req, res) => new MicrolocationController().getMicrolocationName(req, res)
)

microlocationRoutes.route('/getAllMicrolocationsForCity').post(
    (req, res) => new MicrolocationController().getAllMicrolocationsForCity(req, res)
)

microlocationRoutes.route('/addMicrolocation').post(
    (req, res) => new MicrolocationController().addMicrolocation(req, res)
)

microlocationRoutes.route('/checkMicrolocation').post(
    (req, res) => new MicrolocationController().checkMicrolocation(req, res)
)

microlocationRoutes.route('/addStreet').post(
    (req, res) => new MicrolocationController().addStreet(req, res)
)

microlocationRoutes.route('/deleteMicrolocation').post(
    (req, res) => new MicrolocationController().deleteMicrolocation(req, res)
)


export default microlocationRoutes;