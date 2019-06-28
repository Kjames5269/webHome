import styled, { css } from 'styled-components'

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
  border: none;
  height: inherit;
  //  Padding 2, Prompt width 30
  width: calc(100% - 32px);
  &:focus {
    outline: none;
  }
  background-color: inherit;
  opacity: inherit;
  float: left;
  font-size: 18px;

  ${props =>
    props.match &&
    css`
      text-decoration: underline;
    `}
`;

export { Prompt, SearchBar, Input };