import React, { useState } from "react";
import Input from "../common/Input";
import toast from "react-hot-toast";

const Event = ({ id }) => {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (message.length > 0) {
      toast(`${message}`, {
        icon: <p dangerouslySetInnerHTML={{ __html: "&#9432;" }} />,
      });
    } else {
      toast.error("Please enter message.");
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="bg-yellow-300 p-2 rounded">
        <Input
          type="text"
          value={message}
          prependLabel="Text: "
          id="event"
          category="events"
          onChange={(e) => handleChange(e)}
        />
        <button
          id={id}
          className={`mt-4 w-full p-2 rounded bg-yellow-500 text-white text-sm`}
          onClick={() => handleClick()}
        >
          Broadcast
        </button>
      </div>
    </>
  );
};

export default Event;
