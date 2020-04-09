/* eslint-disable prefer-arrow-callback */

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Border = styled.span`
  background: ${({ theme }) => theme.sanJuan};
  border-radius: 0 0 3px 3px;
  bottom: 0;
  height: 3px;
  left: 0;
  position: absolute;
  transition: width 0.3s;
  width: 0;
`;

const Input = styled.input`
  background: ${({ theme }) => theme.ziggurat};
  border: none;
  border-radius: 3px;
  caret-color: ${({ theme }) => theme.tundora};
  font-weight: 500;
  height: 2.5rem;
  padding: 0 1rem;
  width: 100%;
  &:focus {
    outline: none;
    & ~ ${Border} { width: 100%; }
  }
  &::placeholder { color: white; }
`;

const Label = styled.label`
  display: block;
  margin-bottom: .5rem;
`;

const Wrapper = styled.div`
  position: relative;
`;

const LabelledInput = (props) => {
  const {
    field,
    label,
    onChange,
    placeholder,
    value,
  } = props;

  return (
    <Wrapper>
      <Label htmlFor={field}>{label}</Label>
      <Input
        data-field={field}
        id={field}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      <Border />
    </Wrapper>
  );
};

LabelledInput.defaultProps = { placeholder: undefined };

LabelledInput.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default LabelledInput;
