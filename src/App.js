import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updatedList } from "./redux/mindAreaSlice";
import toast from "react-hot-toast";

export default function App() {
  const actionBlocks = useSelector((state) => state.midArea);
  const dispatch = useDispatch();

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    if (result.includes("REPEAT") && element === "REPEAT") {
      toast.error("Only one repeat element is allowed.");
    } else {
      result.splice(index, 0, element);
    }
    return result;
  };
  const onDragEnd = (result) => {
    let element = result.draggableId.split("-")[0];

    const listCopy = [...actionBlocks.midAreaList];

    let source_index = listCopy.findIndex(
      (x) => x.id === result.source.droppableId,
    );
    let dest_index = listCopy.findIndex(
      (x) => x.id === result.destination.droppableId,
    );

    if (source_index > -1) {
      const [removedElement, newSourceList] = removeFromList(
        listCopy[source_index].comps,
        result.source.index,
      );
      dispatch(
        updatedList({
          id: listCopy[source_index].id,
          list: newSourceList,
        }),
      );
      listCopy[source_index] = {
        ...listCopy[source_index],
        comps: newSourceList,
      };
    }

    if (dest_index > -1) {
      const updatedElements = addToList(
        listCopy[dest_index].comps,
        result.destination.index,
        element,
      );
      dispatch(
        updatedList({
          id: listCopy[dest_index].id,
          list: updatedElements,
        }),
      );
      listCopy[dest_index] = {
        ...listCopy[dest_index],
        comps: updatedElements,
      };
    }
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <p className="font-bold text-3xl text-center heading">MIT Scratch</p>
      <div className="h-screen overflow-hidden flex flex-row pt-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar />

            <MidArea />
          </div>
          <div className="w-1/3 relative h-screen overflow-scroll  bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
