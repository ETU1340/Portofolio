import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadedImage } from './uploads.types';

const AVATAR_FOLDER = 'portfolio/avatars';

@Injectable()
export class UploadsService implements OnModuleInit {
  private readonly logger = new Logger(UploadsService.name);

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.config.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET');

    if (!cloudName || !apiKey || !apiSecret) {
      this.logger.warn(
        'Cloudinary non configuré : CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET sont requis pour l’upload d’images.',
      );
      return;
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  private isConfigured(): boolean {
    const { cloud_name, api_key, api_secret } = cloudinary.config();
    return Boolean(cloud_name && api_key && api_secret);
  }

  async uploadAvatar(file: Express.Multer.File): Promise<UploadedImage> {
    if (!this.isConfigured()) {
      throw new InternalServerErrorException(
        'Le service de stockage d’images n’est pas configuré',
      );
    }

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: AVATAR_FOLDER,
          resource_type: 'image',
          overwrite: false,
          transformation: [
            { width: 512, height: 512, crop: 'fill', gravity: 'face' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, response) => {
          if (error || !response) {
            reject(error ?? new Error('Réponse Cloudinary vide'));
            return;
          }
          resolve(response);
        },
      );
      stream.end(file.buffer);
    }).catch((error: unknown) => {
      this.logger.error('Échec upload Cloudinary', error);
      throw new InternalServerErrorException(
        'Échec de l’envoi de l’image vers le stockage',
      );
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  }
}
