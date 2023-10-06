import fs from 'fs';
import { __dirname } from '../../utils.js';

const path = __dirname+'/Product.json'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    async product() {
        try {
            if (fs.existsSync(this.path)) {// busca si hay o no archivo
                const data = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(data) // consultar porque si pongo data =JSON.parse(data) da error pero usandolo en otra variable da correcto
            } else {
                return [] // retorna arreglo vacio para que el addproduct trabaje
            }
        } catch { (error) => { return error } }
    };

    async getProducts() {
        try {
            let variablew = await this.product()
            return await variablew
        } catch { (error) => { return error } }
    }

    async addProduct({ title, description, price, thumbnail, code, stock, category, status = true }) {
        try {
            if (!title || !description || !price || !thumbnail || !stock || !code || !category) {//analiza si todos los campos estan llenos
                return 'ERROR: Not all data is complete'
            }
            let list = await this.product()
            const listCode = list.find(e => e.code == code)// busca si el code esta repetido
            if (listCode) {
                return "The entered code exists, please enter a new one"
            };
            let obj = {
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnail: thumbnail
            }
            let id = list.length == 0 ? 1 : list[list.length - 1].id + 1

            list.push({ ...obj, id })
            await fs.promises.writeFile(this.path, JSON.stringify(list))
            return `The product with the ID ${id} was generated successfully`

        }
        catch { (error) => { console.log("error") } }
    };

    async getProductsById(id) {
        try {
            let list = await this.product()
            const itemId = list.find(e => e.id == id)
            if (itemId) {
                return itemId
            }
            else { return `There is no product with the id ${id}` }

        } catch { (error) => { return (error) } }
    }
    async deleteProduct(id) {
        try {
            
            let list = await this.product()
            if (list.findIndex(e => e.id == id) !== -1) {
                const newList = list.filter(e => e.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(newList))
                return (`The product whit ID ${id} was removed`)
            }
            else { return ("The product you try delete, no exist") }
        }
        catch { (error) => { return error } }
    }

    async updateProduct(pid, obj) {
        try {
            let list = await this.product()
            let objKey = Object.keys(obj)
            let noId = objKey.find(e => e == "id")
            if (noId) {
                return ("Cannot modify id, please enter valid values")
            };
            const ub = list.findIndex(e => e.id == pid)
            if (ub !== -1) {
                const objRaw = list[ub]
                const objMod = { ...objRaw, ...obj }
                list[ub] = objMod
                fs.promises.writeFile(this.path, JSON.stringify(list))
                return "Change done"
            }
            else {
                return `There is no product with the id ${pid}`
            }
        }
        catch { (error) => { return error } }
    }
}

export const manager = new ProductManager(path)