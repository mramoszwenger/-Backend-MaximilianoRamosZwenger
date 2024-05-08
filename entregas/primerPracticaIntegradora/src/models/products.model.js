import { Schema, model }  from "mongoose";

const productsCollection = 'products';

const productSchema = new Schema({
    title: {
        type: String,
        index: true
    },
    description: String,
    thumnail: Image,
    price: Number,
    stock: Number,
    category: {
        type: String     
    }
})

export const productModel = model(productsCollection, productSchema)