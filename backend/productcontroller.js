import Product from "./product.js"
import mongoose from "mongoose";

export const getProd=async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({success:true,data:products});
    }
    catch(error){
        res.status(500).json({success:false, message:"Error"});
    }
};

export const createProd=async (req,res)=>{
    const product=req.body;

    // if(!product.name||!product.price||!product.image){
    //     return res.status(400).json({success:false,message:"Provide all"});
    // }
    const newProduct=new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    }
    catch(error){
        console.error("Error",error.message);
        res.status(500).json({success:false,message:"server error"});
    }
};

export const getUpdate = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
  
    const productExists = await Product.findById(id);
    if (!productExists) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
  
    res.status(200).json({
      success: true,
      product: productExists,
    });
};  

export const updateProd=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid ID"});
    }
    const productExists = await Product.findById(id);
    if (!productExists) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    try{
        const updateProduct=await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!updateProduct){
            return res.status(404).json({success:false,message:"Product not found"});
        }
        res.status(200).json({success:true,message:"Product update"});
    }
    catch(error){
        res.status(500).json({success:false,message:"Server error"});
    }
};

export const deleteProd=async(req,res)=>{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    } 
};

export const searchProd = async (req, res) => {
  const { key } = req.params;
  try {
    const keyAsNumber = parseFloat(key);
    let query = {
      "$or": [
        {
          name: { $regex: key, $options: "i" }
        }
      ]
    };
    if (!isNaN(keyAsNumber)) {
      query["$or"].push({
        price: keyAsNumber
      });
    }
    const products = await Product.find(query);
    res.status(200).json(products);
    console.warn(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
