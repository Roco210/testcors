import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        default:true
    },category:{
        type:String,
        required:true},
    thumbanil:{
        type:String
        },
    description:{
        type:String,
        required:true
    }})

productschema.plugin(mongoosePaginate)
export const productModel =mongoose.model('product',productschema)