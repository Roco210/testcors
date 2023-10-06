

export const cartdata =async ()=>{
    const cart = await fetch('http://localhost:8080/api/carts/64f0084c102e954bf361aae0')
    const getCart = await cart.json()
    const allprod = getCart.products
    const allProdMap = allprod.map(e => ({
        prodId: e.prodId,
        quantity: e.quantity
    }))
    return allProdMap
}