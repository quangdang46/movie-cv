import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Field = ({ children }) => {
  return <FieldStyles>{children}</FieldStyles>;
};
Field.propTypes = {
  children: PropTypes.node,
};

export default Field;
