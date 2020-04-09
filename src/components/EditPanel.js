import React, { useContext } from 'react';
import styled from 'styled-components';

import { editField, editMotive } from '../actions/content';

import ContentContext from '../contexts/Content';
import LabelledInput from './LabelledInput';

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
  margin 0 2rem;
  padding: 0;
  width: 2rem;
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
  height: 100vh;
  overflow-y: scroll;
  padding: 3rem;
  @media (max-width: 992px) {
    flex-basis: 100%;
  }
`;

const EditPanel = () => {
  const [content, dispatchContent] = useContext(ContentContext);

  const handleChange = (e) => { dispatchContent(editField(e)); };

  const handleClick = (value) => { dispatchContent(editMotive(value)); };

  return (
    <Wrapper>
      <Tag>COVID-19</Tag>
      <Title>Générateur d&apos;attestation de déplacement dérogatoire</Title>
      <Paragraph>
        Les données saisies sont stockées exclusivement sur votre téléphone ou
        votre ordinateur. Aucune information n&apos;est collectée.
      </Paragraph>
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
          placeholder="Paris"
          value={content.address}
        />
        <LabelledInput
          field="city"
          label="Ville"
          onChange={handleChange}
          placeholder="15, rue de la Paix"
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
            isActive={content.motive === 'work'}
            onClick={() => { handleClick('work'); }}
          />
          <OptionText>
            Déplacements entre le domicile et le lieu d&apos;exercice de
            l&apos;activité professionnelle, lorsqu&apos;ils sont indispensables
            à l&apos;exercice d&apos;activités ne pouvant être organisées sous
            forme de télétravail ou déplacements professionnels ne pouvant être
            différés.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'shopping'}
            onClick={() => { handleClick('shopping'); }}
          />
          <OptionText>
            Déplacements pour effectuer des achats de fournitures nécessaires à
            l&apos;activité professionnelle et des achats de première nécessité
            dans des établissements dont les activités demeurent autorisées
            (liste sur gouvernement.fr).
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'health'}
            onClick={() => { handleClick('health'); }}
          />
          <OptionText>
            Consultations et soins ne pouvant être assurés à distance et ne
            pouvant être différés ; consultations et soins des patients atteints
            d&apos;une affection de longue durée.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'family'}
            onClick={() => { handleClick('family'); }}
          />
          <OptionText>
            Déplacements pour motif familial impérieux, pour l&apos;assistance
            aux personnes vulnérables ou la garde d&apos;enfants.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'workout'}
            onClick={() => { handleClick('workout'); }}
          />
          <OptionText>
            Déplacements brefs, dans la limite d&apos;une heure quotidienne et
            dans un rayon maximal d&apos;un kilomètre autour du domicile, liés
            soit à l&apos;activité physique individuelle des personnes, à
            l&apos;exclusion de toute pratique sportive collective et de toute
            proximité avec d&apos;autres personnes, soit à la promenade avec les
            seules personnes regroupées dans un même domicile, soit aux besoins
            des animaux de compagnie.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'judicial'}
            onClick={() => { handleClick('judicial'); }}
          />
          <OptionText>
            Convocation judiciaire ou administrative.
          </OptionText>
        </Option>
        <Option>
          <Button
            isActive={content.motive === 'community'}
            onClick={() => { handleClick('community'); }}
          />
          <OptionText>
            Participation à des missions d&apos;intérêt général sur demande de
            l&apos;autorité administrative.
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
    </Wrapper>
  );
};

export default EditPanel;
