import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let State = new Schema({
    name: {
        type: String
    },
    city: {
        type: String
    }
})

export default mongoose.model('State', State, 'states');