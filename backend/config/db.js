import mongoose from "mongoose";


export const connectDb = async ()=>{
    try {
        const connect = mongoose.connect(process.env.MONGODB_URL)
        if(connect){
              console.log("mongodb connected" )
        }else{
            console.log("mongodb connection failed")
        }
    } catch (error) {
        
    }
}