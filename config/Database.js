import mongoose from "mongoose";

export const connectionDb = async (req, res, next) => {

    const db = process.env.MONGO_URI;

    const {connection} = await mongoose.connect(db, { useNewUrlParser: true });

    console.log(`MongoDB connection: ${connection.host}`);

}