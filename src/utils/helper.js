import React from "react";
import Goto from "../components/motion/Goto";
import SetX from "../components/motion/SetX";
import SetY from "../components/motion/SetY";
import Message from "../components/looks/Message";
import Think from "../components/looks/Think";
import Size from "../components/looks/Size";
import ShowHide from "../components/looks/ShowHide";
import Control from "../components/control";
import Movement from "../components/motion/Movement";
import Rotation from "../components/motion/Rotation";
import Event from "../components/event";

export const getComponents = (key, id) => {
  switch (key) {
    // Motion Components
    case "MOVE_X":
      return <Movement type="moveX" id={id} />;
    case "MOVE_Y":
      return <Movement type="moveY" id={id} />;
    case "ROTATE_X":
      return <Rotation type="rotateX" id={id} />;
    case "ROTATE_Y":
      return <Rotation type="rotateY" id={id} />;
    case "GOTO":
      return <Goto id={id} />;
    case "SET_X":
      return <SetX id={id} />;
    case "SET_Y":
      return <SetY id={id} />;

    // Looks Components
    case "MESSAGE":
      return <Message type="message" id={id} />;
    case "MESSAGE_TIMER":
      return <Message type="messageTimer" id={id} />;
    case "THINK":
      return <Think type="think" id={id} />;
    case "THINK_TIMER":
      return <Think type="thinkTimer" id={id} />;
    case "SIZE":
      return <Size type="size" id={id} />;
    case "RESET_SIZE":
      return <Size type="resetSize" id={id} />;
    case "SHOW":
      return <ShowHide type="show" id={id} />;
    case "HIDE":
      return <ShowHide type="hide" id={id} />;
    case "HIDE_MESSAGE":
      return <Message type="hideMessage" id={id} />;

    // Control Components
    case "REPEAT":
      return <Control type="repeat" id={id} />;
    case "WAIT":
      return <Control type="wait" id={id} />;
    case "CLONE":
      return <Control type="clone" id={id} />;
    case "DELETE":
      return <Control type="delete" id={id} />;

    // Events Components
    case "BROADCAST_MESSAGE":
      return <Event id={id} />;

    default:
      return React.null;
  }
};
