import mongoose from "mongoose";
import { USER_ROLES } from "../config/user_Roles.js";

const USER_ROLES_VALUES = Object.values(USER_ROLES);

const userSchema = new mongoose.Schema(
        {
        username: {
            type: String,
            required: true,
            trim: true,
            min:3,
            max:20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: USER_ROLES_VALUES,
            default: USER_ROLES.Customer,
        },
        phone: {
            type: String
        },
        pic_URL: {
            type: String,
            default: "na"
        },
        pic_URL_ID: {
            type: String,
            default: "na"
        },
        contacts : {
            type: Array,
            default: []
        },
        acct_created: {
            type: Date,
            default: Date.now
        }
        },
        
        { timestamps: true }
  );
  
  export const User = mongoose.model("user", userSchema);