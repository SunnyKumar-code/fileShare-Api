const FileModel = require("../models/route.modules")

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
          data:`/files/download/${req.body.fileId}`
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
        res.end("Invalid url");
        return
       }
       res.download(fileDetails.path,fileDetails.originalName)
     

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