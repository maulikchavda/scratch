import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../common/Input";
import toast from "react-hot-toast";

const Message = ({ type, id }) => {
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
    if (message.length > 0) {
      if (["message", "messageTimer"].includes(type)) {
        element.textContent = message;
        element.style.display = "block";
      }
      if (type === "messageTimer") {
        setTimeout(() => {
          element.style.display = "none";
        }, timer);
      }
    } else if (type === "hideMessage") {
      element.style.display = "none";
      thinkDot.style.display = "none";
    } else {
      toast.error("Please enter message.");
    }
  };

  return (
    <>
      <div className=" bg-purple-300 p-2 rounded">
        {type !== "hideMessage" && (
          <Input
            type="text"
            prependLabel="Text: "
            value={message}
            id="message"
            category="looks"
            onChange={handleChange}
          />
        )}
        {type === "messageTimer" && (
          <Input
            type="number"
            value={timer}
            prependLabel="Timer: "
            id="timer"
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
          {type === "hideMessage" ? "Hide Message" : `Say ${message}`}
        </button>
      </div>
    </>
  );
};

export default Message;
