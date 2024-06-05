import mongoose from "mongoose";  

const connectDB = async () => {   

    try {   
    await mongoose.connect("mongodb://localhost:27017/find-lyrics", {    
          //   useNewUrlParser: true,   
          //   useUnifiedTopology: true, 
                });     console.log("Connected to MongoDB");  
    } catch (error) {  
    console.error("Could not connect to MongoDB", error); 
} }; 

export default connectDB;