import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({

user:{type:String},
message:{type:String}  

})

export const messagesModel = mongoose.model('messages', messagesSchema);
