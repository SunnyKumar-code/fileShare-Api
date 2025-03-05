const mongoose = require("mongoose")
const fileSchemaObject = {
    originalName:{
        type:String
    },
    modifiedName:{
        type:String
    },
    user:{
        type:String
    },
    size:{
        type:Number
    },
    path:{
        type:String
    }
}
const fileSchema= new mongoose.Schema(fileSchemaObject)
const FileModel=  mongoose.model("files",fileSchema)
module.exports=FileModel