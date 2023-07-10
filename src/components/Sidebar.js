import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  CONTROL_COMPONENTS,
  EVENT_COMPONENTS,
  LOOKS_COMPONENTS,
  MOTION_COMPONENTS,
} from "../utils/constant";
import { getComponents } from "../utils/helper";

export default function Sidebar() {
  const [dropDowns, setDropDowns] = useState([
    {
      type: "motion",
      components: MOTION_COMPONENTS,
      color: "rgb(37 99 235)",
      isOpen: false,
    },
    {
      type: "looks",
      components: LOOKS_COMPONENTS,
      color: "rgb(147 51 234)",
      isOpen: false,
    },
    {
      type: "control",
      components: CONTROL_COMPONENTS,
      color: "rgb(220 38 38)",
      isOpen: false,
    },
    {
      type: "events",
      components: EVENT_COMPONENTS,
      color: "rgb(202 138 4)",
      isOpen: false,
    },
  ]);

  const handleDropDown = (type) => {
    const updatedDropDowns = dropDowns.map((d) =>
      d.type === type ? { ...d, isOpen: !d.isOpen } : d,
    );
    setDropDowns(updatedDropDowns);
  };

  return (
    <div className="w-64 flex-none h-full overflow-y-auto flex flex-col items-start py-2 px-3 border-r border-gray-200">
      <h2 className="text-2xl w-full p-2 title text-white text-center rounded">
        Actions
      </h2>
      {dropDowns.map((d) => (
        <div key={d.type} className="w-full">
          <p
            style={{ color: d.color, borderColor: d.color }}
            className={`text-md cursor-pointer capitalize flex justify-between items-center font-bold mt-4  border-b  w-full pb-2`}
            onClick={() => handleDropDown(d.type)}
          >
            {d.type}
            <div style={{ width: "20px", height: "20px" }}>
              <img
                width="32"
                height="32"
                style={{
                  transform: d.isOpen ? "rotate(0deg)" : "rotate(180deg)",
                }}
                src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-up-arrow-arrows-dreamstale-lineal-dreamstale-15.png"
                alt="external-up-arrow-arrows-dreamstale-lineal-dreamstale-15"
              />
            </div>
          </p>
          {d.isOpen && (
            <Droppable droppableId={`sideArea-${d.type}`} type="COMPONENTS">
              {(provided) => (
                <ul
                  className={`sideArea-${d.type} my-3`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {d.components.map((x, i) => {
                    return (
                      <Draggable
                        key={`${x}-sideArea`}
                        draggableId={`${x}-sideArea`}
                        index={i}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="my-2"
                          >
                            {getComponents(x)}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          )}
        </div>
      ))}
    </div>
  );
}
