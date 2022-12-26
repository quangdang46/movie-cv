import React from "react";
import styled from "styled-components";


function Card(props) {
  return (
    <div {...props} className={`${props.className}`}>
      {props.children}
    </div>
  );
}

export default styled(Card)`
  text-align: left;
  padding: 24px;
  background: #1d252c;
  border-radius: 8px;
`;
