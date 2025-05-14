const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("MongoDb connection error: " + error);
        process.exit(1); // exits the app.
    }
}

module.exports = connectDb;