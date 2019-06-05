import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Clock from 'react-live-clock'
import BackgroundPic from '../resources/TheArcticCruise.png'
import GithubLogo from '../resources/GitHub-Mark-120px-plus.png'
import AnimemesLogo from '../resources/Animemes.png'
import { withRouter } from 'react-router-dom'

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${BackgroundPic});
`

const Banner = styled.nav`
    background: magenta;
    height: 100px;
    font-size: 64px;
    letter-spacing: 4px;
    border-bottom: solid black 3px;
    border-top: solid black 3px;
    opacity: .8;
    width: 100%;
`

const Center = styled.div`
    width: 45%;
    margin:auto;
    margin-top: 100px;
    /* bring your own prefixes */
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

const IconPic = styled.img`
    border-radius: 10px;
    float: right;
    height: 80px;
    width: 80px
    margin: 10px;
    margin-left: 0px;
`

class Icon extends React.Component {
    render() {
        return (
            <a href={this.props.href}>
                <IconPic src={this.props.pic} alt={this.props.alt}/>
            </a>
        )
    }
}

class InputClas extends React.Component {
    state = { input: "", search: "" };

    handleSubmit = (e) => {

        var searchTerm = this.state.input;

        if(searchTerm === "foobar") {
            searchTerm = "but it was me."
        }

        this.setState({ input: this.state.input, search: searchTerm })
        return true;
    }

    render() {
        return (
            <SearchBar action="https://www.duckduckgo.com" onSubmit={this.handleSubmit}>
                <Prompt>{this.props.prompt}</Prompt>
                <Input id='searchbar' type='text'
                    value={this.state.input} autoComplete='off'
                    onChange={ event => this.setState({ input: event.target.value })}
                    autoFocus />
                <Input type='hidden' name="q" value={this.state.search}/>
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

const arr = [
    { url: "https://www.github.com", img: GithubLogo, alt: "github" },
    { url: "https://www.reddit.com/r/Animemes/", img: AnimemesLogo, alt: "Animemes" }
]

ReactDOM.render(
        <Background>
            <Banner>
                <Clock format={'h:mm'} ticking={true} timezone={'US/Arizona'}
                style={{color:"white", float: "right", marginTop: "15px", marginRight: "25px"}} />
                {
                    arr.map((obj, index) => 
                        <Icon href={obj.url} pic={obj.img} alt={obj.alt}/>
                    )
                }
            </Banner>
            <Center>
                <InputClas prompt=">"/>
            </Center>
        </Background>

    , document.getElementById('iamroot'))