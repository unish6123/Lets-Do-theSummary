// import aws from 'aws-sdk';
import 'dotenv/config';
import { S3Client } from '@aws-sdk/client-s3';



const s3Client = new S3Client({
    region: process.env.region,
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    },
});

export default s3Client;