const express = require("express")
const mongoose = require("mongoose")
const fileRoute = require("./routes/file.route")
/**
 * !st phase : File Upload Feature
 * 2nd phase : Apis to download th e file , generate sharable link etc
 */

const app = express();
  app.use(express.json())

 /**
  * Middleware
  * 1. Parse file data and convert into JSON
  * 2. It Help in reading the file from api body as well
  */

 /**
  * Points to consider fro file upload
  * 1. Where to save the file(RAM-memory storage,HDD/SSD - disk Storage) (Path / folder /Directory)
  * 2. File Validation (Which type of files are allowed to be uploaded)
  *     2.1 Size of File
  *     2.2 Type of the File
  * 3. FileName after upload(WA202502214758965)
  */
//db connect
mongoose
.connect("mongodb+srv://sk202542:OACI6BZkikMcZkx2@cluster0.wrevt.mongodb.net/")
.then(()=>console.log("DB Connect Successfully"))
.catch(err=>console.log("Error Connecting on DB ",err))


app.use(fileRoute)


app.listen(5000,()=>console.log("Server is up and running at port 5000"))