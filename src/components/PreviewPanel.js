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

const Wrapper = styled.div`
  background: ${({ theme }) => theme.sanJuan};
  flex-basis: 50%;
  height: 100vh;
  position: relative;
`;

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
        }, 1500);
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
