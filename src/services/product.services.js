
export const allProdsObj = async ()=>{
    const allprod = await fetch('http://localhost:8080/api/products')
    const getProd = await allprod.json()
    const allProds = getProd.payload
    const allProdMap = allProds.map(e => ({
        _id: e._id,
        title: e.title,
        description: e.description,
        code: e.code,
        price: e.price,
        stock: e.stock,
        category: e.category
    }))
    return allProdMap
}
