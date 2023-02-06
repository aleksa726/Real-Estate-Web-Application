import * as express from 'express';
import User from '../models/user';

const busboy = require('busboy');
const fs = require('fs');
const path = require('path');

export class UserController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'username': username, 'password': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    checkUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    checkEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let userExist = null;
        userExist = User.findOne({ 'email': email }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response) => {
        if (req.body.password === req.body.passwordConfirm) {

            let user = new User();
            let image: any = null;
            let image_data: any = null;

            const bb = busboy({ headers: req.headers });
            bb.on('file', (name: any, file: any, info: any) => {

                image = file;
                file.on('data', (data: any) => {
                    image_data = data;
                }).on('close', () => {
                    console.log(`File [${name}] done`);
                });
            });
            bb.on('field', (name: any, val: any, info: any) => {

                let favouriteListings = new Array();
                let user_fields = JSON.parse(val);
                user = new User({
                    firstname: user_fields.firstname, lastname: user_fields.lastname,
                    username: user_fields.username, password: user_fields.password,
                    city: user_fields.city, birthday: user_fields.birthday,
                    phone: user_fields.phone, email: user_fields.email,
                    agency: user_fields.agency, licence: user_fields.licence, type: user_fields.type, pending: user_fields.pending,
                    filename: user_fields.filename
                });

            });
            bb.on('close', () => {

                const saveTo = path.resolve(__dirname, `../../../front/app/src/assets/images/${user.get('filename')}`);
                this.checkIfDirectiryExist(saveTo);

                user.save();

                fs.writeFile(saveTo, image_data, (err: any) => {
                    if (err) console.log("Error while writing image to disk.");
                    else console.log("Successfully written image to disk.");
                });


                res.status(200).json({ 'message': 'Korisnik je uspesno dodat' });
            });
            req.pipe(bb);

        } else {
            res.status(200).json({ 'message': 'Lozinke se ne poklapaju' })
        }
    }

    private checkIfDirectiryExist(filePath: string): boolean {
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        this.checkIfDirectiryExist(dirname);
        fs.mkdirSync(dirname);
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        User.findOne({ 'username': username, 'password': oldPassword }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    User.collection.updateOne({ 'username': username }, { $set: { 'password': newPassword } });
                    res.json({ 'message': 'Lozinka je uspesno promenjena' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }

    getAllPendingUsers = (req: express.Request, res: express.Response) => {
        User.find({ 'pending': 1 }, (err, users) => {
            if (err) console.log(err);
            else res.json(users)
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find({}, (err, users) => {
            if (err) console.log(err);
            else res.json(users)
        })
    }


    acceptUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    User.collection.updateOne({ 'username': username }, { $set: { 'pending': 0 } });
                    res.json({ 'message': 'Korisnik je odobren' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }

    declineUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    User.collection.deleteOne({ 'username': username });
                    res.json({ 'message': 'Korisnik je obrisan' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        User.findOne({ 'username': req.body.username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    updateUser = (req: express.Request, res: express.Response) => {
        User.findOne({ 'username': req.body.username }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    User.collection.updateOne({ 'username': req.body.username }, {
                        $set:
                        {
                            'firstname': req.body.firstname, 'lastname': req.body.lastname,
                            'username': req.body.username, 'password': req.body.password,
                            'city': req.body.city, 'birthday': req.body.birthday,
                            'phone': req.body.phone, 'email': req.body.email,
                            'agency': req.body.agency, 'licence': req.body.licence, 'type': req.body.type
                        }
                    });
                    res.json({ 'message': 'Korisnik je uspesno azuriran' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }

    updateSeller = (req: express.Request, res: express.Response) => {
        User.findOne({ 'username': req.body.username }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    User.collection.updateOne({ 'username': req.body.username }, {
                        $set:
                        {
                            'phone': req.body.phone, 'email': req.body.email,
                            'agency': req.body.agency, 'type': req.body.type
                        }
                    });
                    res.json({ 'message': 'Podaci su uspesno azurirani' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }

    addFavourite = (req: express.Request, res: express.Response) => {
        User.findOne({ 'username': req.body.username }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    User.collection.updateOne({ 'username': req.body.username }, {
                        $push:
                        {
                            'favouriteListings': req.body.favouriteListings
                        }
                    });
                    res.json({ 'message': 'Podaci su uspesno azurirani' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }

    removeFavourite = (req: express.Request, res: express.Response) => {
        User.findOne({ 'username': req.body.username }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    User.collection.updateOne({ 'username': req.body.username }, {
                        $pull:
                        {
                            'favouriteListings': req.body.favouriteListings
                        }
                    });
                    res.json({ 'message': 'Podaci su uspesno azurirani' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }
}