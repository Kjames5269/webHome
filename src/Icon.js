import styled, { css } from "styled-components";
import React from "react";

const IconPic = styled.img`
  border-radius: 10px;
  float: right;
  height: 80%;
  margin: 1vh 1vw
    ${props =>
      props.marginWidth &&
      css`
        margin: 1vh calc(${props.marginWidth}px + 1vw) 1vh 0px;
      `};
`;

const Icon = props => {
  return (
    <a href={props.href}>
      <IconPic
        src={props.img}
        alt={props.alt}
        marginWidth={props.marginWidth}
      />
    </a>
  );
};

export default Icon;
