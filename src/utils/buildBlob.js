import moment from 'moment-timezone';
import QRCode from 'qrcode';
import React from 'react';
import { pdf } from '@react-pdf/renderer';

import Template from '../components/Template';

export default (content) => {
  const now = moment().tz('Europe/Paris');

  return QRCode.toDataURL(`Cree le: ${now.format('DD/MM/YYYY')} a ${now.format('HH:mm')}; Nom: ${content.lastName}; Prenom: ${content.firstName}; Naissance: ${content.birthDate} a ${content.birthPlace}; Adresse: ${content.address} ${content.postalCode} ${content.city}; Sortie: ${content.date} a ${content.time}; Motifs: ${content.motive}`)
    .then((qrcodeURL) => (
      pdf(<Template content={content} qrcodeURL={qrcodeURL} />).toBlob()
    ))
    .then((blob) => URL.createObjectURL(blob));
};
