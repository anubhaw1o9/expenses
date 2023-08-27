const mongoose = require ('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        //useUnifiedTopolgy: true,
        //useFindAndModify: true
    });

    console.log("MongoDB connected")
}

module.exports = connectDB;

//mongoose.connect('mongodb://127.0.0.1:27017/expenses')
//.then(()=>console.log('connected to DB'))
//.catch(()=>console.error('ERROR occured'));
