import mongoose from 'mongoose'
import config from "../config/config.js"

mongoose.connect(config.mongoUrl)
.then(()=>console.log('conectado a la base de datos'))
.catch((error)=>console.log(error))