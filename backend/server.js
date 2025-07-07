import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

// App Config

const app = express() // creating instance of express server
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
// Middlewares

app.use(express.json())// to parse JSON bodies
app.use(cors()) // to enable CORS for all routes

//api endpoinst

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port,()=> console.log("Server started on port : " + port))