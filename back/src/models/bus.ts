import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Bus = new Schema({
    line: {
        type: String
    }
})

export default mongoose.model('Bus', Bus, 'lines');