import express from 'express'
import Microlocation from '../models/microlocation';

export class MicrolocationController {

    getAllMicrolocations = (req: express.Request, res: express.Response) => {
        Microlocation.find({}, (err, microlocation) => {
            if (err) console.log(err);
            else res.json(microlocation)
        })
    }

    getAllMicrolocationsForState = (req: express.Request, res: express.Response) => {
        Microlocation.find({ "city": req.body.city, "state": req.body.state }, (err, microlocation) => {
            if (err) console.log(err);
            else res.json(microlocation)
        })
    }

    getAllMicrolocationsForState2 = (req: express.Request, res: express.Response) => {
        Microlocation.find({ "state": req.body.state }, (err, microlocation) => {
            if (err) console.log(err);
            else res.json(microlocation)
        })
    }

    getMicrolocationName = (req: express.Request, res: express.Response) => {
        Microlocation.find({ "name": req.body.name }, (err, microlocation) => {
            if (err) console.log(err);
            else res.json(microlocation)
        })
    }

    getAllMicrolocationsForCity = (req: express.Request, res: express.Response) => {
        Microlocation.find({ "city": req.body.city }, (err, microlocation) => {
            if (err) console.log(err);
            else res.json(microlocation)
        })
    }

    addMicrolocation = (req: express.Request, res: express.Response) => {
        let microlocation = new Microlocation({ name: req.body.microlocation, state: req.body.state, city: req.body.city });
        microlocation.save().then(microlocation => {
            res.status(200).json({ 'message': 'microlocation added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'error' })
        })
    }

    checkMicrolocation = (req: express.Request, res: express.Response) => {
        Microlocation.findOne({ 'name': req.body.microlocation, 'state': req.body.state, 'city': req.body.city }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    addStreet = (req: express.Request, res: express.Response) => {
        Microlocation.findOne({ 'name': req.body.microlocation }, (err, microlocation) => {
            if (err) console.log(err);
            else {
                if (microlocation) {
                    Microlocation.collection.updateOne({ 'name': req.body.microlocation }, {
                        $push:
                        {
                            'streets': req.body.street
                        }
                    });
                    res.json({ 'message': 'Ulica je uspesno dodata' })
                }
                else {
                    res.json({ 'message': 'Nije pronadjena' })
                }
            }
        })
    }


    deleteMicrolocation = (req: express.Request, res: express.Response) => {
        Microlocation.findOne({ 'name': req.body.microlocation }, (err, microlocation) => {
            if (err) console.log(err);
            else {
                if (microlocation) {
                    Microlocation.collection.deleteOne({ 'name': req.body.microlocation });
                    res.json({ 'message': 'Mikrolokacija je obrisana' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }
}