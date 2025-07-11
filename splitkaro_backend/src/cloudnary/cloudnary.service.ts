import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
@Injectable()
export class CloudnaryService {

    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDNARY_API_KEY,
            api_secret: process.env.CLOUDNARY_SECRET_KEY
        });
    }


    async uploadFileFromPath(path: string): Promise<string> {
        const MaxAttempts = 3;
        const time = 3000;
        for (let attempts = 1; attempts <= MaxAttempts; attempts++) {
            try {
                const uploadResult = await cloudinary.uploader.upload(path, {
                    folder: 'profile',
                });

                return uploadResult.secure_url;
            }
            catch (error) {
                console.warn(`Upload attempt ${attempts} failed:`, error.message);

                if (attempts < MaxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    console.log(`Retrying upload... (attempt ${attempts + 1})`);
                } else {
                    throw new InternalServerErrorException('Upload failed after retries');
                }
            }
        }
        return "uploladed";
    }

}