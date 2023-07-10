import React, { useState } from "react";
import Input from "../common/Input";
import { setMovementY } from "../../redux/characterSlice";
import { useDispatch, useSelector } from "react-redux";

const SetY = ({ id }) => {
  const character = useSelector((state) => state.chars);

  const dispatch = useDispatch();

  const [moveY, setMoveY] = useState(0);

  const handleChange = (e) => {
    setMoveY(parseInt(e.target.value));
  };

  const handleClick = () => {
    const element = document.getElementById(character.activeCharacter);
    const currentChar = character.characters.find(
      (char) => char.id === character.activeCharacter,
    );
    element.style.position = "relative";
    if (currentChar) {
      element.style.top = currentChar.moveY + moveY + "px";
      dispatch(
        setMovementY({
          id: character.activeCharacter,
          value: moveY,
        }),
      );
    }
  };

  return (
    <div id={id} className="mt-4" onClick={() => handleClick()}>
      <Input
        type="number"
        prependLabel="Set Y"
        value={moveY}
        id="setY"
        category="motion"
        onChange={handleChange}
      />
    </div>
  );
};

export default SetY;
