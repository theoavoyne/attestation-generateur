import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import styled, { ThemeProvider, keyframes } from 'styled-components';
import SVG from 'react-inlinesvg';

import contentReducer from '../reducers/content';
import defaultContent from '../defaults/content';
import difference from '../utils/difference';
import setToday from '../utils/setToday';
import theme from '../config/theme';
import useWidth from '../hooks/useWidth';

import ContentContext from '../contexts/Content';
import EditPanel from './EditPanel';
import FileSVG from '../static/icons/file.svg';
import MobilePreview from './MobilePreview';
import PreviewPanel from './PreviewPanel';

const fadeOut = keyframes`
  to { opacity: 0; }
`;

const reduce = keyframes`
  to { width: 4rem; }
`;

const FileIcon = styled(SVG)`
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
`;

const MobilePreviewButton = styled.button`
  animation-delay: 2s;
  animation-duration: .5s;
  animation-fill-mode: forwards;
  animation-name: ${reduce};
  background: ${theme.sanJuan};
  border: none;
  border-radius: 2rem;
  bottom: 1.5rem;
  color: white;
  height: 4rem;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: 1.5rem;
  width: 19rem;
`;

const MobilePreviewText = styled.span`
  animation-delay: 2s;
  animation-duration: .2s;
  animation-fill-mode: forwards;
  animation-name: ${fadeOut};
  opacity: 1;
  position: absolute;
  right: 4rem;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const noTimeout = [
  /\.motive/,
];

let savedContent = localStorage.getItem('content');
if (savedContent) { savedContent = JSON.parse(savedContent); }

const App = () => {
  const prevContent = useRef();

  const contentPair = useReducer(
    contentReducer,
    setToday(savedContent || defaultContent()),
  );

  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [storeTimeout, setStoreTimeout] = useState(null);

  const device = useWidth() > 992 ? 'desktop' : 'mobile';

  const [content] = contentPair;

  useEffect(() => {
    let didCancel = false;

    if (prevContent.current) {
      clearTimeout(storeTimeout);

      const performActions = () => {
        setStoreTimeout(null);
        localStorage.setItem('content', JSON.stringify(content));
      };

      const differencePaths = difference(content, prevContent.current);
      const timeout = !differencePaths.some((path) => (
        noTimeout.some((regex) => regex.test(path))
      ));

      if (timeout) {
        setStoreTimeout(setTimeout(() => {
          if (!didCancel) { performActions(); }
        }, 1500));
      } else { performActions(); }
    }

    prevContent.current = content;

    return () => { didCancel = true; };
  }, [content]);

  return (
    <ContentContext.Provider value={contentPair}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <EditPanel />
          {device === 'desktop' && <PreviewPanel />}
          {device === 'mobile' && (
            <MobilePreviewButton onClick={() => setShowMobilePreview(true)}>
              <MobilePreviewText>Aperçu & Téléchargement</MobilePreviewText>
              <FileIcon src={FileSVG} />
            </MobilePreviewButton>
          )}
          {showMobilePreview && device === 'mobile' && (
            <MobilePreview close={() => setShowMobilePreview(false)} />
          )}
        </Wrapper>
      </ThemeProvider>
    </ContentContext.Provider>
  );
};

export default App;
