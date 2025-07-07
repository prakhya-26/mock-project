import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true, unique : true},
    cartData : {type: Object, default : {}}, // whenever a new user is created his cart is given empty

},{minimize:false})
/*
In mongoose, if we create an object with default property, it is not considered and thus not added.So, if i add minimize = false 
the object with empty property is also considered and added in database.
*/

const userModel = mongoose.models.user || mongoose.model('user',userSchema)
export default userModel
