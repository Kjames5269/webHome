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
  height: 40px;
  opacity: 0.7;
  margin-right: 0px;
  background-color: white;
  border: solid black 3px;
`;

const Input = styled.input`
  font-family: monospace, monospace;
  border: none;
  height: calc(100% - 2px);
  //  Padding 2, Prompt width 30
  width: ${props => props.length * 11 || 11}px;
  max-width: calc(100% - 34px - ${props => props.buffer * 11 || 0}px);
  &:focus {
    outline: none;
  }
  background-color: inherit;
  opacity: inherit;
  float: left;
  font-size: 18px;
`;

const ShadowInput = styled.pre`
  font-family: monospace, monospace;
  border: none;
  height: calc(100% - 14px);
  //  Padding 2, Prompt width 30
  width: calc(${props => props.length * 11 || 11}px);
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

const InputLabel = styled(ShadowInput)`
  //  Padding 2, Prompt width 30
  width: ${props => props.length * 11 || 11}px;
  color: #106c8a;
`;

export { Prompt, SearchBar, Input, ShadowInput, InputLabel };
