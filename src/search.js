import React from 'react'
import styled, {css} from 'styled-components'
import Aliases from './aliases.js'

class Search extends React.Component {
    state = { input: "", match: false };

    handleSubmit = (e) => {
        if(this.state.match) {
            window.location.href = this.state.match
            e.preventDefault();
            return false;
        }
        return true;
    }

    handleChange = (e) => {
        this.setState({ 
            input: e.target.value,
            match: Aliases[e.target.value] 
        })
    }

    render() {
        return (
            <SearchBar action="https://www.duckduckgo.com" onSubmit={this.handleSubmit}>
                <Prompt>{this.props.prompt}</Prompt>
                <Input id='searchbar' type='text'
                    value={this.state.input} name="q" autoComplete='off'
                    onChange={ this.handleChange }
                    autoFocus match={this.state.match} />
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

    ${props => props.match && css`
        text-decoration: underline;
    `}
`

export default Search;