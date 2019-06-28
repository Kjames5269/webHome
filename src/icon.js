import styled, {css} from "styled-components";
import React from "react";

const IconPic = styled.img`
    border-radius: 10px;
    float: right;
    height: 80px;
    width: 80px
    margin: 10px 10px 10px 0px;
    ${props => props.marginWidth && css`
      margin: 10px ${props.marginWidth + 10}px 10px 0px;
    `}
`;

const Icon = props => {
  return (
    <a href={props.href}>
      <IconPic src={props.img} alt={props.alt} marginWidth={props.marginWidth} />
    </a>
  );
}

export default Icon;
