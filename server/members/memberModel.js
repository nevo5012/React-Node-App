// create connection to mongodb
import mongoose from 'mongoose';

// schema
let appSchema = mongoose.Schema;


let memberSchema = new appSchema(
    {
        first_name : String,
        last_name : String,
        city : String,
        street : String ,
        house_number : String,
        phone : String,
        email : String,
        orders : [  String ]
    }
)

export default mongoose.model('members', memberSchema)