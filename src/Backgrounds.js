import TheArcticCruise from "../resources/TheArcticCruise.png";
import AlpineSkyline from "../resources/AlpineSkyline.png";
import TheBigParade from "../resources/TheBigParade.png";
import Va11halla from "../resources/Va11halla.png";
import YourName from "../resources/YourName.jpg";
import img001 from "../resources/img001.jpg";

const bgContextList = {
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
    src: YourName,
    sauce: "Your Name",
    url: "https://www.imdb.com/title/tt5311514/",
    colors: bgContextList.blue
  },
  {
    src: img001,
    sauce: "Unknown",
    url: "",
    colors: bgContextList.red
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
