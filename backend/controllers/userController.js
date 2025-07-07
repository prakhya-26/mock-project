//to allow user to create a new account or login on website

import userModel from '../models/userModel.js'
import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//route for user login
const loginUser = async(req,res)=>{
    try{

        const {email,password} = req.body

        //chekc if user already exists
        const user = await userModel.findOne({email})
        if(user){
            // check if the pwd is correct
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch){
                const token = createToken(user._id) // create token for user
                return res.json({success : true, token}) // send token to user
            }
            else{
                return res.json({success : false, message : "Invalid Password"})
            }
        }
        else{
            return res.json({
                success: false,
                message: "User does not exist. Please register to continue.",
                showRegister: true // You can use this flag on the frontend to show the signup option
            });
            
        }
    }

    catch(error){
        res.json({success : false, message : error.message})
    }
}

//route for user registration/signup

const registerUser = async(req,res)=>{
   try{
        const{name,email,password} = req.body

        //checking user already exists
        const exists = await userModel.findOne({email})
        if (exists){
                return res.json({success: false,message :"User already exists"})
        }
        
        //validating email and strong password
        if(!validator.isEmail(email)){
            return res.json({success : false, message : "Please Enter a Valid E-mail"})

        }

        if(!validator.isStrongPassword(password)){
            // min len - 8, 1 uc, 1lc, 1 number, 1 special character
            return res.json({success : false, message : "Please Enter a Strong Password"})
        }
        
        // we will use bycrypt to hash the password before saving it in database

        const salt = await bcrypt.genSalt(10)
        // SALT : It is a string added to ur pwd before hasing it. It makes ur pwd unique if if 2 users have same pwd.
        const hashedPwd = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password : hashedPwd,
            
        })

        const user = await newUser.save()

        const token = createToken(user._id)//id is auto generate din mongodb database
        res.json({sucess : true, token}) 

        //we will create token using which user can be autheticated into the database


    }
   catch (error){
    console.log(error)
    res.json({success : false, message : error.message})

   }
}

export {loginUser,registerUser}


// route for admin login

const loginAdmin = async (req,res)=>{
    try{
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid creds"})
        }
    }
    catch(error){
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

// route for admin registration/signup
const registerAdmin = async (req,res)=>{
    
}

export {loginAdmin,registerAdmin}
