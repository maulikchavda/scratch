import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../common/Input";

const Think = ({ type, id }) => {
  const character = useSelector((state) => state.chars);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(2);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    const element = document.getElementById(
      `${character.activeCharacter}-message-box`,
    );
    const thinkDot = document.getElementById(
      `${character.activeCharacter}-message-think`,
    );
    element.innerHTML = message;
    element.style.display = "block";
    thinkDot.style.display = "block";
    if (type === "thinkTimer") {
      setTimeout(() => {
        element.style.display = "none";
        thinkDot.style.display = "none";
      }, timer);
    }
  };

  return (
    <>
      <div className="bg-purple-300 p-2 rounded">
        {type !== "hideMessage" && (
          <Input
            type="text"
            prependLabel="Text: "
            value={message}
            id="think"
            category="looks"
            onChange={handleChange}
          />
        )}
        {type === "thinkTimer" && (
          <Input
            type="number"
            value={timer}
            prependLabel="Timer: "
            id="thinkTimer"
            category="looks"
            containerClassName="mt-2"
            onChange={(e) => setTimer(e.target.value * 1000)}
          />
        )}
        <button
          id={id}
          className={`${
            type !== "hideMessage" && "mt-4"
          } w-full p-2 rounded bg-purple-600 text-white text-sm`}
          onClick={() => handleClick()}
        >
          Think {message}
        </button>
      </div>
    </>
  );
};

export default Think;
