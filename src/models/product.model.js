import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, min: 0, required: true}
})


const ProductModel = mongoose.model(productCollection, productSchema);


export default ProductModel;