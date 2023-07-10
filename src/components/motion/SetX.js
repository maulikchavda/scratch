import React, { useState } from "react";
import Input from "../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { setMovementX } from "../../redux/characterSlice";

const SetX = ({ id }) => {
  const [moveX, setMoveX] = useState(0);
  const character = useSelector((state) => state.chars);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setMoveX(parseInt(e.target.value));
  };

  const handleClick = () => {
    const element = document.getElementById(character.activeCharacter);
    const currentChar = character.characters.find(
      (char) => char.id === character.activeCharacter,
    );
    element.style.position = "relative";
    if (currentChar) {
      element.style.left = currentChar.moveX + moveX + "px";
      dispatch(
        setMovementX({
          id: character.activeCharacter,
          value: moveX,
        }),
      );
    }
  };

  return (
    <div id={id} className="mt-4" onClick={() => handleClick()}>
      <Input
        type="number"
        prependLabel="Set X"
        value={moveX}
        id="setX"
        category="motion"
        onChange={handleChange}
      />
    </div>
  );
};

export default SetX;
