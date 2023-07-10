import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ShowHide = ({ type, id }) => {
  const character = useSelector((state) => state.chars);

  const handleClick = () => {
    const element = document.getElementById(`${character.activeCharacter}`);
    if (
      type === "show" &&
      (element.style.display === "none" || element.className.includes("none"))
    ) {
      element.style.display = "block";
      toast.success(`${character.activeCharacter} Shown.`);
    }
    if (
      type === "hide" &&
      (element.style.display === "block" || element.className.includes("block"))
    ) {
      element.style.display = "none";
      toast.success(`${character.activeCharacter} Hidden.`);
    }
  };

  return (
    <div className="bg-purple-300 p-2 rounded">
      <button
        id={id}
        className={` w-full p-2 rounded bg-purple-600 text-white text-sm`}
        onClick={() => handleClick()}
      >
        {type === "show" ? `Show` : "Hide"}
      </button>
    </div>
  );
};

export default ShowHide;
