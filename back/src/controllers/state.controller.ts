import express from 'express'
import State from '../models/state';

export class StateController {

    getAllStates = (req: express.Request, res: express.Response) => {
        State.find({}, (err, states) => {
            if (err) console.log(err);
            else res.json(states)
        })
    }

    getAllStatesForCity = (req: express.Request, res: express.Response) => {
        State.find({ "city": req.body.city }, (err, states) => {
            if (err) console.log(err);
            else res.json(states)
        })
    }

    getStateName = (req: express.Request, res: express.Response) => {
        State.find({ "name": req.body.state }, (err, states) => {
            if (err) console.log(err);
            else res.json(states)
        })
    }
}