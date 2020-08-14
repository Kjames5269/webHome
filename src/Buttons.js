import styled, { css } from "styled-components";

const TabCompDiv = styled.div`
  padding-left: 5px;
  overflow: auto;
`;

const Button = styled.button`
  ${props =>
    props.primary &&
    props.secondary &&
    props.tertiary &&
    props.quaternary &&
    css`
      transition: background-image 0.5s, background-color 0.5s;
      background-color: rgba(${props.primary.join(",")}, 0.5);
      background-image: linear-gradient(
        to bottom,
        rgba(${props.secondary.join(",")}, 0.2),
        rgba(${props.secondary.join(",")}, 0.5),
        rgba(${props.secondary.join(",")}, 0.2)
      );

      :focus,
      :hover {
        background-color: rgba(${props.quaternary.join(",")}, 1);
        background-image: linear-gradient(
          to bottom,
          rgba(${props.quaternary.join(",")}, 1),
          rgba(160, 180, 160, 0.6),
          rgba(${props.quaternary.join(",")}, 1)
        );
        outline: none;
      }
      border-left: 4px solid rgb(${props.tertiary.join(",")});
    `}

  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-right: none;
  border-radius: inherit;

  color: rgba(255, 255, 255, 0.85);
  text-shadow: -1px 0 rgba(40, 40, 40, 0.8), 0 1px rgba(40, 40, 40, 0.8);
  font-size: 18px;

  white-space: nowrap;

  float: left;
  margin: 2px 2px 0px 2px;
  padding: 8px 12px 8px 12px;
  ${props =>
    props.numPerRow &&
    css`
      width: calc(${100 / props.numPerRow}% - 4px);
    `}
  overflow: hidden;
  cursor: pointer;
`;

export { TabCompDiv, Button };
