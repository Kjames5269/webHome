import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import BackgroundPic from "../resources/TheArcticCruise.png";
import Clock from "react-live-clock";
import GithubLogo from "../resources/GitHub-Mark-120px-plus.png";
import AnimemesLogo from "../resources/Animemes.png";
import water from "../resources/water.jpg";

import Banner from "./banner.js";
import AutoCompleteForm from "./autocomplete-form.js";
import Aliases from "./aliases.js";
import Icon from "./icon.js";
import { Button } from "./buttons"

const MAX_SCREEN_SIZE = 1150;
//  The rate at which things move when above the max screen size
const DIMINISH_RATE=0.55;
const MIN_SEARCH_BAR = 350;

//  The size of the screen, the light max of the screen, the rate at which the elemets get moved
//  once the screen hits max. 
const widthGrowthFunc = (screenSize, { maxSize = MAX_SCREEN_SIZE, diminishRate = DIMINISH_RATE } = {}) => {
    return (screenSize <= maxSize) ? undefined : (screenSize - maxSize) * diminishRate;
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundPic});
  ${props => props.leftOffset && css`
    background-position: left ${props.leftOffset}px top 0px;
    `}
`;

const calculateBackgroundOffset = (screenSize) => {
    //  Inversely proportional to screen size.
    //  2048 × 1024 is the size of the background picture
    //  1680 is the resolution of the computer.
    //  I wonder if there's a better way to get this...
    //  TODO
    return -1 * (2048 / screenSize * 150) + (2048 / 1680 * 150);
}

const goToHref = (href) => {
  window.location.href = href;
}

const Center = styled.div`

width: 45%;
${props => props.maxWidth && props.width && css`
@media (min-width: ${props.maxWidth}px) {
    width: calc(${props.maxWidth + props.width}px * 0.45);
}
`}
  
  @media (max-width: ${MIN_SEARCH_BAR / 0.45}px) {
      width: ${MIN_SEARCH_BAR}px;
  }

  margin: auto;
  margin-top: 100px;
  /* bring your own prefixes */
`;

const BottomDiv = styled.div`
  position: fixed;
  bottom: 0px;
  margin: 0px;
  display: inline-block;
  border-radius: 0px 5px 0px 0px;
`;

const logos = [
  { href: "https://www.github.com", img: GithubLogo, alt: "github" },
  {
    href: "https://www.reddit.com/r/Animemes/",
    img: AnimemesLogo,
    alt: "Animemes"
  }
];

const App = props => {
   
    const [screenSize, setScreenSize] = useState(window.innerWidth)
    useEffect(() => {
        const handleWindowResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    });

  return (
  <Background leftOffset={calculateBackgroundOffset(screenSize)}>
    <Banner url={water} color={[40, 20, 75]} rightPadding={widthGrowthFunc(screenSize,{diminishRate: 0.03})} >
      <Clock
        format={"h:mm"}
        ticking={true}
        timezone={"US/Arizona"}
        style={{
          color: "white",
          float: "right",
          marginTop: "15px",
          marginRight: "25px"
        }}
      />

      {logos.map((obj, index) => (
        <Icon {...obj} key={index} marginWidth={widthGrowthFunc(screenSize,{diminishRate: 0.03})}/>
      ))}
    </Banner>
    <Center maxWidth={MAX_SCREEN_SIZE} width={widthGrowthFunc(screenSize)}>
      <AutoCompleteForm prompt=">" dict={Aliases} />
    </Center>
    <BottomDiv>
      <Button style={{margin: 0 + 'px'}} onClick={goToHref.bind(this, "https://hatintime.com/")}>A Hat in Time</Button>
    </BottomDiv>
  </Background>

)};

export default App;
