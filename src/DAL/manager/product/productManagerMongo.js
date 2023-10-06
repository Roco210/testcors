import { productModel } from "../../../DAL/models/product.model.js";

class ProductMongo {
    /* async getproducts(){
        try{
            const products =await  productModel.find({})
            return products
        }
        catch(error){return error}
    } */
    async getproducts(limitQ,pageQ,qP,sortO){
        try{
            
            const products= await productModel.paginate(qP,{limit:limitQ,page:pageQ,sort:{price:sortO}})
            const info ={
                
                status:products ? "succes":"error",
                payload:products.docs,
                docs:products.totalDocs,
                totalPages:products.totalPages,
                prevPages: products.prevPage,
                nextPage:products.nextPage,
                page:limitQ,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                nextLink: products.hasNextPage ? `http:localhost:8080/api/products?page=${products.nextPage}&limit=${limitQ}`:null,
                prevLink: products.hasPrevPage ? `http:localhost:8080/api/products?page=${products.prevPage}limit=${limitQ}`:null
            }
            return info
        }
        catch(error){return error}
    } 

    async getproductById(id){
        try{
            const prod =await productModel.findById(id)
            return prod
        }
        catch(error){return error}
    }
    async createProduct(obj){
        try{
            const newProd =await productModel.create(obj)
            return newProd
        }
        catch(error){return error}
    }
    async deleteProduct(id){
        try{
            const prod =productModel.findByIdAndDelete(id)
            return prod
        }
        catch(error){return error}
    }
    async updateProduct(id,obj){
        try{
            const prod =productModel.updateOne({_id:id},{...obj})
            return prod
        }
        catch(error){return error}
    }
}

export const productMongo = new ProductMongo()