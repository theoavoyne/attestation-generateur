import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { editField, editMotive } from '../actions/content';

import ContentContext from '../contexts/Content';
import LabelledInput from './LabelledInput';

import PoweredPNG from '../static/images/powered.png';

const Grid = styled.div`
  column-gap: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  &:not(:last-child) { margin-bottom: 3rem; }
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Image = styled.img`
  margin: 2rem auto 0 auto;
  display: block;
  height: 3rem;
`;

const LinkLikeButton = styled.button`
  background: transparent;
  border: none;
  color: #4B4B4B;
  cursor: pointer;
  padding: none;
  text-decoration: underline;
`;

const Option = styled.div`
  align-items: center;
  display: flex;
  &:not(:last-child) { margin-bottom: 1rem; }
`;

const OptionText = styled.p`
  line-height: 1.5;
  margin: 0;
`;

const Options = styled.div`
  margin-bottom: 3rem;
`;

const Paragraph = styled.p`
  line-height: 1.5;
  margin: 0 0 3rem 0;
  &:not(:last-child) { margin-bottom: 1rem; }
`;

const ParagraphBottom = styled.p`
  line-height: 1.5;
  margin: 0;
`;

const Button = styled.button.attrs(() => ({
  onMouseDown: (e) => {
    document.activeElement.blur();
    e.preventDefault();
  },
}))`
  background: ${({ isActive, theme }) => (isActive ? 'white' : theme.ziggurat)};
  border: .5rem solid ${({ theme }) => theme.ziggurat};
  border-radius: 3px;
  cursor: pointer;
  flex-shrink: 0;
  height: 2rem;
  margin: 0 2rem;
  padding: 0;
  width: 2rem;
  @media (max-width: 992px) {
    border: .35rem solid ${({ theme }) => theme.ziggurat};
    height: 1.5rem;
    margin: 0 1.5rem 0 0;
    width: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.sanJuan};
  margin: 0 0 2rem 0;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.halfBaked};
  color: white;
  display: inline-block;
  font-weight: 700;
  margin-bottom: 1rem;
  padding: .5rem 1rem;
`;

const Title = styled.h1`
  margin: 0 0 3rem 0;
`;

const Wrapper = styled.div`
  flex-basis: 50%;
  height: 100%;
  overflow-y: scroll;
  padding: 3rem;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 992px) {
    flex-basis: 100%;
  }
`;

const EditPanel = () => {
  const [content, dispatchContent] = useContext(ContentContext);

  const [legal, setLegal] = useState(false);

  const handleChange = (e) => { dispatchContent(editField(e)); };

  const handleClick = (value) => { dispatchContent(editMotive(value)); };

  return (
    <Wrapper>
      <Tag>COVID-19</Tag>
      <Title>Générateur d&apos;attestation de déplacement dérogatoire</Title>
      <span>
        <Paragraph>
          Les données saisies sont stockées exclusivement sur votre téléphone ou
          votre ordinateur.&nbsp;
          <strong>Aucune information n&apos;est collectée</strong>
          .
        </Paragraph>
        <Paragraph>
          Contrairement au site du gouvernement,&nbsp;
          <strong>aucun cookie n&apos;est utilisé</strong>
          .&nbsp;
          <a href="https://fr.wikihow.com/voir-les-cookies">
            Comment voir les cookies ?
          </a>
        </Paragraph>
        <Paragraph>
          Le code du présent site est accessible&nbsp;
          <strong>dans son intégralité</strong>
          &nbsp;sur <a href="https://github.com/theoavoyne/attestation-generateur">GitHub</a>
          .
        </Paragraph>
      </span>
      <Subtitle>Informations personnelles</Subtitle>
      <Grid>
        <LabelledInput
          field="firstName"
          label="Prénom"
          onChange={handleChange}
          placeholder="Jean"
          value={content.firstName}
        />
        <LabelledInput
          field="lastName"
          label="Nom"
          onChange={handleChange}
          placeholder="Dupont"
          value={content.lastName}
        />
        <LabelledInput
          field="birthDate"
          label="Date de naissance (JJ/MM/AAAA)"
          onChange={handleChange}
          placeholder="01/01/1970"
          value={content.birthDate}
        />
        <LabelledInput
          field="birthPlace"
          label="Lieu de naissance"
          onChange={handleChange}
          placeholder="Paris"
          value={content.birthPlace}
        />
        <LabelledInput
          field="address"
          label="Adresse"
          onChange={handleChange}
          placeholder="15, rue de la Paix"
          value={content.address}
        />
        <LabelledInput
          field="city"
          label="Ville"
          onChange={handleChange}
          placeholder="Paris"
          value={content.city}
        />
        <LabelledInput
          field="postalCode"
          label="Code Postal"
          placeholder="75008"
          onChange={handleChange}
          value={content.postalCode}
        />
      </Grid>
      <Subtitle>Motif de sortie</Subtitle>
      <Options>
        <Option>
          <Button
            isActive={content.motive === 'travail'}
            onClick={() => { handleClick('travail'); }}
          />
          <OptionText>
            Déplacements entre le domicile et le lieu d&apos;exercice de l&apos;activité
            professionnelle ou un établissement d&apos;enseignement ou de formation,
            déplacements professionnels ne pouvant être différés, déplacements
            pour un concours ou un examen.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'achats_culturel'}
            onClick={() => { handleClick('achats_culturel'); }}
          />
          <OptionText>
            Déplacements pour se rendre dans un établissement culturel autorisé
            ou un lieu de culte ; déplacements pour effectuer des achats de
            biens, pour des services dont la fourniture est autorisée, pour les
            retraits de commandes et les livraisons à domicile.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'sante'}
            onClick={() => { handleClick('sante'); }}
          />
          <OptionText>
            Consultations, examens et soins ne pouvant être assurés à distance
            et l&apos;achat de médicaments.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'famille'}
            onClick={() => { handleClick('famille'); }}
          />
          <OptionText>
            Déplacements pour motif familial impérieux, pour l&apos;assistance
            aux personnes vulnérables et précaires ou la garde d&apos;enfants.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'handicap'}
            onClick={() => { handleClick('handicap'); }}
          />
          <OptionText>
            Déplacement des personnes en situation de handicap et leur accompagnant.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'sport_animaux'}
            onClick={() => { handleClick('sport_animaux'); }}
          />
          <OptionText>
            Déplacements en plein air ou vers un lieu de plein air, sans
            changement du lieu de résidence, dans la limite de trois heures
            quotidiennes et dans un rayon maximal de vingt kilomètres autour
            du domicile, liés soit à l&apos;activité physique ou aux loisirs
            individuels, à l&apos;exclusion de toute pratique sportive
            collective et de toute proximité avec d&apos;autres personnes,
            soit à la promenade avec les seules personnes regroupées dans un
            même domicile, soit aux besoins des animaux de compagnie ;
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'convocation'}
            onClick={() => { handleClick('convocation'); }}
          />
          <OptionText>
            Convocation judiciaire ou administrative et pour se rendre dans un
            service public.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'missions'}
            onClick={() => { handleClick('missions'); }}
          />
          <OptionText>
            Participation à des missions d&apos;intérêt général sur demande de
            l&apos;autorité administrative.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'enfants'}
            onClick={() => { handleClick('enfants'); }}
          />
          <OptionText>
            Déplacement pour chercher les enfants à l&apos;école et à
            l&apos;occasion de leurs activités périscolaires.
          </OptionText>
        </Option>
      </Options>
      <Subtitle>Date et heure de sortie</Subtitle>
      <Grid>
        <LabelledInput
          field="date"
          label="Date (JJ/MM/AAAA)"
          onChange={handleChange}
          value={content.date}
        />
        <LabelledInput
          field="time"
          label="Heure (HH:MM)"
          onChange={handleChange}
          value={content.time}
        />
      </Grid>
      {legal ? (
        <ParagraphBottom>
          Le présent site est édité et géré par la société Black Jelly,
          immatriculée au RCS sous le numéro 890 152 556.
          <div>Adresse : 4 rue Jules Lefebvre Ground, 75009 Paris.</div>
          <div>Contact : <a href="mailto:hello@blackjelly.co">hello@blackjelly.co</a>.</div>
          <div>Hébergeur : Firebase (1600 Amphitheatre Parkway, California, USA).</div>
        </ParagraphBottom>
      ) : (
        <LinkLikeButton
          onClick={() => setLegal(true)}
          type="button"
        >
          Mentions légales
        </LinkLikeButton>
      )}
      <a href="https://blackjelly.co"><Image src={PoweredPNG} /></a>
    </Wrapper>
  );
};

export default EditPanel;
