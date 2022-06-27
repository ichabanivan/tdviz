import React, { memo } from 'react';

import { bg } from '../assets/cloudinary';

export const Preloader = memo(() => (
  <>
    <div style={{ backgroundImage: `url(${bg})` }} className="pulse-background" />
    <div className="pulse" />
  </>
));
