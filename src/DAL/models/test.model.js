import mongoose from "mongoose";

const testSchema = new mongoose.Schema({

    dato:{
        type:String
    }
})

export const testModell = mongoose.model("test",testSchema)