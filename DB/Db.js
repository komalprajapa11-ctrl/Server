import mongoose from "mongoose";


const MonoURL = "mongodb+srv://komalprajapattechnotoil_db_user:hB9V1sm2xKE1O5LC@cluster0.6htjgim.mongodb.net/test?retryWrites=true&w=majority"


export const DbConnect = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const con = await mongoose.connect(MonoURL)
        console.log(`✅ MongoDB Connected: ${con.connection.host}`);
    }
    catch (e) {
        console.log("❌ Database Connection Error:", e.name);
        console.log("Message:", e.message);
        process.exit(1); // Exit if DB connection fails
    }
}