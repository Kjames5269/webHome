import styled, { css } from "styled-components";

const Banner = styled.nav`
  ${props =>
    props.url &&
    props.primary &&
    css`
      background: blue;
      background-image: radial-gradient(rgba(${props.primary.join(
        ","
      )},.6), rgba(${props.primary.join(",")}, .9)), url('${
      props.url
    }'); background-repeat: repeat;
      opacity: 0.75;
    `}
  ${props =>
    !props.url &&
    props.primary &&
    css`
      background: rgba(${props.primary.join(",")}, 0.5); // #9b37e8
      opacity: 0.85;
    `}

  width: 100%;
  ${props =>
    props.rightPadding &&
    css`
      width: calc(100% - ${props.rightPadding}px);
      padding-right: ${props.rightPadding}px;
    `}
  height: 100px;
  font-size: 64px;
  letter-spacing: 4px;
  border-bottom: solid black 3px;
  border-top: solid black 3px;
`;

export default Banner;
