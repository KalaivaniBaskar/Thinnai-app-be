import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
        {
        product_ID: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        prod_pic_URL: {
            type: String,
            default: "na"
        },
        prod_pic_URL_ID: {
            type: String,
            default: "na"
        },
        product_created: {
            type: Date,
            default: Date.now
        }    
    },
    { timestamps: true }
    );

  export const Product = mongoose.model("product", productSchema);