import styled, { css } from "styled-components";

const Prompt = styled.p`
  width: 15px;
  padding: 11px;
  padding-right: 5px;
  padding-left: 10px;
  display: inline-block;
  margin: 0px;
  background-color: inherit;
  font-size: 16px;
  float: left;
  opacity: inherit;
`;

const SearchBar = styled.form`
  width: 100%;
  height: 38px;
  opacity: 0.7;
  margin-right: 0px;
  background-color: white;
  border: solid black 3px;
`;

const Input = styled.input`
  font-family: monospace, monospace;
  border: none;
  height: inherit;
  //  Padding 2, Prompt width 30
  width: ${props => props.length * 11 || 11}px;
  &:focus {
    outline: none;
  }
  background-color: inherit;
  opacity: inherit;
  float: left;
  font-size: 18px;

  ${props => props.match && css``}
`;

const ShadowInput = styled.pre`
  font-family: monospace, monospace;
  border: none;
  height: calc(100% - 10px);
  //  Padding 2, Prompt width 30
  width: calc(100% - ${props => (props.length * 11 || 11) + 34}px);
  color: rgb(30, 30, 90);
  &:focus {
    outline: none;
  }
  background-color: inherit;
  opacity: inherit;
  float: left;
  font-size: 18px;
  display: inline-block;
  padding: 10px 1px 2px 1px;
  margin: 0px;
  cursor: text;
`;

export { Prompt, SearchBar, Input, ShadowInput };
