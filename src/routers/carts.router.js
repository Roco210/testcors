import { Router } from "express";
import { createCart,serchCart,updateCart,updateProdInCart,addProdInCart, deleteCart,deleteProdCart} from "../controllers/carts.controler.js";
const router=Router()

router.post("/",createCart)

router.get("/:cid", serchCart)

router.post("/:cid/product/:pid",updateCart)

router.delete('/:cid/product/:pid',deleteProdCart)

router.delete('/:cid',deleteCart)

router.put('/:cid/product/:pid',updateProdInCart)

router.put('/:cid',addProdInCart)


export default router;