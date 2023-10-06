import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { mongoConnection } from './db.js'
import { userRouter } from './Routes/userRoutes.js'
import { paymentRouter } from './Routes/paymentRoutes.js'
import { productRouter } from './Routes/productRoutes.js'

const app = express();
const PORT = process.env.PORT || 9000;
//DataBase connection 
mongoConnection(); 

//middleware
app.use(cors());
app.use(express.json()); 

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//Base Route - Router 
app.use('/auth/user', userRouter);
app.use('/api/payment', paymentRouter);
app.use('/products', productRouter);

// Listening to server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import crypto from 'crypto'
// console.log(crypto.randomBytes(64).toString('hex'));