import express from 'express'
import City from '../models/city';

export class CityController {

    getAllCities = (req: express.Request, res: express.Response) => {
        City.find({}, (err, city) => {
            if (err) console.log(err);
            else res.json(city)
        })
    }

    getCity = (req: express.Request, res: express.Response) => {
        City.find({ "name": req.body.city }, (err, city) => {
            if (err) console.log(err);
            else res.json(city)
        })
    }

}