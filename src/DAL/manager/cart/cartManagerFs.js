import fs from 'fs'
import { ProductManager } from '../product/productManagerFs.js'


const prod = ProductManager()
export class CartManager {
    constructor(path) {
        this.path = path
    }
    async getCart() {
        try {
            if (fs.existsSync(this.path)) {
                const cart = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(cart)
            } else return []
        }
        catch { (error) => { return error } }

    }

    async crateCart() {
        try {
            const cart = await this.getCart()
            const id = cart.length == 0 ? 1 : cart[cart.length - 1].id + 1
            cart.push({ id: id, products: [] })
            await fs.promises.writeFile(this.path, JSON.stringify(cart), 'utf-8')
            return `The cart was created with ID: ${id}`
        }
        catch { (error) => { return error } }


    }

    async findCart(cid) {
        try {
            const cart = await this.getCart()
            const list = cart.find(e => e.id == cid)
            if (list) {
                return list.products
            }
            else { return `There is no cart with ID: ${cid}` }
        }
        catch { (error) => { return error } }
    }

    async addProduct(cid, pid) {
        const cart = await this.getCart()
        const cartWanted = await cart.find(e => e.id == cid)
        if (!cartWanted) { return `There is no cart with the id ${cid}` } //paro la ejecucion si el producto no exite
        const product = await prod.getProductsById(pid)
        if (typeof(product)=="string") { return product} //paro la ejecucion si el producto no exite
        try {
            const findCartProd = await cartWanted.products
            const findProd = await findCartProd.find(e => e.id == pid)
            if (findProd) {
                findProd.quantity = findProd.quantity + 1
                await fs.promises.writeFile(this.path, JSON.stringify(cart), 'utf-8')
                return `Added to cart ID: ${cid}. Product ${product.title.toUpperCase()}. Cart total: ${findProd.quantity}`
            } else {
                let newProd = { id: +pid, quantity: 1 }
                findCartProd.push(newProd)
                await fs.promises.writeFile(this.path, JSON.stringify(cart), 'utf-8')
                return `Added to cart ID: ${cid} Product ${product.title.toUpperCase()}. Cart total: 1`
            }
        }
        catch { (error) => { return error } }
    }
}