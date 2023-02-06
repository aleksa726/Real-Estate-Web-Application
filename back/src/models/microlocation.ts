import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Microlocation = new Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    streets: {
        type: Array
    }
})

export default mongoose.model('Microlocation', Microlocation, 'microlocations');