
import {userMongo} from "../DAL/manager/users/usersManagerMongo.js"
import { hashdata, generateToken  } from "../utils.js";


export const Singup = async (req, res) => {
    const data = req.user
    const userExist = await userMongo.findUser(data.email)
    if (userExist) {
        res.status(400).json({ messge: "plase use other mail" })
        return
    }
    const hashPassword = await hashdata(data.password)
    const user = await userMongo.createUser({ ...req.body, password: hashPassword })
    res.status(200).json({ message: `user created: ${user}` })
}

export const userLogIn = async (req, res) => {
    const token =  generateToken(req.user)
    res.cookie("token", token, {httpOnly:true,maxAge:60*60*1000}).status(200).redirect("/")
}

export const userLogOut = async (req, res) => {
    req.session.destroy()
    res.clearCookie("token").redirect("/log")
}