import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";

import Clock from "react-live-clock";
import GithubLogo from "../resources/GitHub-Mark-120px-plus.png";
import AnimemesLogo from "../resources/Animemes.png";
import water from "../resources/water.jpg";

import Banner from "./Banner.js";
import AutoCompleteForm from "./AutoCompleteForm.js";
import Aliases from "./Aliases.js";
import Icon from "./Icon.js";
import { Button } from "./Buttons.js";
import Theme from "./Theme.js";

const MAX_SCREEN_SIZE = 1150;
//  The rate at which things move when above the max screen size
const DIMINISH_RATE = 0.55;
const MIN_SEARCH_BAR = 350;

//  The size of the screen, the light max of the screen, the rate at which the elemets get moved
//  once the screen hits max.
const widthGrowthFunc = (
  screenSize,
  { maxSize = MAX_SCREEN_SIZE, diminishRate = DIMINISH_RATE } = {}
) => {
  return screenSize <= maxSize
    ? undefined
    : (screenSize - maxSize) * diminishRate;
};

//  Props: offset: { left, top }
const Background = styled.div`
  width: 100%;
  height: 100%;
  ${props =>
    props.backgroundOffset &&
    props.backgroundSrc &&
    css`
      background-repeat: no-repeat;
      background-image: url(${props.backgroundSrc});
      background-position: left ${props.backgroundOffset.left}px top ${props.backgroundOffset.top}px;
    `}
`;

const calculateBackgroundOffset = (screenSize, backgroundSize) => {
  //  Inversely proportional to screen size.

  //  TODO make this better
  if (backgroundSize.naturalWidth == 0 || backgroundSize.naturalHeight == 0) {
    return { left: 0, top: 0 };
  }

  return {
    left: 150 - (backgroundSize.naturalWidth / screenSize.width) * 150,
    top: 150 - (backgroundSize.naturalHeight / screenSize.height) * 150
  };
};

const goToHref = href => {
  window.location.href = href;
};

const Center = styled.div`

width: 45%;
${props =>
  props.maxWidth &&
  props.width &&
  css`
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

//  APP

const App = props => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect(() => {
    const handleWindowResize = () =>
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const theme = useContext(Theme);

  return (
    <Theme.Provider value={theme}>
      <Background
        backgroundSrc={theme.image.src}
        backgroundOffset={calculateBackgroundOffset(screenSize, theme.image)}
      >
        <Banner
          url={water}
          {...theme.colors}
          rightPadding={widthGrowthFunc(screenSize.width, {
            diminishRate: 0.03
          })}
        >
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
            <Icon
              {...obj}
              key={index}
              marginWidth={widthGrowthFunc(screenSize.width, {
                diminishRate: 0.03
              })}
            />
          ))}
        </Banner>
        <Center
          maxWidth={MAX_SCREEN_SIZE}
          width={widthGrowthFunc(screenSize.width)}
        >
          <AutoCompleteForm prompt=">" dict={Aliases} />
        </Center>
        <BottomDiv>
          <Button
            {...theme.colors}
            style={{ margin: 0 + "px" }}
            onClick={goToHref.bind(this, theme.url)}
          >
            {theme.sauce}
          </Button>
        </BottomDiv>
      </Background>
    </Theme.Provider>
  );
};

export default App;
