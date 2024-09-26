import Product from "../models/productModel";

export async function generateProductId() {
    const id = Math.floor(Math.random() * 100000)

    const matchingProduct = await Product.findOne({ id });
    console.log(matchingProduct)
    if(matchingProduct) {
        return generateProductId()
    }

    return id;
}