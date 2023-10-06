import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
        {
        order_ID: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        payment_ID: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        order_ETA: {
            type: String,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        order_qty: {
            type: Number,
            required: true,
        },
        order_items: {
            type: Array,
            default: [],
            required: true,
        },
        order_Status: {
            type: String,
            required: true,
        },
        order_pic_URL: {
            type: String,
            default: "https://t4.ftcdn.net/jpg/00/79/53/85/360_F_79538507_HbR2XzYpYK9zyI1xJN3uJBjDexA6ei9l.jpg"
        },
       order_created: {
            type: Date,
            default: Date.now
        }    
    },
    { timestamps: true }
    );

  export const Order = mongoose.model("order", orderSchema);