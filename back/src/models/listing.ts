import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Listing = new Schema({
    naslov: {
        type: String
    },
    grad: {
        type: String
    },
    opstina: {
        type: String
    },
    mikrolokacija: {
        type: String
    },
    ulica: {
        type: String
    },
    tip: {
        type: String
    },
    kvadrata: {
        type: Number
    },
    soba: {
        type: Number
    },
    godina: {
        type: Number
    },
    stanje: {
        type: String
    },
    grejanje: {
        type: String
    },
    sprat: {
        type: Number
    },
    ukupnoSpratova: {
        type: Number
    },
    parking: {
        type: String
    },
    mesecneRezije: {
        type: Number
    },
    cena: {
        type: Number
    },
    opis: {
        type: String
    },
    terasa: {
        type: Boolean
    },
    lodja: {
        type: Boolean
    },
    balkon: {
        type: Boolean
    },
    lift: {
        type: Boolean
    },
    podrum: {
        type: Boolean
    },
    garaza: {
        type: Boolean
    },
    basta: {
        type: Boolean
    },
    klima: {
        type: Boolean
    },
    internet: {
        type: Boolean
    },
    interfon: {
        type: Boolean
    },
    telefon: {
        type: Boolean
    },
    linije: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    username: {
        type: String
    },
    telefonProdavca: {
        type: String
    },
    agencija: {
        type: String
    },
    adresaAgencije: {
        type: String
    },
    gradAgencije: {
        type: String
    },
    telefonAgencije: {
        type: String
    },
    pibAgencije: {
        type: String
    },
    prodato: {
        type: Number
    },
    imagesNames: {
        type: String
    }

})

export default mongoose.model('Listing', Listing, 'listings');