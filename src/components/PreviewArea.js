import React, { useEffect, useState } from "react";
import CatSprite from "./CatSprite";
import { useDispatch, useSelector } from "react-redux";
import { addCharacters, setActiveChar } from "../redux/characterSlice";

export default function PreviewArea() {
  const character = useSelector((state) => state.chars);

  const dispatch = useDispatch();

  const [activeCharacter, setActiveCharacter] = useState(
    character.activeCharacter,
  );

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let element = null;

  function dragMouseDown(e, id) {
    element = document.getElementById(id);

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const handleChange = (e) => {
    setActiveCharacter(e.target.value);
    dispatch(setActiveChar({ id: e.target.value }));
  };

  useEffect(() => {
    setActiveCharacter(character.activeCharacter);
  }, [character.activeCharacter]);

  return (
    <div className="h-full overflow-y-auto py-2 px-3">
      <h2 className="text-2xl w-full p-2 title text-white text-center rounded mb-4">
        Preview
      </h2>
      <div className="mb-6 mt-2 flex justify-between items-center">
        <div className=" flex gap-2 items-center">
          <p className="text-md text-black font-medium">Selected Character:</p>
          <select
            value={activeCharacter}
            onChange={handleChange}
            className="capitalize border border-gray-800 py-2 px-3 rounded"
          >
            {character.characters.map((option) => (
              <option key={option.id} className="uppercase" value={option.id}>
                {option.id}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            dispatch(addCharacters());
          }}
          className="text-white font-medium bg-green-500 rounded py-2 px-4 hover:bg-green-600"
        >
          + Add Character
        </button>
      </div>
      <div className="flex justify-around h-full">
        {character.characters.map((x, i) => {
          return (
            <div
              id={`${x.id}-${i}`}
              key={x.id}
              className={`absolute`}
              onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
            >
              <div id={`${x.id}-div`} className="character">
                <div
                  className="hidden border border-gray-400 rounded p-2 ml-4 mb-2 w-auto whitespace-nowrap"
                  id={x.id + "-message-box"}
                ></div>
                <div
                  className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap"
                  id={x.id + "-message-think"}
                ></div>
                <CatSprite characterId={x.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
