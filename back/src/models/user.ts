import mongoose from 'mongoose'
import Listing from '../models/listing';
const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    passwordConfirm: {
        type: String
    },
    city: {
        type: String
    },
    birthday: {
        type: Date
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    agency: {
        type: String
    },
    licence: {
        type: Number
    },
    type: {
        type: String
    },
    pending: {
        type: Number
    },
    filename: {
        type: String
    },
    favouriteListings: {
        type: Array
    }
})

export default mongoose.model('User', User, 'users');