import express from 'express'
import Listing from '../models/listing';


const busboy = require('busboy');
const fs = require('fs');
const path = require('path');

export class ListingController {

    addListing = (req: express.Request, res: express.Response) => {
        let listing = new Listing({
            naslov: req.body.name,
            grad: req.body.grad,
            opstina: req.body.opstina,
            mikrolokacija: req.body.mikrolokacija,
            ulica: req.body.ulica,
            tip: req.body.tip,
            kvadrata: req.body.kvadrata,
            soba: req.body.soba,
            godina: req.body.godina,
            stanje: req.body.stanje,
            grejanje: req.body.grejanje,
            sprat: req.body.sprat,
            ukupnoSpratova: req.body.ukupnoSpratova,
            parking: req.body.parking,
            mesecneRezije: req.body.mesecneRezije,
            cena: req.body.cena,
            opis: req.body.opis,
            terasa: req.body.terasa,
            lodja: req.body.lodja,
            balkon: req.body.balkon,
            lift: req.body.lift,
            podrum: req.body.podrum,
            garaza: req.body.garaza,
            basta: req.body.basta,
            klima: req.body.klima,
            internet: req.body.internet,
            interfon: req.body.interfon,
            telefon: req.body.telefon,
            linije: req.body.linije,
            ime: req.body.ime,
            prezime: req.body.prezime,
            username: req.body.username,
            telefonProdavca: req.body.telefonProdavca,
            agencija: req.body.agencija,
            adresaAgencije: req.body.adresaAgencije,
            gradAgencije: req.body.gradAgencije,
            telefonAgencije: req.body.telefonAgencije,
            pibAgencije: req.body.pibAgencije,
            prodato: 0,
            imagesNames: req.body.imagesNames
        });
        listing.save().then(listing => {
            res.status(200).json({ 'message': 'listing added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'error' })
        })
    }

    uploadListingImage = (req: express.Request, res: express.Response) => {
        let image_name: any = null;
        let image_listing: any = null;
        let image_listing_data: any = null;

        console.log("Ulazak u metodu")

        const bb = busboy({ headers: req.headers });
        bb.on('file', (name: any, file: any, info: any) => {
            image_listing = file;
            file.on('data', (data: any) => {
                image_listing_data = data;
            }).on('close', () => {
                console.log(`File [${name}] done`);
            });
        });
        bb.on('field', (name: any, val: any, info: any) => {
            let image_fields = JSON.parse(val);
            image_name = image_fields.imgName;
        });
        bb.on('close', () => {
            const saveTo = path.resolve(__dirname, `../../../front/app/src/assets/images/${image_name}`);
            this.checkIfDirecotyExist(saveTo);

            fs.writeFile(saveTo, image_listing_data, (err: any) => {
                if (err) console.log("Error while writing image to disk.");
                else console.log("Successfully written image to disk.");
            });

            res.status(200).json({ 'message': 'image added' });
        });
        req.pipe(bb);
    }

    private checkIfDirecotyExist(filePath: string): boolean {
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        this.checkIfDirecotyExist(dirname);
        fs.mkdirSync(dirname);
    }

    getAllListings = (req: express.Request, res: express.Response) => {
        Listing.find({ "prodato": 0 }, (err, listings) => {
            if (err) console.log(err);
            else res.json(listings)
        })
    }

    getListing = (req: express.Request, res: express.Response) => {
        Listing.findOne({ "naslov": req.body.naslov }, (err, listings) => {
            if (err) console.log(err);
            else res.json(listings)
        })
    }

    getAllListingsLimited = (req: express.Request, res: express.Response) => {

        let query = Listing.find({ "prodato": 0 });

        query.skip((req.body.currentPage - 1) * 5);
        query.limit(5);


        query.exec(function (err, listings) {
            if (err) console.log(err);
            else res.json(listings)
        })
    }


    getAllListingsFromMicrolocation = (req: express.Request, res: express.Response) => {
        Listing.find({ 'mikrolokacija': req.body.mikrolokacija }, (err, listings) => {
            if (err) console.log(err);
            else res.json(listings)
        })
    }

    filterListings = (req: express.Request, res: express.Response) => {

        let query = Listing.find({ "prodato": 0 });

        if (req.body.tip) {
            query.find({ "tip": req.body.tip });
        }
        if (req.body.grad) {
            query.find({ "grad": req.body.grad });
        }
        if (req.body.opstina) {
            query.find({ "opstina": req.body.opstina });
        }
        if (req.body.mikrolokacija) {
            query.find({ "mikrolokacija": req.body.mikrolokacija });
        }
        if (req.body.kvadraturaOd) {
            query.find({ "kvadrata": { $gte: req.body.kvadraturaOd } });
        }
        if (req.body.cenaDo) {
            query.find({ "cena": { $lte: req.body.cenaDo } });
        }
        if (req.body.brojSoba) {
            query.find({ "soba": { $gte: req.body.brojSoba } });
        }

        query.skip((req.body.currentPage - 1) * 5);
        query.limit(5);


        query.exec(function (err, listings) {
            if (err) console.log(err);
            else res.json(listings)
        })
    }

    filterListingsAdvanced = (req: express.Request, res: express.Response) => {
        let query = Listing.find({ "prodato": 0 });

        if (req.body.kvadraturaDo) {
            query.find({ "kvadrata": { $lte: req.body.kvadraturaDo } });
        }
        if (req.body.kvadraturaOd) {
            query.find({ "kvadrata": { $gte: req.body.kvadraturaOd } });
        }
        if (req.body.cenaDo) {
            query.find({ "cena": { $lte: req.body.cenaDo } });
        }
        if (req.body.cenaOd) {
            query.find({ "cena": { $gte: req.body.cenaOd } });
        }
        if (req.body.sobaDo) {
            query.find({ "soba": { $lte: req.body.sobaDo } });
        }
        if (req.body.sobaOd) {
            query.find({ "soba": { $gte: req.body.sobaOd } });
        }
        if (req.body.godinaDo) {
            query.find({ "godina": { $lte: req.body.godinaDo } });
        }
        if (req.body.godinaOd) {
            query.find({ "godina": { $gte: req.body.godinaOd } });
        }
        if (req.body.spratDo) {
            query.find({ "sprat": { $lte: req.body.spratDo } });
        }
        if (req.body.spratOd) {
            query.find({ "sprat": { $gte: req.body.spratOd } });
        }
        if (req.body.rezijeDo) {
            query.find({ "mesecneRezije": { $lte: req.body.rezijeDo } });
        }
        if (req.body.rezijeOd) {
            query.find({ "mesecneRezije": { $gte: req.body.rezijeOd } });
        }
        console.log(req.body.stanje)
        if (req.body.stanje) {
            let stanja = req.body.stanje
            query.where("stanje").in(stanja)
        }
        console.log(req.body.grejanje)
        if (req.body.grejanje) {
            let grejanja = req.body.grejanje
            query.where("grejanje").in(grejanja)
        }
        /*query.find({ "terasa": req.body.terasa });
        query.find({ "lodja": req.body.lodja });
        query.find({ "balkon": req.body.balkon });
        query.find({ "lift": req.body.lift });
        query.find({ "podrum": req.body.podrum });
        query.find({ "garaza": req.body.garaza });
        query.find({ "basta": req.body.basta });
        query.find({ "klima": req.body.klima });
        query.find({ "internet": req.body.internet });
        query.find({ "interfon": req.body.interfon });
        query.find({ "telefon": req.body.telefon });*/

        query.skip((req.body.currentPage - 1) * 5);
        query.limit(5);

        query.exec(function (err, listings) {
            if (err) console.log(err);
            else res.json(listings)
        })

    }


    getUserListings = (req: express.Request, res: express.Response) => {
        Listing.find({ 'username': req.body.username }, (err, listings) => {
            if (err) console.log(err);
            else res.json(listings)
        })
    }

    sell = (req: express.Request, res: express.Response) => {
        Listing.findOne({ 'naslov': req.body.naslov }, (err, listing) => {
            if (err) console.log(err);
            else {
                if (listing) {
                    Listing.collection.updateOne({ 'naslov': req.body.naslov }, { $set: { 'prodato': 1 } });
                    res.json({ 'message': 'ok' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }

    updateListing = (req: express.Request, res: express.Response) => {
        Listing.findOne({ 'naslov': req.body.name }, (err, listing) => {
            if (err) console.log(err);
            else {
                if (listing) {
                    Listing.collection.updateOne({ 'naslov': req.body.name }, {
                        $set:
                        {
                            "naslov": req.body.name,
                            "grad": req.body.grad,
                            "opstina": req.body.opstina,
                            'mikrolokacija': req.body.mikrolokacija,
                            'ulica': req.body.ulica,
                            'tip': req.body.tip,
                            'kvadrata': req.body.kvadrata,
                            'soba': req.body.soba,
                            'godina': req.body.godina,
                            'stanje': req.body.stanje,
                            'grejanje': req.body.grejanje,
                            'sprat': req.body.sprat,
                            'ukupnoSpratova': req.body.ukupnoSpratova,
                            'parking': req.body.parking,
                            'mesecneRezije': req.body.mesecneRezije,
                            'cena': req.body.cena,
                            'opis': req.body.opis,
                            'terasa': req.body.terasa,
                            'lodja': req.body.lodja,
                            'balkon': req.body.balkon,
                            'lift': req.body.lift,
                            'podrum': req.body.podrum,
                            'garaza': req.body.garaza,
                            'basta': req.body.basta,
                            'klima': req.body.klima,
                            'internet': req.body.internet,
                            'interfon': req.body.interfon,
                            'telefon': req.body.telefon,
                            'linije': req.body.linije
                        }
                    });
                    res.json({ 'message': 'ok' })
                }
                else {
                    res.json({ 'message': 'error' })
                }
            }
        })
    }


}