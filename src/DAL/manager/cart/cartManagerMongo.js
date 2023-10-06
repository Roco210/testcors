import { cartModel } from "../../models/cart.model.js";
import { productMongo } from "../product/productManagerMongo.js";
class CartMongo {
    async getCarts(obj){
        try{
            const carts =await cartModel.create(obj)
            return carts
        }
        catch(error){return error}
    }
    
    async getCartById(id){
        try{
            const cart = await cartModel.findById(id)
            return cart
        }
        catch(error){return error}}




    /* async deleteCart(id){
        try{
            const cart =cartModel.findByIdAndDelete(id)
            return cart
        }
        catch(error){return error}
    } */
    async updatecart(cid,pid){

        try{
            const fCart = await cartModel.findById(cid) //busco el carrito
            if(!fCart || fCart.name =="CastError" ){
            return "no existe carrito con el Id"}
            const fProd =await productMongo.getproductById(pid)//busco el prod
            if(!fProd || fProd.name =="CastError" ){
            return "no existe producto con el Id"}
            const prod =fCart.products
            if(!prod.length){
                console.log("if")
                const obj = {prodId:pid,quantity:1}
                prod.push(obj)
                await cartModel.updateOne({_id:cid},fCart)
                return "cart update"
            }else{
                const findP= prod.find(e=>e.prodId==pid)
                if(findP){
                    findP.quantity =findP.quantity+1
                    await cartModel.updateOne({_id:cid},fCart)
                    return "cart update"
                }else{
                    const obj = {prodId:pid,quantity:1}
                prod.push(obj)
                await cartModel.updateOne({_id:cid},fCart)
                return "cart update"
                }
            }
    
        }
        catch(error){return error}
    }

    async delProdCart (cid,pid){
        const cartF =await cartModel.findById(cid)
        const prodInCart = cartF.products
        const newcart= prodInCart.filter(e=> e.prodId !=pid)
        cartF.products=newcart
        await cartModel.findByIdAndUpdate(cid,cartF)
        return cartF
    }
    async delAllprods(cid){
        const cartF =await cartModel.findById(cid)
        if(cartF.products.length){
            cartF.products=[]
            await cartModel.findByIdAndUpdate(cid,cartF)
            return "exito"
        }
        else{return "no existe carrito"}
        

    }
    async putquantity(cid,pid,cant){
        const {quantity} =cant
        const cartF =await cartModel.findById(cid)
        const prodInCart = cartF.products
        const newQuantity= prodInCart.find(e=>e.prodId== pid)
        newQuantity.quantity = quantity
        await cartModel.findByIdAndUpdate(cid,cartF)

    }
    async putProd(cid,prod){
        const cartF =await cartModel.findById(cid)
        const prodInCart = cartF.products
        cartF.products=prod
        
        await cartModel.findByIdAndUpdate(cid,cartF)

    }
}

export const cartMongo =new CartMongo()