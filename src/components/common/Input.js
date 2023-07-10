import React from "react";

const Input = (props) => {
  const {
    label,
    prependLabel,
    type,
    id,
    disabled,
    placeholder,
    value,
    onChange,
    appendLabel,
    containerClassName,
    respectiveParam,
    prependIcon,
    category,
    min,
    onInput,
    onKeyPress,
  } = props;

  const getBgColor = (cat) => {
    switch (cat) {
      case "motion":
        return "bg-blue-600 border-blue-600";
      case "looks":
        return "bg-purple-600 border-purple-600";
      case "events":
        return "bg-yellow-500 border-yellow-600";
      case "control":
        return "bg-red-600 border-red-600";
    }
  };

  return (
    <>
      <div className={`${containerClassName} relative z-1 `}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className={label ? "mt-1" : ""}>
          <div
            className={`${getBgColor(
              category,
            )} flex rounded-md items-center p-2 border  shadow-sm  sm:text-sm`}
          >
            {prependLabel && (
              <p className=" items-center w-full text-white text-sm">
                {prependLabel}
              </p>
            )}
            {prependIcon && (
              <p className="absolute left-12    text-gray-500 text-sm">
                {prependIcon}
              </p>
            )}
            <input
              type={type}
              name={id}
              id={id}
              min={min}
              disabled={disabled}
              onInput={onInput}
              onKeyPress={onKeyPress}
              className={` block focus:border-transparent z-[-1] rounded pl-3  w-full   border   sm:text-sm`}
              placeholder={placeholder}
              defaultValue={value}
              onChange={(e) => onChange(e, respectiveParam)}
            />
            {appendLabel && (
              <p className=" pl-3 border-gray-300  text-white  text-sm">
                {appendLabel}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
