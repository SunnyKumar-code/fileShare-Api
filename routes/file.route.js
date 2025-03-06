const express=require("express")
const fileController = require("../controllers/route.controller")
const router = express.Router();
const upload = require("../middlewares/fileUpload")

router.post("/api/v1/file/upload",upload.single("file"),fileController.uploadFile)
router.post("/api/v1/file/share",fileController.shareFile)
router.get("/files/download/:id",fileController.downloadFile)
module.exports=router