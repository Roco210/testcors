import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:String
    },
    password:{
        type:String,
        required:true},
    isAdmin:{
        type:Boolean,
        requireed:true,
        default:false 
    },
    githubLog:{
        type:Boolean,
        requireed:true,
        default:false 
    }
});

export const userModel = mongoose.model('user',userSchema)