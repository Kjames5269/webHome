import styled, { css } from "styled-components";

const Prompt = styled.p`
  width: 1.5vw;
  padding: 1vh 0 1vh 1.2vw;
  display: inline-block;
  margin: 0px;
  background-color: inherit;
  font-size: 2vh;
  float: left;
  opacity: inherit;
`;

const SearchBar = styled.form`
  width: 100%;
  height: 4.4vh;
  opacity: 0.7;
  margin-right: 0px;
  background-color: white;
  border: solid black 0.285vh;
`;

const Input = styled.input`
  font-family: monospace, monospace;
  border: none;
  height: calc(100% - 0.285vh);
  //  Padding 2vw, Prompt width 2vw
  width: ${props => props.length * 1.4 || 1.4}vh;
  max-width: calc(100% - 3.9vw);
  &:focus {
    outline: none;
  }
  background-color: inherit;
  opacity: inherit;
  float: left;
  font-size: 2.25vh;

  ${props => props.match && css``}
`;

const ShadowInput = styled.pre`
  font-family: monospace, monospace;
  border: none;
  height: calc(100% - 1.085vh);
  padding-top: 0.8vh;
  //  Padding .4vw, Prompt width 2vw
  width: calc(100% - ${props => props.length * 1.4 || 1.4}vh - 3.9vw);
  color: rgb(50, 50, 120);
  &:focus {
    outline: none;
  }
  background-color: inherit;
  opacity: inherit;
  float: left;
  font-size: 2.25vh;
  display: inline-block;
  padding: 0.8vh 0 2px 0;
  margin: 0px;
  cursor: text;
`;

export { Prompt, SearchBar, Input, ShadowInput };
