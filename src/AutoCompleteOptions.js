import React, { useState, useContext } from "react";
import { ThemeContext } from "./Theme";
import { Button, TabCompDiv } from "./Buttons";
import {
  KEY_TAB,
  KEY_UP,
  KEY_DOWN,
  KEY_RIGHT,
  KEY_LEFT,
  KEY_ENTER,
  KEY_RETURN,
  KEY_SHIFT
} from "keycode-js";

//  props:
//  onClick, onKeyDown, numPerRow, onRollover, names
const AutoCompleteOptions = props => {
  const [currentVal, setCurrentVal] = useState(0);
  const { names, onKeyDown, numPerRow, onRollover, onSelect } = props;

  const theme = useContext(ThemeContext);

  const navLeft = num => {
    const currVal = currentVal;
    const newVal = (currentVal - num + names.length) % names.length;
    setCurrentVal(newVal);
    return newVal >= currVal;
  };

  const navRight = num => {
    const currVal = currentVal;
    const newVal = (currentVal + num) % names.length;
    setCurrentVal(newVal);
    return newVal <= currVal;
  };

  const handleKeyDown = callback => e => {
    switch (e.keyCode) {
      case KEY_TAB:
        if (e.shiftKey) {
          e.preventDefault();
          navLeft(1);
        } else {
          if (navRight(1)) onRollover();
          else e.preventDefault();
        }
        break;
      case KEY_RIGHT:
        navRight(1);
        break;
      case KEY_LEFT:
        navLeft(1);
        break;
      case KEY_DOWN:
        navRight(numPerRow);
        break;
      case KEY_UP:
        navLeft(numPerRow);
        break;
      case KEY_RETURN:
      case KEY_ENTER:
        onSelect(e);
        break;
      case KEY_SHIFT:
        break;
      default:
        callback(e);
    }
  };

  let options = names.map((e, f) => (
    <Button
      key={e}
      onClick={onSelect}
      numPerRow={numPerRow}
      onKeyDown={handleKeyDown(onKeyDown)}
      ref={Button => Button && f == currentVal && Button.focus()}
      {...theme.colors}
    >
      {e}
    </Button>
  ));

  return (
    <TabCompDiv
      yLength={options ? Math.ceil(options.length / numPerRow) : options}
    >
      {options}
    </TabCompDiv>
  );
};

export { AutoCompleteOptions };
