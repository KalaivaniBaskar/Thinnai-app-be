import Razorpay from 'razorpay'
import crypto from 'crypto' 
import { Order } from '../Models/orderModel.js';

// create order
export const handleOrder = async(req,res) => {
    try {
        console.log("razorpay order id")
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret : process.env.KEY_SECRET
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        instance.orders.create(options, (error, order) => {
            if(error){
                console.log(error);
                return res.status(500).json({message: "Something went wrong"})
            }
            res.status(200).json({data: order});
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error", error: error})
    }
}

// payment verify
export const handlePaymentVerify = async(req,res) => {
    try {
        console.log("razorpay payment verify")
       const {
         razorpay_order_id,
         razorpay_payment_id,
         razorpay_signature } = req.body
          
         const order = { 
            order_ID: razorpay_order_id,
            payment_ID : razorpay_payment_id,
            email : req.body.email, 
            phone : req.body.phone, 
            address : req.body.address, 
            amount: req.body.amount,
            order_qty: req.body.order_qty,
            order_items : req.body.order_items,
            order_pic_URL : req.body.order_pic_URL,
            order_ETA: req.body.order_ETA
        }
         const sign = razorpay_order_id + "|" + razorpay_payment_id;
         const expectedSign = crypto
         .createHmac("sha256", process.env.KEY_SECRET)
         .update(sign.toString())
         .digest("hex")
         
         if(razorpay_signature === expectedSign){      
            let newOrder = new Order({...order, order_Status: "PAYMENT SUCCESS"}) 
            const result= await newOrder.save();
            //console.log(result);

            if(!result){
              return res.status(400)
                  .json({message:"Error creating order", newOrder})
            }                  
            res.status(200).json({message: "Payment Verified !", result});
         }
         else {
            let newOrder = new Order({...order, order_Status: "PAYMENT UNVERIFIED"}) 
            const result= await newOrder.save();
            //console.log(result);

            if(!result){
              return res.status(400)
                  .json({message:"Error creating order", newOrder})
            }          
            res.status(400).json({message: "Invalid Signature !", result});
         }

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error", error: error})
    }
}
// payment verify
export const handleFailedPayment = async(req,res) => {
    try {
        console.log("razorpay failed payment ")
       const {
         order_id,
         payment_id,
         } = req.body
          
         const order = { 
            order_ID: order_id,
            payment_ID : payment_id,
            email : req.body.email, 
            phone : req.body.phone, 
            address : req.body.address, 
            amount: req.body.amount,
            order_qty: req.body.order_qty,
            order_items : req.body.order_items,
            order_pic_URL : req.body.order_pic_URL,
            order_ETA: req.body.order_ETA
        }
         
            let newOrder = new Order({...order, order_Status: "PAYMENT FAILED"}) 
            const result= await newOrder.save();
            //console.log(result);

            if(!result){
              return res.status(400)
                  .json({message:"Error creating order", newOrder})
            }                  
            res.status(200).json({message: "Payment Failed !", result});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error", error: error})
    }
}

// get user orders
export const handleGetOrders = async(req,res) => {
    try{
        
        console.log("get user orders")
        const {email} = req.body
        if(!email){
            res.status(400).send({message: "User Details not received"})
        }
    const allOrders = await Order.find({email: email});
    if(allOrders.length)
    res.status(200).json({allOrders: allOrders});
    else 
    res.status(400).json({message:"No Orders found"});
    }
    catch(error){
        res.status(500).send({message: "Internal server error", error: error})
      }

} 