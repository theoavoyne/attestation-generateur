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
    fontSize: 10,
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
    height: 90,
    width: 90,
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
        En application du décret n°2020-1310 du 29 octobre 2020 prescrivant les
        mesures générales nécessaires pour faire face à l&apos;épidémie de
        covid-19 dans le cadre de l&apos;état d&apos;urgence sanitaire
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
        certifie que mon déplacement est lié au motif suivant (cocher la case)
        autorisé par le décret n°2020-1310 du 29 octobre 2020 prescrivant les
        mesures générales nécessaires pour faire face à l&apos;épidémie de
        covid-19 dans le cadre de l&apos;état d&apos;urgence sanitaire
        <Text style={style.superscript}>1</Text>
        :
      </Text>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'travail' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacements entre le domicile et le lieu d&apos;exercice de l&apos;activité
          professionnelle ou un établissement d&apos;enseignement ou de formation,
          déplacements professionnels ne pouvant être différés, déplacements
          pour un concours ou un examen
          <Text style={style.superscript}>2</Text>
          .
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'achats_culturel' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacements pour se rendre dans un établissement culturel autorisé
          ou un lieu de culte ; déplacements pour effectuer des achats de
          biens, pour des services dont la fourniture est autorisée, pour les
          retraits de commandes et les livraisons à domicile.
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'sante' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Consultations, examens et soins ne pouvant être assurés à distance
          et l&apos;achat de médicaments.
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'famille' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacements pour motif familial impérieux, pour l&apos;assistance
          aux personnes vulnérables et précaires ou la garde d&apos;enfants.
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'handicap' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacement des personnes en situation de handicap et leur accompagnant.
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'sport_animaux' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacements en plein air ou vers un lieu de plein air, sans
          changement du lieu de résidence, dans la limite de trois heures
          quotidiennes et dans un rayon maximal de vingt kilomètres autour
          du domicile, liés soit à l&apos;activité physique ou aux loisirs
          individuels, à l&apos;exclusion de toute pratique sportive
          collective et de toute proximité avec d&apos;autres personnes,
          soit à la promenade avec les seules personnes regroupées dans un
          même domicile, soit aux besoins des animaux de compagnie ;
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'convocation' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Convocation judiciaire ou administrative et pour se rendre dans un
          service public.
        </Text>
      </View>
      <View style={style.option}>
        <View style={style.square}>
          {content.motive === 'missions' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Participation à des missions d&apos;intérêt général sur demande de
          l&apos;autorité administrative.
        </Text>
      </View>
      <View style={[style.option, { marginBottom: 0 }]}>
        <View style={style.square}>
          {content.motive === 'enfants' && <Image src={CrossPNG} />}
        </View>
        <Text style={style.paragraphRight}>
          Déplacement pour chercher les enfants à l&apos;école et à
          l&apos;occasion de leurs activités périscolaires.
        </Text>
      </View>
      <View style={style.footer}>
        <View>
          <Text style={style.paragraph}>Fait à : {content.city}</Text>
          <Text>Le : {content.date} à {content.time}</Text>
          <Text>(Date et heure de début de sortie à mentionner obligatoirement)</Text>
        </View>
        <Image src={qrcodeURL} style={style.qrcode} />
      </View>
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
      <Image break src={qrcodeURL} style={style.qrcodeBig} />
    </Page>
  </Document>
);

Template.propTypes = {
  content: contentPropTypes.isRequired,
  qrcodeURL: PropTypes.string.isRequired,
};

export default Template;
