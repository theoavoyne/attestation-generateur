import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Document, Page } from 'react-pdf/dist/entry.webpack';
import styled from 'styled-components';

import buildBlob from '../utils/buildBlob';
import useHeight from '../hooks/useHeight';

import PageNavigation from './PageNavigation';
import ContentContext from '../contexts/Content';

const Button = styled.button`
  background: none;
  color: white;
  border: none;
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
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const windowHeight = useHeight();

  return (
    <Wrapper>
      <Controls>
        <Button onClick={close}>Close</Button>
      </Controls>
      <DocumentContainer />
    </Wrapper>
  );
};

export default PreviewPanel;
