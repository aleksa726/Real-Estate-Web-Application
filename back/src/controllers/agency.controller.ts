import express from 'express'
import Agency from '../models/agency';

export class AgencyController {

    register = (req: express.Request, res: express.Response) => {
        let agency = new Agency({
            name: req.body.name, adress: req.body.adress, city: req.body.city,
            phone: req.body.phone, pib: req.body.pib
        });

        agency.save().then(agency => {
            res.status(200).json({ 'message': 'agency added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'error' })
        })
    }

    getAllAgencies = (req: express.Request, res: express.Response) => {
        Agency.find({}, (err, agencies) => {
            if (err) console.log(err);
            else res.json(agencies)
        })
    }

    getAgency = (req: express.Request, res: express.Response) => {
        Agency.findOne({ 'name': req.body.name }, (err, agency) => {
            if (err) console.log(err);
            else res.json(agency)
        })
    }

    checkAgency = (req: express.Request, res: express.Response) => {
        Agency.findOne({ 'name': req.body.name }, (err, agency) => {
            if (err) console.log(err);
            else res.json(agency)
        })
    }

}