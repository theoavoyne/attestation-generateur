import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import styled, { ThemeProvider } from 'styled-components';

import contentReducer from '../reducers/content';
import defaultContent from '../defaults/content';
import difference from '../utils/difference';
import setToday from '../utils/setToday';
import theme from '../config/theme';
import useWidth from '../hooks/useWidth';

import ContentContext from '../contexts/Content';
import EditPanel from './EditPanel'; //
import PreviewPanel from './PreviewPanel'; //

const Wrapper = styled.div`
  display: flex;
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
        </Wrapper>
      </ThemeProvider>
    </ContentContext.Provider>
  );
};

export default App;
