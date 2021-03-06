import styled, { css } from "styled-components";
import React, { useState } from "react";

import TheArcticCruise from "../resources/TheArcticCruise.png";
import AlpineSkyline from "../resources/AlpineSkyline.png";
import TheBigParade from "../resources/TheBigParade.png";
import Va11halla01 from "../resources/Va11halla.png";
import YourName01 from "../resources/YourName01.jpg";
import YourName02 from "../resources/YourName02.jpg";
import snowing from "../resources/snowing.png";
import yuruCamp from "../resources/YuruCamp.png";
import nightPort from "../resources/nightPort.jpg";
import MadeInAbyss4 from "../resources/MadeInAbyss4thLayer.jpg";
import HexOfStarrySky from "../resources/HexOfStarrySky.jpg";
import Ghibli from "../resources/Ghibli.jpg";
import WayBack from "../resources/wayback.jpg";
import quietNight from "../resources/quietNight.jpg";
import noTitle from "../resources/no title.jpg";
import Va11halla02 from "../resources/Va11halla02.png";

const bgContextList = {
  //  primary: This should be used as the main color
  //  secondary: This should be used to complement the main
  //    on smaller components like buttons
  //  tertiary: This should be used as an accent color
  //  quaternary: This should be used for hover effects

  blue: {
    primary: [40, 20, 75],
    secondary: [130, 130, 255],
    tertiary: [255, 165, 0],
    quaternary: [30, 101, 200]
  },
  red: {
    primary: [135, 70, 10],
    secondary: [255, 160, 255],
    tertiary: [80, 170, 200],
    quaternary: [200, 101, 30]
  },
  white: {
    primary: [40, 40, 50],
    secondary: [180, 200, 180],
    tertiary: [255, 255, 255],
    quaternary: [60, 75, 60]
  },
  purple: {
    primary: [100, 0, 90],
    secondary: [200, 160, 255],
    tertiary: [20, 185, 165],
    quaternary: [10, 155, 130]
  },
  yellow: {
    primary: [230, 100, 0],
    secondary: [255, 224, 0],
    tertiary: [255, 125, 0],
    quaternary: [255, 140, 0]
  },
  green: {
    primary: [0, 80, 80],
    secondary: [0, 255, 160],
    tertiary: [30, 230, 180],
    quaternary: [30, 150, 170]
  },
  black: {
    primary: [25, 25, 25],
    secondary: [25, 25, 25],
    tertiary: [220, 235, 220],
    quaternary: [55, 55, 55]
  }
};

const backgrounds = [
  {
    src: TheArcticCruise,
    sauce: "A Hat in Time",
    url: "https://hatintime.com/",
    colors: bgContextList.blue
  },
  {
    src: AlpineSkyline,
    sauce: "A Hat in Time",
    url: "https://hatintime.com/",
    colors: bgContextList.white
  },
  {
    src: TheBigParade,
    sauce: "A Hat in Time",
    url: "https://hatintime.com/",
    colors: bgContextList.blue
  },
  {
    src: Va11halla01,
    sauce: "VA-11 HALL-A",
    url: "https://www.deviantart.com/ex-trident/art/Va-11-Hall-A-702530927",
    colors: bgContextList.blue
  },
  {
    src: YourName01,
    sauce: "Your Name",
    url: "https://www.imdb.com/title/tt5311514/",
    colors: bgContextList.blue
  },
  {
    src: YourName02,
    sauce: "Your Name",
    url: "https://www.imdb.com/title/tt5311514/",
    colors: bgContextList.red
  },
  {
    src: snowing,
    sauce: "Oregairu",
    url:
      "https://www.pixiv.net/member_illust.php?illust_id=49831005&mode=medium",
    colors: bgContextList.white
  },
  {
    src: yuruCamp,
    sauce: "Yuru Camp",
    url: "https://www.zerochan.net/2554659",
    colors: bgContextList.white
  },
  {
    src: nightPort,
    sauce: "夜間港",
    url:
      "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=74324801",
    colors: bgContextList.purple
  },
  {
    src: MadeInAbyss4,
    sauce: "Made in Abyss",
    url:
      "https://www.deviantart.com/erikshoemaker/art/Goblet-of-Giants-724326305",
    colors: bgContextList.green
  },
  {
    src: HexOfStarrySky,
    sauce: "星空の16進数",
    url: "https://www.pixiv.net/en/artworks/69460730",
    colors: bgContextList.white
  },
  {
    src: Ghibli,
    sauce: "ジブリ飲み",
    url: "https://www.pixiv.net/en/artworks/24375241",
    colors: bgContextList.yellow
  },
  {
    src: WayBack,
    sauce: "Way Back",
    url: "https://www.pixiv.net/en/artworks/72567454",
    colors: bgContextList.red
  },
  {
    src: quietNight,
    sauce: "静かな夜",
    url: "https://www.pixiv.net/en/artworks/80062865",
    colors: bgContextList.green
  },
  {
    src: noTitle,
    sauce: "No Title",
    url: "https://www.pixiv.net/en/artworks/76668374",
    colors: bgContextList.white
  },
  {
    src: Va11halla02,
    sauce: "VA-11 HALL-A",
    url: "https://twitter.com/lanxcer/status/1332376282907037696?s=20",
    colors: bgContextList.black
  }
];

function getPos() {
  return Math.floor(Math.random() * backgrounds.length);
}

export default function() {
  return backgrounds[getPos()];
}

const calculateBackgroundOffset = (screenSize, image) => {
  //  Inversely proportional to screen size.

  return {
    //  If the screen size is the same as the img size, the offset will be 0
    left: 150 - (image.width / screenSize.width) * 150,
    top: 150 - (image.height / screenSize.height) * 150
  };
};

const scaleImage = (image, screenSize) => {
  if (image.naturalWidth == 0 || image.naturalHeight == 0) {
    return {
      width: image.naturalWidth,
      height: image.naturalHeight
    };
  }

  if (
    image.naturalHeight > screenSize.height &&
    image.naturalWidth > screenSize.width
  ) {
    return {
      width: image.naturalWidth,
      height: image.naturalHeight
    };
  }

  let width = image.naturalWidth;
  let height = image.naturalHeight;

  const aspectRatio = width / height;

  const widthDiff = screenSize.width - width;
  const heightDiff = screenSize.height - height;

  const potentialHeight = height + widthDiff * (1 / aspectRatio);
  const potentialWidth = width + heightDiff * aspectRatio;

  if (potentialHeight < screenSize.height) {
    return {
      width: potentialWidth,
      height: screenSize.height
    };
  } else {
    return {
      width: screenSize.width,
      height: potentialHeight
    };
  }
};

//  props: screenSize, children, src, colors
const Background = props => {
  const [isLoaded, setLoaded] = useState(false);
  const { children, screenSize, src, colors } = props;
  const image = new Image();
  image.src = src;

  let propsToPass = isLoaded
    ? {
        backgroundOffset: calculateBackgroundOffset(
          screenSize,
          scaleImage(image, screenSize)
        ),
        src: image.src,
        alt: "background image"
      }
    : null;

  image.onload = () => setLoaded(true);

  if (
    image.naturalHeight < screenSize.height ||
    image.naturalWidth < screenSize.width
  ) {
    propsToPass = {
      ...propsToPass,
      ...scaleImage(image, screenSize)
    };
  }

  return (
    <Wrap>
      <BackgroundContainer opacityProp={isLoaded ? 1 : 0}>
        <BackgroundImage {...propsToPass} />
      </BackgroundContainer>
      <BackgroundColor {...colors} opacityProp={isLoaded ? 0 : 1} />
      {children}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const BackgroundDiv = styled(Wrap)`
  ${props =>
    props.opacityProp != undefined &&
    css`
      opacity: ${props.opacityProp};
    `}
  z-index: -1;
`;

const BackgroundColor = styled(BackgroundDiv)`
  ${props =>
    props.primary &&
    css`
      background-color: rgba(${props.primary.join(",")}, 0.9);
    `}
  transition: opacity .5s;
`;

const BackgroundImage = styled.img`
  position: absolute;
  ${props =>
    props.backgroundOffset &&
    css`
      left: ${props.backgroundOffset.left}px
      top: ${props.backgroundOffset.top}px;
    `}
`;

const BackgroundContainer = styled(BackgroundDiv)`
  overflow: hidden;
  object-fit: contain;

  transition: opacity 0.35s;
`;

export { Background };
