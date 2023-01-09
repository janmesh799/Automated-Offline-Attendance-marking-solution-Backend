require('dotenv').config()
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(URI)
            .catch(err => console.error(err.message));
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectToMongo;