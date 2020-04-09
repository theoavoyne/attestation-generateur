import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Document, Page } from 'react-pdf/dist/entry.webpack';
import styled from 'styled-components';

import buildBlob from '../utils/buildBlob';
import difference from '../utils/difference';
import useHeight from '../hooks/useHeight';

import PageNavigation from './PageNavigation';
import ContentContext from '../contexts/Content';

const DocumentContainer = styled.div`
  background: white;
  border-radius: 5px;
  box-shadow: 0 25px 50px 0 rgba(62, 62, 62, 0.15);
  height: 80vh;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc((21 / 29.7) * 80vh);
`;

const DownloadLink = styled.a`
  align-items: center;
  background: ${({ theme }) => theme.halfBaked};
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  left: calc((100% - 80vh * (21 / 29.7)) / 2);
  padding: .5rem .75rem;
  position: absolute;
  text-decoration: none;
  top: 5.5%;
  transform: translateY(-50%);
  transition: background 0.15s;
  &:hover { background: #68b9b3 }
  &:not(:last-child) { margin-right: .5rem; }
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.sanJuan};
  flex-basis: 50%;
  height: 100vh;
  position: relative;
`;

const noTimeout = [
  /\.motive/,
];

const PreviewPanel = () => {
  const prevBlobURL = useRef(null);
  const prevContent = useRef(null);
  const refreshTimeout = useRef(null);

  const [content] = useContext(ContentContext);

  const [blobURL, setBlobURL] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const windowHeight = useHeight();

  useEffect(() => {
    let didCancel = false;

    const buildAndSetBlob = async () => {
      const URL = await (buildBlob(content));
      if (!didCancel) { setBlobURL(URL); }
    };

    if (prevContent.current) {
      clearTimeout(refreshTimeout.current);

      const performActions = () => {
        refreshTimeout.current = null;
        buildAndSetBlob();
      };

      const differencePaths = difference(content, prevContent.current);
      const timeout = !differencePaths.some((path) => (
        noTimeout.some((regex) => regex.test(path))
      ));

      if (timeout) {
        refreshTimeout.current = setTimeout(() => {
          if (!didCancel) { performActions(); }
        }, 500);
      } else { performActions(); }
    } else { buildAndSetBlob(); }

    prevContent.current = content;

    return () => { didCancel = true; };
  }, [content]);

  useEffect(() => {
    if (prevBlobURL.current) {
      URL.revokeObjectURL(prevBlobURL.current);
    }
    prevBlobURL.current = blobURL;
  }, [blobURL]);

  const decrementPageNumber = () => {
    setPageNumber((value) => (value > 1 ? value - 1 : value));
  };

  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    setPageNumber((value) => (value > numPages ? 1 : value));
  };

  const incrementPageNumber = () => {
    setPageNumber((value) => (value < totalPages ? value + 1 : value));
  };

  return (
    <Wrapper>
      <DownloadLink download="Attestation.pdf" href={blobURL}>
        {/*<Icon src={CloudDownloadSVG} />*/}
        <span>Télécharger le PDF</span>
      </DownloadLink>
      <DocumentContainer>
        {blobURL && (
          <Document
            file={blobURL}
            loading={null}
            onLoadSuccess={handleLoadSuccess}
          >
            <Page
              height={windowHeight * 0.8}
              loading={null}
              pageNumber={pageNumber}
            />
          </Document>
        )}
      </DocumentContainer>
      {blobURL && (
        <PageNavigation
          decrementPageNumber={decrementPageNumber}
          incrementPageNumber={incrementPageNumber}
          totalPages={totalPages}
          pageNumber={pageNumber}
        />
      )}
    </Wrapper>
  );
};

export default PreviewPanel;
