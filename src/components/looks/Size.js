import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../common/Input";
import toast from "react-hot-toast";

const Size = ({ type, id }) => {
  const character = useSelector((state) => state.chars);
  const [size, setSize] = useState(1);

  const handleClick = () => {
    const element = document.getElementById(`${character.activeCharacter}`);
    if (size > 0) {
      if (type === "resetSize") {
        setSize(1);
        element.style.scale = "1";
      } else {
        element.style.scale = `${size}`;
      }
    } else {
      toast.error("Please select size greater then 0.");
    }
  };

  return (
    <>
      <div className=" bg-purple-300 p-2 rounded">
        {type === "size" && (
          <Input
            type="number"
            value={size}
            min={1}
            prependLabel="Size: "
            id="size"
            category="looks"
            containerClassName="mt-2"
            onChange={(e) => setSize(e.target.value)}
          />
        )}
        <button
          id={id}
          className={`${
            type === "size" && "mt-4"
          } w-full p-2 rounded bg-purple-600 text-white text-sm`}
          onClick={() => handleClick()}
        >
          {type === "size" ? `Set Size ${size}` : "Reset Size"}
        </button>
      </div>
    </>
  );
};

export default Size;
