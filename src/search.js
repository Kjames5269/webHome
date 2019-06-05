import React from 'react'
import styled from 'styled-components'
import Aliases from './aliases.js'

class Search extends React.Component {
    state = { input: "", search: "" };

    handleSubmit = (e) => {

        if(Aliases[this.state.input]) {
            window.location.href = Aliases[this.state.input]
            e.preventDefault();
            return false;
        }

        return true;
    }

    render() {
        return (
            <SearchBar action="https://www.duckduckgo.com" onSubmit={this.handleSubmit}>
                <Prompt>{this.props.prompt}</Prompt>
                <Input id='searchbar' type='text'
                    value={this.state.input} name="q" autoComplete='off'
                    onChange={ event => this.setState({ input: event.target.value })}
                    autoFocus />
            </SearchBar>
        )
    }
}

const Prompt = styled.p`
    width: 15px;
    padding: 11px;
    padding-right: 5px;
    padding-left: 10px;
    display: inline-block;
    margin: 0px;
    background-color: inherit;
    font-size: 16px;
    float:left;
    opacity: inherit;
`

const SearchBar = styled.form`
    width: 100%;
    height: 38px;
    opacity: .70;
    margin-right: 0px;
    background-color: white;
    border: solid black 3px;
`

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
    float:left;
    font-size: 18px;
`

export default Search;