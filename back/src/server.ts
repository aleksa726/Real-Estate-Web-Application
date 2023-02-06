import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRoutes from './routers/user.routes';
import agencyRoutes from './routers/agency.routes';
import listingRoutes from './routers/listing.routes';
import busRoutes from './routers/bus.routes';
import cityRoutes from './routers/city.routes';
import stateRoutes from './routers/state.routes';
import microlocationRoutes from './routers/microlocation';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/piamean');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok')
})


const router = express.Router();
router.use('/users', userRoutes)
router.use('/agency', agencyRoutes)
router.use('/listing', listingRoutes)
router.use('/bus', busRoutes)
router.use('/city', cityRoutes)
router.use('/state', stateRoutes)
router.use('/microlocation', microlocationRoutes)

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));