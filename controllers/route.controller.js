const FileModel = require("../models/route.modules")
const fs = require("fs");
const path = require("path");
const uploadFile = async(req, res, next) => {
    try{
        const fileDetails={
            originalName:req.file.originalname,
            modifiedName:req.file.filename,
            user:"sunny",
            size:req.file.size,
            path:req.file.path
        }
      const insertedFileDetails= await FileModel.create(fileDetails);
        
        res.json({
            success: true,
            message: "Fill Upload Successfully",
            fileId:insertedFileDetails._id
        })
    }
    catch(err){
        next(err)
    }
}
const shareFile =async (req, res, next) => {

    /**
     * 1. Which File to share ?
     * 2. where is the file stored?
     * 3. what is the new file name after upload?
     * 4. file old name
     */
try{

     const fileDetails=  await FileModel.findById(req.body.fileId)
     
     
     if(!fileDetails){
        res.status(400).json({
            success:false,
            message:"File with give id does not exists"
        })
        return
     }
     console.log(fileDetails);
     
      res.json({
          success: true,
          message: "share file Api",
          data:`/files/download/${fileDetails._id}`
      })
}catch(err){
    next(err)
}
}
const downloadFile =async (req, res, next) => {
    try{
        const fileDetails = await FileModel.findById(req.params.id)
       console.log(fileDetails)
       if(!fileDetails){
        return res.status(400).json({ success: false, message: "Invalid URL" });
        return
       }
       const filePath = fileDetails.path;
       console.log("Attempting to download:", filePath);
       // Check if file exists before sending
    if (!fs.existsSync(filePath)) {
        console.log("File does not exist at:", filePath);
        res.status(404).json({ success: false, message: "File not found" });
        return;
      }
       res.download(filePath,fileDetails.originalName)
     

    }catch(err){
        next(err)
    }
}

const fileController={
uploadFile,
shareFile,
downloadFile
}
module.exports=fileController