// create connection to mongodb
import mongoose from 'mongoose';

// schema
let appSchema = mongoose.Schema;


let memberSchema = new appSchema(
    {
        firstname : String,
        lastname : String,
        city : String,
        street : String ,
        housenumber : String,
        phone : Number,
        orders : [  String ]
    }
)

export default mongoose.model('members', memberSchema)