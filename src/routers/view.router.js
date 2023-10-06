import { Router } from "express";
import passport from "passport";
import { userInfo } from "../services/user.services.js";
import {allProdsObj} from "../services/product.services.js";
import {cartdata} from "../services/cart.services.js";

const router=Router();
const style="style1.css"

router.get('/',passport.authenticate('jwt',{session:false, failureRedirect:"/log"}), async (req, res) => {
    const userLog=userInfo(req.user.user)
    res.render('index',{style,userLog})
    
});

router.get('/log', async (req, res) => {

    res.render('login',{style});
});


router.get('/singup', async (req, res) => {

    res.render('singup',{style});
});

router.get('/allproducts',passport.authenticate('jwt',{session:false, failureRedirect:"/log"}), async (req, res) => {
    const allProdMap = await allProdsObj()
    
    res.render('allprod',{style,allProdMap})
    })

export default router;

router.get('/realTimeProducts',passport.authenticate('jwt',{session:false, failureRedirect:"/"}), (req, res) => {

    res.render('realTimeProducts',{style})
})

router.get('/message', (req, res) => {

    res.render('message',{style})
})

router.get('/cart',passport.authenticate('jwt',{session:false, failureRedirect:"/"}),async(req, res) => {
    const cart =await cartdata()
    res.render('cartId',{style,cart})
    })