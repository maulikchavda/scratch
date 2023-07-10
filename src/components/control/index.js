import React, { useState } from "react";
import Input from "../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { cloneCharacter, deleteCharacter } from "../../redux/characterSlice";
import toast from "react-hot-toast";
import { setRepeat, setWait } from "../../redux/controlSlice";

const Control = ({ type, id }) => {
  const character = useSelector((state) => state.chars);

  const [time, setTime] = useState(0);

  const dispatch = useDispatch();
  const getBtnText = (tp, time) => {
    switch (tp) {
      case "clone":
        return "Clone current character";
      case "delete":
        return "Delete current character";
      case "wait":
        return `Wait ${time} seconds`;
      case "repeat":
        return `Repeat ${time} times`;
    }
  };

  const handleClick = () => {
    if (type === "clone") {
      dispatch(cloneCharacter({ id: character.activeCharacter }));
      toast.success("Selected character cloned successfully.");
    }
    if (type === "delete") {
      if (character.characters.length > 1) {
        dispatch(deleteCharacter({ id: character.activeCharacter }));
        toast.success("Selected character deleted successfully.");
      } else {
        toast.error("Minimum one character required.");
      }
    }
  };

  const handleChange = (e) => {
    let val = parseInt(e.target.value);
    setTime(val);
    if (type === "wait") {
      dispatch(setWait({ ele: id, value: val }));
    }
    if (type === "repeat") {
      dispatch(setRepeat({ ele: id, value: val }));
    }
  };

  return (
    <>
      <div className="bg-red-300 p-2 rounded">
        {!["clone", "delete"].includes(type) && (
          <Input
            type="number"
            value={time}
            min={1}
            prependLabel="Time: "
            id="control"
            category="control"
            onKeyPress={(e) => e.code === "Minus" && e.preventDefault()}
            containerClassName="mt-2"
            onChange={(e) => handleChange(e)}
          />
        )}
        <button
          id={id}
          className={`${
            !["clone", "delete"].includes(type) && "mt-4"
          } w-full p-2 rounded bg-red-600 text-white text-sm`}
          onClick={() => handleClick()}
        >
          {getBtnText(type, time)}
        </button>
      </div>
    </>
  );
};

export default Control;
