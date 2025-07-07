import express from 'express'
import {addProduct,removeProduct,singleProduct,listProducts} from '../controllers/productController.js'
import upload from '../middlewear/multer.js'
import adminAuth from '../middlewear/adminAuth.js'

const productRouter = express.Router()

//MIDDLEWARE FOR ADMIN AUTHETICATION IS TO BE USED FOR ALL OPERATIONS BELOW

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1}]),addProduct) // adds new product
//productRouter.remove('/remove/:id',removeProduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',adminAuth,singleProduct)// to get info about single product
//productRouter.get('/single/:id',singleProduct)
productRouter.get('/list',adminAuth,listProducts)//to get list of available products

export default productRouter
// productRouter.get('/list/:category',listProducts) // to get products by category

