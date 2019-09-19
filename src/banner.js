import styled, { css } from "styled-components";

const Banner = styled.nav`
  ${props =>
    props.url &&
    props.primary &&
    css`
      background: rgb(${props.primary.join(",")});
      background-image: radial-gradient(ellipse at bottom, rgba(${props.secondary.join(
        ","
      )},.7), rgba(${props.primary.join(",")}, .8)), url('${
      props.url
    }'); background-repeat: repeat;
      opacity: 0.75;
      transition: background-image 1.5s;
    `}
  ${props =>
    !props.url &&
    props.primary &&
    css`
      background: rgba(${props.primary.join(",")}, 0.5); // #9b37e8
      transition: background 1.5s;
      opacity: 0.85;
    `}

  width: 100%;
  ${props =>
    props.rightPadding &&
    css`
      width: calc(100% - ${props.rightPadding}px);
      padding-right: ${props.rightPadding}px;
    `}
  height: 12vh;
  font-size: 7.5vh;
  letter-spacing: 0.4vw;
  border-bottom: solid black 0.25vh;
  border-top: solid black 0.25vh;
`;

export default Banner;
