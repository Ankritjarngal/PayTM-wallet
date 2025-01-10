import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const MongoDB=process.env.MONGO_DB


mongoose.connect(MongoDB
    
).then(()=>{
    console.log("Connected to MongoDB")
})
const userPaytm=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstname:{
        type:String,
        required:true,
        trim: true,
        maxLength: 50
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password:{
        type:String,
        required:true,
        minLength:6

    }
    
    
})
const accountPaytm=mongoose.Schema({
    userId:{
        type:String,
        required:true,

    },
    balance:{
        type:Number,

    }
})
export const accounts=mongoose.model("accounts",accountPaytm)
 export const  user=mongoose.model("userPaytm",userPaytm);
 