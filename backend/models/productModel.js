import mongoose from "mongoose"

// using  schema i can define a structure to create/store data in database
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true, // mandate to provide name

    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    image : {
        type : Array,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    subCategory : {
        type : String,
        required : true,
    },
    sizes : {
        type : Array,
        required : true,
    },
    bestseller : {
        type : Boolean,
    },
    date : {
        type : Number,
        required : true,
    }
})

// using above schema create a model to use it in teh project
const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel