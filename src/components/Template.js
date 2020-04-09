import React from 'react';

import {
  Document,
  Font,
  Page,
  Text,
} from '@react-pdf/renderer';

import ArialRegular from '../static/fonts/Arial-Regular.ttf';
import ArialBold from '../static/fonts/Arial-Bold.ttf';

import contentPropTypes from '../prop-types/content';

Font.register({
  family: 'Arial',
  fonts: [
    { src: ArialRegular },
    { src: ArialBold, fontWeight: 700 },
  ],
});

const style = {
  page: {
    fontFamily: 'Arial',
    fontSize: 12,
    padding: 50,
  },
  paragraph: {
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    textAlign: 'center',
  },
};

const Template = ({ content }) => (
  <Document>
    <Page size="A4" style={style.page}>
      <Text style={style.title}>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</Text>
      <Text style={style.paragraph}>
        En application de l&apos;article 3 du décret du 23 mars 2020 prescrivant
        les mesures générales nécessaires pour faire face à l&apos;épidémie de
        Covid19 dans le cadre de l&apos;état d&apos;urgence sanitaire
      </Text>
    </Page>
  </Document>
);

Template.propTypes = {
  content: contentPropTypes.isRequired,
};

export default Template;
