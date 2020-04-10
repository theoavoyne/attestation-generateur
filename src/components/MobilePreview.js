import PropTypes from 'prop-types';

import React, { useContext, useEffect, useState } from 'react';

import { Document, Page } from 'react-pdf/dist/entry.webpack';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import buildBlob from '../utils/buildBlob';

import ContentContext from '../contexts/Content';
import LoaderSVG from '../static/icons/loader.svg';
import TimesSVG from '../static/icons/times.svg';

const Button = styled.button`
  background: none;
  color: white;
  border: none;
  display: flex;
  padding: 0;
  position: absolute;
  right: 10vw;
  top: 50%;
  transform: translateY(-50%);
`;

const Controls = styled.div`
  background: ${({ theme }) => theme.tundora};
  height: 10%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const DocumentContainer = styled.div`
  background: white;
  border-radius: 5px;
  box-shadow: 0 25px 50px 0 rgba(62, 62, 62, 0.15);
  height: calc((29.7 / 21) * 80vw);
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 55%;
  transform: translate(-50%, -50%);
  width: 80vw;
`;

const DownloadLink = styled.a`
  background: ${({ theme }) => theme.halfBaked};
  border-radius: 5px;
  color: white;
  font-weight: 500;
  left: 50%;
  padding: .5rem .75rem;
  position: absolute;
  text-decoration: none;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LoaderIcon = styled(SVG)`
  height: 3rem;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TimesIcon = styled(SVG)`
  color: white;
  height: 1.5rem;
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.sanJuan};
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const PreviewPanel = ({ close }) => {
  const [content] = useContext(ContentContext);

  const [blobURL, setBlobURL] = useState(null);

  useEffect(() => {
    let didCancel = false;

    const buildAndSetBlob = async () => {
      const URL = await (buildBlob(content));
      if (!didCancel) { setBlobURL(URL); }
    };

    buildAndSetBlob();

    return () => {
      didCancel = true;
      if (blobURL) { URL.revokeObjectURL(blobURL); }
    };
  }, []);

  return (
    <Wrapper>
      <Controls>
        <DownloadLink download="Attestation.pdf" href={blobURL}>
          Ouvrir
        </DownloadLink>
        <Button onClick={close}>
          <TimesIcon src={TimesSVG} />
        </Button>s
      </Controls>
      <DocumentContainer>
        <LoaderIcon src={LoaderSVG} />
        {blobURL && (
          <Document file={blobURL} loading={null}>
            <Page
              loading={null}
              pageNumber={1}
              width={window.innerWidth * 0.8}
            />
          </Document>
        )}
      </DocumentContainer>
    </Wrapper>
  );
};

PreviewPanel.propTypes = {
  close: PropTypes.func.isRequired,
};

export default PreviewPanel;
