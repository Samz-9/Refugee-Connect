import mongoose from "mongoose";


const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/RefugeeConnect';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;