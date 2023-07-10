import React, { useState } from "react";
import Input from "../common/Input";
import { useSelector } from "react-redux";

const Goto = ({ id }) => {
  const character = useSelector((state) => state.chars);

  const [goto, setGoto] = useState({
    x: 0,
    y: 0,
  });

  const handleChange = (e, name) => {
    setGoto((prev) => ({
      ...prev,
      [name]: parseInt(e.target.value),
    }));
  };

  const handleClick = () => {
    const element = document.getElementById(character.activeCharacter);
    const currentChar = character.characters.find(
      (char) => char.id === character.activeCharacter,
    );
    element.style.position = "relative";
    element.style.left = goto.x + "px";
    element.style.top = goto.y + "px";
  };

  return (
    <div
      id={id}
      className="mt-4 border border-gray-200 rounded"
      onClick={() => handleClick()}
    >
      <Input
        type="number"
        prependLabel="Go to X by"
        value={goto.x}
        id="moveX"
        category="motion"
        respectiveParam="x"
        onChange={handleChange}
      />
      <Input
        type="number"
        prependLabel="Go to Y by"
        value={goto.y}
        id="moveX"
        category="motion"
        respectiveParam="y"
        onChange={handleChange}
      />
    </div>
  );
};

export default Goto;
