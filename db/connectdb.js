// import mongoose from "mongoose";


// const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/RefugeeConnect';

// const connectDB = async () => {
//     try {
//         await mongoose.connect(dbURI);
//         console.log('MongoDB connected...');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// export default connectDB;


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGO_URI environment variable inside .env.local (or in Vercel settings)."
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
