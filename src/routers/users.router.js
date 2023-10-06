import Router from "express";
import passport from "passport";
import { Singup, userLogIn, userLogOut} from "../controllers/users.controler.js";
import { checkData } from "../services/user.services.js";
const router = Router();


router.post('/',checkData, Singup)

router.post("/login",passport.authenticate('local',{failureRedirect: '/singup'}), userLogIn)

router.get("/logout", userLogOut)

router.get("/githubSingUp",passport.authenticate('github', { scope: [ 'user:email' ] }))

router.get("/github", passport.authenticate('github', { failureRedirect: '/singup' }),userLogIn)

export default router;

