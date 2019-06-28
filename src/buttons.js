import styled, { css } from 'styled-components'

const TabCompDiv = styled.div`
padding-left: 5px;
overflow:auto; 
`;

const Button = styled.button`
background-color: rgba(80, 30, 200, 0.4);
background-image: linear-gradient(
  to bottom,
  rgba(80, 30, 200, 0.5),
  rgba(160, 180, 240, 0.7),
  rgba(80, 30, 200, 0.5)
);
border-top: 2px solid black;
border-bottom: 2px solid black;
border-right: none;
border-left: 4px solid orange;
border-radius: inherit;

color: rgba(255, 255, 255, .85);
font-size: 18px;

float: left;
margin: 2px 2px 0px 2px;
padding: 8px 12px 8px 12px;
${props => 
  props.numPerRow &&
  css`
      width: calc(${100 / props.numPerRow}% - 4px);
  `}
overflow: hidden;

:focus {
  background-color: rgba(80, 30, 200, 1);
  background-image: linear-gradient(
    to bottom,
    rgba(30, 101, 200, 1),
    rgba(160, 180, 160, 0.6),
    rgba(30, 101, 200, 1)
  );
  outline: none;
}`

export { TabCompDiv, Button };