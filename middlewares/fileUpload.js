const fs = require("fs");
const multer = require("multer")
const path =require("node:path")
const {v4:uuidv4} = require("uuid")

const filePath = path.join(__dirname,"../uploaded_file")
const storage = multer.diskStorage({
    destination:filePath, // File to save the file in ssd/hdd - disk storage
    filename:(req,file,cb)=>{
        const fileExtension=path.extname(file.originalname)
        const fileName = uuidv4()+fileExtension;
       cb(null , fileName)// Multer will be inform about new file name 
        
    }
})
 const upload = multer({ //Middleware initialization
    storage:storage
 })
 module.exports=upload;
 //const singleFileUploader = upload.single("profilePicture")