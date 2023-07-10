import React, { useState } from "react";
import Input from "../common/Input";
import { setRotate } from "../../redux/characterSlice";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../Icon";

const Rotation = ({ type, id }) => {
  const character = useSelector((state) => state.chars);

  const dispatch = useDispatch();

  const [rotateAngle, setRotateAngle] = useState(0);

  const handleChange = (e) => {
    setRotateAngle(parseInt(e.target.value));
  };

  const handleClick = () => {
    const element = document.getElementById(character.activeCharacter);
    const currentChar = character.characters.find(
      (char) => char.id === character.activeCharacter,
    );
    element.style.position = "relative";
    if (currentChar) {
      if (type === "rotateX") {
        element.style.transform = `rotate(${
          currentChar.angle + rotateAngle
        }deg)`;
        dispatch(
          setRotate({
            id: character.activeCharacter,
            value: rotateAngle,
          }),
        );
      }
      if (type === "rotateY") {
        const antiRotate = -1 * rotateAngle;
        element.style.transform = `rotate(${
          currentChar.angle + antiRotate
        }deg)`;
        dispatch(
          setRotate({
            id: character.activeCharacter,
            value: antiRotate,
          }),
        );
      }
    }
  };

  return (
    <div className="mt-4" id={id} onClick={() => handleClick()}>
      <Input
        type="number"
        prependLabel="Rotate"
        value={rotateAngle}
        id="rotateAngle"
        category="motion"
        prependIcon={
          type === "rotateX" ? (
            <div
              style={{
                width: "16px",
                height: "16px",
              }}
              className="ml-2"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/external-febrian-hidayat-basic-outline-febrian-hidayat/24/FFFFFF/external-rotate-right-user-interface-febrian-hidayat-basic-outline-febrian-hidayat.png"
                alt="external-rotate-right-user-interface-febrian-hidayat-basic-outline-febrian-hidayat"
              />
            </div>
          ) : (
            <div style={{ width: "16px", height: "16px" }} className="ml-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/external-febrian-hidayat-basic-outline-febrian-hidayat/24/FFFFFF/external-rotate-left-user-interface-febrian-hidayat-basic-outline-febrian-hidayat.png"
                alt="external-rotate-left-user-interface-febrian-hidayat-basic-outline-febrian-hidayat"
              />
            </div>
          )
        }
        onChange={handleChange}
        appendLabel="Degrees"
      />
    </div>
  );
};

export default Rotation;
