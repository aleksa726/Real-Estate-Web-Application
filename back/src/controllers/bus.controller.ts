import express from 'express'
import Bus from '../models/bus';

export class BusController {

    getAllLines = (req: express.Request, res: express.Response) => {
        Bus.find({}, (err, bus) => {
            if (err) console.log(err);
            else res.json(bus)
        })
    }

}