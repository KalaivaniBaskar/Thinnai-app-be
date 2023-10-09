import { Product } from '../Models/productModel.js'
import { nanoid } from 'nanoid' ;
import dotenv from 'dotenv'
dotenv.config()


export const handleAddProduct = async(req, res) => {
    try{

        //console.log(req.body);
        //const id = nanoid();
        const id = Math.random().toString(36).substring(2,9);
        const product_ID = "PD-" + id
        console.log("add new prod",id)
        console.log("handle add prod") 
        const newProduct = new Product({...req.body, product_ID})
        const result = await newProduct.save();
        //console.log(result)
        if( result)
        res.status(200).json({message:"Product Added!"});
        else
        res.status(400).json({message:"Error occured"});

    }
    catch(error){
        res.status(500).send({message: "Internal server error", error: error})
      }
}

export const handleEditProduct = async(req, res) => {
    try{

        //console.log(req.body);
        const {product_ID} = req.body;
        const updateData = {
            title : req.body.title,
            category : req.body.category,
            price : req.body.price,
            weight : req.body.weight,
            stock : req.body.stock,
            discount : req.body.discount,
            prod_pic_URL : req.body.prod_pic_URL,
            prod_pic_URL_ID : req.body.prod_pic_URL_ID,
        }
        if(!product_ID) {
            return res.status(400).json({message:"Invalid product ID"});
        }
        console.log("handle update prod") 
        
        const result = await Product.findOneAndUpdate( {product_ID: product_ID}, 
            {...updateData},
            {new:true})
        //console.log(result)
        if( result)
        return res.status(200).json({message:"Product Updated!"});
        else
        return res.status(400).json({message:"Error occured"});

    }
    catch(error){
        res.status(500).send({message: "Internal server error", error: error})
      }
}
export const handleDeleteProduct = async(req, res) => {
    try{

        //console.log(req.params);
        const {product_ID} = req.params;
     
        if(!product_ID) {
            return res.status(400).json({message:"Invalid product ID"});
        }
        console.log("handle delete prod") 
        
        const result = await Product.findOneAndDelete( {product_ID: product_ID})
        //console.log(result)
        if( result)
        return res.status(200).json({message:"Product Deleted!"});
        else
        return res.status(400).json({message:"Error occured"});
    }
    catch(error){
        res.status(500).send({message: "Internal server error", error: error})
      }
}

// get all available products
export const getAllProducts = async(req,res) => {
    try{
        console.log("get products")
    const allProducts = await Product.find({...req.body});
    if(allProducts.length)
    res.status(200).json({allProducts: allProducts});
    else 
    res.status(400).json({message:"No products found"});
    }
    catch(error){
        res.status(500).send({message: "Internal server error", error: error})
      }

} 

export const handleUpdateStock = async(req,res) => {
    try{
      // console.log(req.body)
      const update_stock = req.body.order_items; 
      const low_stock = []
     
        console.log("update stock")
        for( let i of update_stock) {
            const result = await Product.findOneAndUpdate(
                    { "product_ID" : i.product_ID},
                    { $inc : { "stock": -(i.qty) }},
                    {new:true}
            )
            //console.log(result) 
              if(!result){
                console.log('Error updating stock', error);
                return res.status(400).json({message:"Stock not upated"});
               }
                if(result.product_stock <= 10) {
                low_stock.push(result.product_ID)
                } 
            } 
                if(low_stock.length > 0) {
                    console.log("mail sales team to restock")
                } 
              return res.status(200).json({"message": "stock updated", order: req.body});
          
        }
      catch(error){
        console.log(error)
          res.status(500).send({message: "Internal server error", error: error})
        }
  }