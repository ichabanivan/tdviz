import { Cloudinary } from 'cloudinary-core';

export const CloudinaryService = new Cloudinary({ cloud_name: 'safe-health' });

export const bg = CloudinaryService.url('system/bg_u5rfqi.jpg', {
  version: '1649416632',
  flags: 'progressive'
});
