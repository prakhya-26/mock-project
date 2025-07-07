import multer from "multer"

// Multer is used to upload files in express.js application

const storage = multer.diskStorage({
    filename : function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({
    storage
})

export default upload