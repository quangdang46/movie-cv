import React from "react";
import styled from "styled-components";
const LabelStyles = styled.label`
  color: white;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
