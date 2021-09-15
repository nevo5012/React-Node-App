import mongoose from 'mongoose'

const DB_CONNECTION = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/deliveryDB';
mongoose.connect(DB_CONNECTION, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

 