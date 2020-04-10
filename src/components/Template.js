import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import React from 'react';

import {
  Document,
  Font,
  Image,
  Page,
  Text,
  View,
} from '@react-pdf/renderer';

import OpenSansRegular from '../static/fonts/OpenSans-Regular.ttf';
import OpenSansBold from '../static/fonts/OpenSans-Bold.ttf';

import contentPropTypes from '../prop-types/content';
import CrossPNG from '../static/images/cross.png';

const now = moment().tz('Europe/Paris');

Font.register({
  family: 'OpenSans',
  fonts: [
    { src: OpenSansRegular },
    { src: OpenSansBold, fontWeight: 700 },
  ],
});

const style = {
  footer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
  },
  note: {
    fontSize: 8,
  },
  noteRight: {
    fontSize: 8,
    textAlign: 'right',
  },
  page: {
    fontFamily: 'OpenSans',
    fontSize: 11,
    lineHeight: 1.2,
    padding: 40,
  },
  paragraph: {
    marginBottom: 12,
  },
  paragraphCenter: {
    marginBottom: 12,
    textAlign: 'center',
  },
  paragraphRight: {
    width: 447,
  },
  qrcode: {
    height: 114,
    width: 114,
  },
  qrcodeBig: {
    height: 330,
    width: 330,
  },
  square: {
    border: 2,
    height: 24,
    width: 24,
    marginRight: 24,
  },
  superscript: {
    fontSize: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    textAlign: 'center',
  },
};

const Template = ({ content, qrcodeURL }) => (
  <Document>
    <Page size="A4" style={style.page}>
      <Text style={style.title}>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</Text>
      <Text style={style.paragraphCenter}>
        En application de l&apos;article 3 du décret du 23 mars 2020 prescrivant
        les mesures générales nécessaires pour faire face à l&apos;épidémie de
        Covid19 dans le cadre de l&apos;état d&apos;urgence sanitaire
      </Text>
      <Text style={style.paragraph}>Je soussigné(e),</Text>
      <Text style={style.paragraph}>
        Mme/M. : {content.firstName} {content.lastName}
      </Text>
      <Text style={style.paragraph}>Né(e) le : {content.birthDate}</Text>
      <Text style={style.paragraph}>À : {content.birthPlace}</Text>
      <Text style={style.paragraph}>
        Demeurant : {content.address} {content.postalCode} {content.city}
      </Text>
      <Text style={style.paragraph}>
        Certifie que mon déplacement est lié au motif suivant (cocher la case)
        autorisé par l&apos;article 3 du décret du 23 mars 2020 prescrivant les
        mesures générales nécessaires pour faire face à l&apos;épidémie de
        Covid19 dans le cadre de l&apos;état d&apos;urgence sanitaire
        <Text style={style.superscript}>1</Text>
        :
      </Text>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'work' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacements entre le domicile et le lieu d&apos;exercice de
          l&apos;activité professionnelle, lorsqu&apos;ils sont indispensables
          à l&apos;exercice d&apos;activités ne pouvant être organisées sous
          forme de télétravail ou déplacements professionnels ne pouvant être
          différés
          <Text style={style.superscript}>2</Text>
          .
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'shopping' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacements pour effectuer des achats de fournitures nécessaires à
          l&apos;activité professionnelle et des achats de première nécessité
          <Text style={style.superscript}>3</Text>
          dans des établissements dont les activités demeurent autorisées
          (liste sur gouvernement.fr).
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'health' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Consultations et soins ne pouvant être assurés à distance et ne
          pouvant être différés ; consultations et soins des patients atteints
          d&apos;une affection de longue durée.
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'family' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacements pour motif familial impérieux, pour l&apos;assistance
          aux personnes vulnérables ou la garde d&apos;enfants.
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'workout' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacements brefs, dans la limite d&apos;une heure quotidienne et
          dans un rayon maximal d&apos;un kilomètre autour du domicile, liés
          soit à l&apos;activité physique individuelle des personnes, à
          l&apos;exclusion de toute pratique sportive collective et de toute
          proximité avec d&apos;autres personnes, soit à la promenade avec les
          seules personnes regroupées dans un même domicile, soit aux besoins
          des animaux de compagnie.
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'judicial' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Convocation judiciaire ou administrative.
        </Text>
      </View>
      <View style={[style.option, { marginBottom: 0 }]}>
        <View style={style.square}>
          {content.motive === 'community' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Participation à des missions d&apos;intérêt général sur demande de
          l&apos;autorité administrative.
        </Text>
      </View>
      <View style={style.footer}>
        <View>
          <Text style={style.paragraph}>Fait à : {content.city}</Text>
          <Text>Le : {content.date} à {content.time}</Text>
          <Text>(Date et heure de début de sortie)</Text>
        </View>
        <Image src={qrcodeURL} style={style.qrcode} />
      </View>
      <Text style={style.noteRight}>Date de création :</Text>
      <Text style={[style.noteRight, { marginBottom: 12 }]}>
        {now.format('DD/MM/YYYY')} à {now.format('HH:mm')}
      </Text>
      <Text style={style.note}>
        <Text style={style.superscript}>1</Text>
        Les personnes souhaitant bénéficier de l&apos;une de ces exceptions
        doivent se munir s&apos;il y a lieu, lors de leurs déplacements hors de
        leur domicile, d&apos;un document leur permettant de justifier que le
        déplacement considéré entre dans le champ de l&apos;une de ces
        exceptions.
      </Text>
      <Text style={style.note}>
        <Text style={style.superscript}>2</Text>
        A utiliser par les travailleurs non-salariés, lorsqu&apos;ils ne peuvent
        disposer d&apos;un justificatif de déplacement établi par leur employeur.
      </Text>
      <Text style={style.note}>
        <Text style={style.superscript}>3</Text>
        Y compris les acquisitions à titre gratuit (distribution de denrées
        alimentaires…) et les déplacements liés à la perception de prestations
        sociales et au retrait d&apos;espèces.
      </Text>
      <Image break src={qrcodeURL} style={style.qrcodeBig} />
    </Page>
  </Document>
);

Template.propTypes = {
  content: contentPropTypes.isRequired,
  qrcodeURL: PropTypes.string.isRequired,
};

export default Template;
