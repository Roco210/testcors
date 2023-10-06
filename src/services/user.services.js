import {userMongo} from "../DAL/manager/users/usersManagerMongo.js"

export const checkData =(req, res,next) => {
    const { first_name,last_name, email, age, password } = req.body
    if (!first_name|| !last_name || !email || !age || !password ) {
        res.status(400).json({ messge: "faltan datos" })
        return
    }
    const user = req.body
    req.user = user
    next()
}



export const userInfo= (user)=>{

    const objUser=[{
        first_name:user.first_name?user.first_name:"null",
        rol:user.isAdmin ? "ADMIN":"USER"
    }]
    return objUser
}