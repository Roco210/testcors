import passport from "passport";
import {Strategy as localStrategy} from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt} from "passport-jwt";
import githubStrategy from "passport-github2";
import {compareHash} from "../utils.js";
import config  from "../config/config.js";
import {userMongo} from "../DAL/manager/users/usersManagerMongo.js";
import {userModel} from "../DAL/models/user.model.js";
//local Strategy

passport.use("local", new localStrategy(
    {usernameField: "email"},
    async (email, password, done) => {
        try {
            const userDb = await userMongo.findUser(email)
            if (!userDb) {
                return done(null, false)
            } 
            const passwordCheck = await compareHash(password, userDb.password)
            if (!passwordCheck) {
                return done(null, false)
            }
            return done(null, userDb)
        }
        catch (error) { done(error) }
    }))


// github Strategy

passport.use(new githubStrategy(
    {clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL:'http://localhost:8080/api/users/github'},
    async function (accessToken, refreshToken, profile, done) {
            try {
                const userbd = await userMongo.findUser(profile._json.email)
                if(userbd){
                    return done(null, userbd)
                } 
                const newUser={
                    first_name:profile.displayName? profile.displayName.split(" ")[0]:profile.username,
                    last_name: profile.displayName? profile.displayName.split(" ")[1]: " no lastname",  
                    username: profile.username ? profile.username : "no user name",
                    email: profile._json.email? profile._json.email: "no mail",
                    password: " ", 
                    githubLog:"true"}
                await userMongo.createUser(newUser)
                return  done(null, newUser)}
            catch(error){
                done(error)}}
))


// JWT strategy


const cookieExtractor =  (req) => {
    const jwtCookie=req.cookies["token"]
    return jwtCookie

}

passport.use("jwt",new JWTstrategy({
    secretOrKey:config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
},
    async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        }
        catch (error) { done(null, false) }
    })) 


//serial and deserial User
passport.serializeUser((user, done) => {
    done(null, user);
        });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user= await userModel.findOne(id)
            done(null, user);
        }
        catch (error) { done(error)}
        });
    