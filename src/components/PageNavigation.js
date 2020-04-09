import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import ChevronLeftSVG from '../static/icons/chevron-left.svg';
import ChevronRightSVG from '../static/icons/chevron-right.svg';

const Button = styled.button.attrs(() => ({
  onMouseDown: (e) => e.preventDefault(),
}))`
  background: none;
  border: none;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'auto')};
  opacity: ${({ isActive }) => (isActive ? '1' : '0.2')};
  padding: 0;
  margin: 0 .75rem;
`;

const Icon = styled(SVG)`
  color: white;
  height: 1.25rem;
`;

const Slash = styled.div`
  font-weight: 500;
  margin: 0 .5rem;
`;

const Wrapper = styled.div`
  align-items: center;
  color: white;
  display: flex;
  left: 50%;
  position: absolute;
  bottom: 5%;
  transform: translateX(-50%);
`;

const PageNavigation = (props) => {
  const {
    decrementPageNumber,
    incrementPageNumber,
    pageNumber,
    totalPages,
  } = props;

  if (!totalPages) { return null; }

  return (
    <Wrapper>
      <Button isActive={pageNumber > 1} onClick={decrementPageNumber}>
        <Icon src={ChevronLeftSVG} />
      </Button>
      <div>{pageNumber}</div>
      <Slash>/</Slash>
      <div>{totalPages}</div>
      <Button isActive={pageNumber < totalPages} onClick={incrementPageNumber}>
        <Icon src={ChevronRightSVG} />
      </Button>
    </Wrapper>
  );
};

PageNavigation.propTypes = {
  decrementPageNumber: PropTypes.func.isRequired,
  incrementPageNumber: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PageNavigation;
