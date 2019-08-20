import TheArcticCruise from "../resources/TheArcticCruise.png";
import AlpineSkyline from "../resources/AlpineSkyline.png";
import TheBigParade from "../resources/TheBigParade.png";
import Va11halla from "../resources/Va11halla.png";
import YourName01 from "../resources/YourName01.jpg";
import YourName02 from "../resources/YourName02.jpg";
import snowing from "../resources/snowing.png";
import yuruCamp from "../resources/YuruCamp.png";
import nightPort from "../resources/nightPort.jpg";

const bgContextList = {
  //  primary: This should be used as the main color
  //  secondary: This should be used to complement the main
  //    on smaller components like buttons
  //  tertiary: This should be used as an accent color
  //  quaternary: This should be used for hover effects

  blue: {
    primary: [40, 20, 75],
    secondary: [65, 65, 200],
    tertiary: [255, 165, 0],
    quaternary: [30, 101, 200]
  },
  red: {
    primary: [135, 70, 10],
    secondary: [180, 80, 125],
    tertiary: [80, 170, 200],
    quaternary: [200, 101, 30]
  },
  white: {
    primary: [40, 40, 50],
    secondary: [60, 70, 60],
    tertiary: [255, 255, 255],
    quaternary: [60, 75, 60]
  },
  purple: {
    primary: [100, 0, 90],
    secondary: [100, 80, 200],
    tertiary: [20, 185, 165],
    quaternary: [10, 155, 130]
  },
  yellow: {
    primary: [40, 40, 0],
    secondary: [200, 198, 0],
    tertiary: [0, 195, 188],
    quaternary: [50, 60, 0]
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
    src: Va11halla,
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
  }
];

function getPos() {
  return Math.floor(Math.random() * backgrounds.length);
}

export default function() {
  const toReturn = new Image();

  const randomEle = backgrounds[getPos()];
  toReturn.src = randomEle.src;

  return { image: toReturn, ...randomEle };
}
