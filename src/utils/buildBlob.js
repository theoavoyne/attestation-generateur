import React from 'react';
import { pdf } from '@react-pdf/renderer';

import Template from '../components/Template';

export default (content) => (
  pdf(<Template content={content} />)
    .toBlob()
    .then((blob) => URL.createObjectURL(blob))
);
