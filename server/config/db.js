//Database Connection 
const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully'); // Log success message if connected
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;