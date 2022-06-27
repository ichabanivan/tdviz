import { Cloudinary } from 'cloudinary-core';

export const CloudinaryService = new Cloudinary({ cloud_name: 'save-health' });

export const bg = CloudinaryService.url('health/bg_s2y8xs.jpg', {
  version: '1651155174',
  flags: 'progressive'
});
