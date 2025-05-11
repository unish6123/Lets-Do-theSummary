import { ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from "../config/s3.js";
import 'dotenv/config';
import bookModel from "../model/bookModel.js";


export const listAllImagesInFolder = async(req, res)=>{
    try{
        const command = new ListObjectsV2Command({
            Bucket: process.env.bucketName,
            Prefix: process.env.s3ImageFolderName, 
        });
    
        const response = await s3Client.send(command);
    
        const files = response.Contents || [];

        if (files.length === 0){
            return res.json({success:false, message:"No books to display."})
        }

        const imageUrls = await Promise.all(
            files.map(async (file) => {
                const getObjectCommand = new GetObjectCommand({
                    Bucket: process.env.bucketName,
                    Key: file.Key,
                });
                const url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 }); // 1 hour expiry
                return {
                    key: file.Key,
                    url: url,
                };
            })
        );
    
        return res.json({success:true, imageUrls :imageUrls})

        
    } catch(error){
        res.json({success:false, message:error.message})
    }
};

export const uploadBookImagePresignedUrl = async(req, res)=>{
    try{
        const {imageFileName} = req.body;
        if (!imageFileName){
            return res.json({success:false, message:"File name is required."})
        }
        const command = new PutObjectCommand({
            Bucket: process.env.bucketName,
            Key: `images/${imageFileName}`,
            ContentType: 'image/jpeg',
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiry
        return res.json({success:true, url:url});
    

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

export const uploadPdfPresignedUrl =async(req, res)=>{
    try{
        const {pdfFileName} = req.body;
        if (!pdfFileName){
            return res.json({success:false, message:"PDF File name is required."})
        }
        const command = new PutObjectCommand({
            Bucket: process.env.bucketName,
            Key: `${process.env.s3PdfFolderName}${pdfFileName}`,
            ContentType: 'application/pdf',
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiry
        return res.json({success:true, url:url});
        
    }catch(error){
        res.json({success:false, message:error.message})
    }
}



export const saveMetaData = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, bookName, image, pdf, chapters } = req.body;

    // Basic validation (you could improve or centralize this)
    if (!userId || !bookName || !image || !pdf || !chapters || !Array.isArray(chapters)) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // Create new book document
    const newBook = await bookModel.create({
      userId,
      bookName,
      image,
      pdf,
      chapters,
    });

    return res.status(201).json({
      success: true,
      message: "Book metadata saved successfully.",
      
    });
  } catch (error) {
    console.error("Error saving book metadata:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


// // the file name I could get it from the body itself
// async function uploadPdf(){
//     const command = new PutObjectCommand({
//         Bucket: process.env.bucketName,
//         Key: 'pdfs/',
//         ContentType: 'application/pdf',
//     });
//     const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiry
//     return url;
// }

// // await uploadPdf();

// async function uploadThumbnail(fileName){
//     const command = new PutObjectCommand({
//         Bucket: process.env.bucketName,
//         Key: `${process.env.bucketName}${fileName}`,
//         ContentType: 'image/jpeg',
//     });
//     const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiry
//     return url;
// }

// async function imageUrl(){
//     const urls = await uploadThumbnail('random.jpeg');
//     console.log(urls)
// }
// imageUrl();
