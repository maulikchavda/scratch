import React, { useState } from "react";
import Input from "../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { setMovementX, setMovementY } from "../../redux/characterSlice";

const Movement = ({ type, id }) => {
  const [move, setMove] = useState(0);
  const character = useSelector((state) => state.chars);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setMove(parseInt(e.target.value));
  };

  const handleClick = () => {
    const element = document.getElementById(character.activeCharacter);
    const currentChar = character.characters.find(
      (char) => char.id === character.activeCharacter,
    );
    element.style.position = "relative";
    if (currentChar) {
      if (type === "moveX") {
        element.style.left = currentChar.moveX + move + "px";
        dispatch(
          setMovementX({
            id: character.activeCharacter,
            value: move,
          }),
        );
      }
      if (type === "moveY") {
        element.style.top = currentChar.moveY + move + "px";
        dispatch(
          setMovementY({
            id: character.activeCharacter,
            value: move,
          }),
        );
      }
    }
  };

  return (
    <div id={id} onClick={() => handleClick()}>
      <Input
        type="number"
        prependLabel={type === "moveX" ? "Move X" : "Move Y"}
        value={move}
        id="move"
        category="motion"
        onChange={handleChange}
        appendLabel="Steps"
      />
    </div>
  );
};

export default Movement;
