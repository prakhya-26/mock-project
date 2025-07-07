//we will add product, remove, total product list, single product details

//function to add product

import {v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'


const addProduct = async (req,res)=>{
    try{

        const {name,description,price,category,subCategory,sizes,bestseller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image1 && req.files.image2[0]
        const image3 = req.files.image1 && req.files.image3[0]
        
        // as we can't store these images as it is in the database, so we first need to store them in cloudinary and from there we will be importing the image url from cloudinary to store in teh database

        const images = [image1,image2,image3].filter((item)=> item!== undefined)
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller==='true'? true:false,
            sizes : JSON.parse(sizes),//to convert array input into string
            image : imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData)
        //saving product in database

        await product.save()

        res.json({success:true,message:"Product Added"})
    }

    catch(error){

        res.json({
            success : false, message : error.message
        })
    }

}

//function to list product

const listProducts = async (req,res)=>{
    try{

        const products = await productModel.find({})
        res.json({success:true,products})

    }
    catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

//function to remove product

const removeProduct = async (req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for singel product info

const singleProduct = async (req,res)=>{
    try{

        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
        
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//exporting the functions so that these can be used in routes

export {addProduct,removeProduct,singleProduct,listProducts}
