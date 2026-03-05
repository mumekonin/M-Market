import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      
      //  Check if result exists before accessing secure_url
      if (result) {
        resolve(result.secure_url);
      } else {
        reject(new Error('Cloudinary upload result is undefined'));
      }
    });
    
    toStream(file.buffer).pipe(upload);
  });
}
}