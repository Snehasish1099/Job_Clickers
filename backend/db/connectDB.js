import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log(`MongoDB connected to DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export default connectDB;
