import express from "express";
import { listAllImagesInFolder, uploadBookImagePresignedUrl, uploadPdfPresignedUrl, saveMetaData } from "../controller/uploadBooksController.js";
import userAuth from "../middleware/userAuth.js";


const dbBookRouter = express.Router();

dbBookRouter.get('/images',listAllImagesInFolder);
dbBookRouter.post('/uploadImage',uploadBookImagePresignedUrl);
dbBookRouter.post('/uploadPdf',uploadPdfPresignedUrl);
dbBookRouter.post('/saveMetaData',userAuth, saveMetaData)

export default dbBookRouter;