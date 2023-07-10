import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  copyListItem,
  deleteListItem,
  updatedList,
} from "../redux/mindAreaSlice";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getComponents } from "../utils/helper";
import { setRepeat } from "../redux/controlSlice";

export default function MidArea() {
  const dispatch = useDispatch();

  const actionBlocks = useSelector((state) => state.midArea);
  const control = useSelector((state) => state.control);

  const handleRemoveElement = (e, id, comp, components) => {
    e.preventDefault();
    const updatedComponents = components.filter((c) => c !== comp);
    dispatch(
      updatedList({
        id: id,
        list: updatedComponents,
      }),
    );
  };

  const eventFire = (element, elementType) => {
    if (element && element.fireEvent) {
      element.fireEvent("on" + elementType);
    } else if (element) {
      const evObj = document.createEvent("Events");
      evObj.initEvent(elementType, true, false);
      element.dispatchEvent(evObj);
    }
  };

  // Handle Running the list
  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;

    let str1 = `comp${arr[i]}-${id}-${i}`;
    const filterRepeat = arr.filter((item) => item === "REPEAT");
    const [getCurrentRepeatElement] = Object.entries(control.repeat).filter(
      (key, value) => key[0].includes(id),
    );
    if (
      filterRepeat.length > 0 &&
      control.repeat[getCurrentRepeatElement[0]] === 0
    )
      return;

    // Handle Wait at first index
    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < control.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    }

    // Handle Repeat at first index
    else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    }
    i++;

    /* Each function execution takes 2 seconds */
    let cnt = setInterval(() => {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      if (i === arr.length || control.repeat[str2] === 0) {
        clearInterval(cnt);
      }
      if (control.repeat[str2] === 0) return;

      // Handle Wait
      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < control.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      } else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        dispatch(setRepeat({ ele: str2, value: control.repeat[str2] - 1 }));
        i++;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };

  return (
    <div className="flex-1 h-full p-2 overflow-auto">
      <h2 className="text-2xl  w-full p-2 title text-white text-center rounded mb-4">
        Action List
      </h2>
      <div className="flex justify-end pr-4 mb-3">
        <button
          onClick={() => {
            dispatch(addList());
          }}
          className="text-white font-medium bg-green-500 rounded py-2 px-4 hover:bg-green-600"
        >
          + Add Action Block
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {actionBlocks.midAreaList.map((l) => {
          return (
            <div className="w-72" key={l.id}>
              <div className=" border  border-gray-300 p-2">
                <Droppable droppableId={l.id} type="COMPONENTS">
                  {(provided) => {
                    return (
                      <ul
                        className={`${l.id} w-full h-full`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <div className="text-center mx-auto mt-2 pb-2 mb-4 flex justify-end gap-3">
                          <button
                            className={`${
                              l.comps.length === 0
                                ? "cursor-not-allowed bg-green-500 hover:bg-green-500"
                                : "bg-green-600 hover:bg-green-700"
                            } flex justify-center  rounded items-center gap-2 text-white px-4 py-2 `}
                            disabled={l.comps.length === 0}
                            onClick={() => {
                              handleClick(l.comps, l.id);
                            }}
                          >
                            <div style={{ width: "16px", height: "16px" }}>
                              <img
                                width="30"
                                height="30"
                                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/play--v1.png"
                                alt="play--v1"
                              />
                            </div>
                          </button>
                          <button
                            className={`${
                              l.comps.length === 0
                                ? "cursor-not-allowed bg-green-500 hover:bg-green-500"
                                : "bg-green-600 hover:bg-green-700"
                            } flex justify-center  rounded items-center gap-2 text-white px-4 py-2 `}
                            disabled={l.comps.length === 0}
                            onClick={() => dispatch(copyListItem({ id: l.id }))}
                          >
                            <div style={{ width: "16px", height: "16px" }}>
                              <img
                                width="24"
                                height="24"
                                src="https://img.icons8.com/material-rounded/24/FFFFFF/copy.png"
                                alt="copy"
                              />
                            </div>
                          </button>
                          <button
                            className={` flex justify-center  rounded items-center gap-2 text-white px-4 py-2 bg-green-600 hover:bg-green-700`}
                            onClick={() =>
                              dispatch(deleteListItem({ id: l.id }))
                            }
                          >
                            <div style={{ width: "16px", height: "16px" }}>
                              <img
                                width="24"
                                height="24"
                                src="https://img.icons8.com/material-outlined/24/ffffff/trash--v1.png"
                                alt="trash--v1"
                              />
                            </div>
                          </button>
                        </div>

                        {l.comps &&
                          l.comps.map((x, i) => {
                            let str = `${x}`;
                            let component_id = `comp${str}-${l.id}-${i}`;

                            return (
                              <div
                                key={`${str}-${l.id}-${i}`}
                                className="flex items-center gap-2 relative"
                              >
                                <Draggable
                                  draggableId={`${str}-${l.id}-${i}`}
                                  index={i}
                                >
                                  {(provided) => (
                                    <div style={{ width: "85%" }}>
                                      <li
                                        ref={provided.innerRef}
                                        className="mt-2 pb-2 "
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        {getComponents(str, component_id)}

                                        {provided.placeholder}
                                      </li>
                                    </div>
                                  )}
                                </Draggable>
                                <div
                                  className="mt-2 absolute right-0 cursor-pointer"
                                  style={{ width: "24px", height: "24px" }}
                                  onClick={(e) =>
                                    handleRemoveElement(e, l.id, x, l.comps)
                                  }
                                >
                                  <img
                                    width="48"
                                    height="48"
                                    src="https://img.icons8.com/material-outlined/48/ff0202/trash--v1.png"
                                    alt="trash--v1"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        {provided.placeholder}
                      </ul>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
