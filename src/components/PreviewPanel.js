import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.sanJuan};
  flex-basis: 50%;
  height: 100vh;
`;

const PreviewPanel = () => (
  <Wrapper>
    <p>PreviewPanel</p>
  </Wrapper>
);

export default PreviewPanel;
