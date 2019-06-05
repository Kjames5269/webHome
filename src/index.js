import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import BackgroundPic from '../resources/TheArcticCruise.png'
import Clock from 'react-live-clock'
import GithubLogo from '../resources/GitHub-Mark-120px-plus.png'
import AnimemesLogo from '../resources/Animemes.png'

import Banner from './banner.js'
import Search from './search.js'
import Icon from './icon.js'

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${BackgroundPic});
`

const Center = styled.div`
    width: 45%;
    margin:auto;
    margin-top: 100px;
    /* bring your own prefixes */
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
                <Search prompt=">"/>
            </Center>
        </Background>

    , document.getElementById('iamroot'))