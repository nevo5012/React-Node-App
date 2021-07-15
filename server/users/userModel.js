// create connection to mongodb
import mongoose from 'mongoose';

// schema
let appSchema = mongoose.Schema;


let userSchema = new appSchema(
    {
        email : String,
        password : String,
        roles : [String]
    }
)

export default mongoose.model('users', userSchema)