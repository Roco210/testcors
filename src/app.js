// server innit

import express from 'express';
import { __dirname } from "./utils.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';



// DAL
import "./DAL/dbConfig.js"
import MongoStore from "connect-mongo"

//handlebars
import { engine } from "express-handlebars";



// server
import { Server } from "socket.io";
import { msjModel } from "./DAL/manager/messages/messagesManager.js";
//endpoints
import viewrouter from "./routers/view.router.js"
import userRouter from "./routers/users.router.js"
import productsRouter from "./routers/products.router.js"
import cartsRouter from './routers/carts.router.js';
// passport
import passport from "passport"
import "./services/passport.js"
//env
import config from "./config/config.js"

//server setings

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

//handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//session

app.use(session({
    store: MongoStore.create({
        mongoUrl:config.mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret:config.sessionSecret,
}))

//passport
app.use(passport.initialize());
app.use(passport.session());


//endpoints
app.use("/",viewrouter)
app.use("/api/users", userRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

//conect

const httpServer = app.listen(config.port, () => {
    console.log(`Escuchando puerto ${config.port}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    console.log(`Se conecto ${socket.id}`)
    socket.on('disconnect', () => {
        console.log(`Se desconecto ${socket.id}`)
    })

    const allprod = await fetch('http://localhost:8080/api/products')
    const getProd = await allprod.json()
    const allProds = getProd.payload
    socketServer.emit('allProds', allProds)

    socket.on("msj", async (e) => {
        console.log(e)
        await msjModel.createMsj(e)
        const listmsjs = await msjModel.findMsj()
        socketServer.emit("msjs", listmsjs)
    })
})