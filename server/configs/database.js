import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/deliveryDB', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

});

 