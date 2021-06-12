import React from "react";
import "./MySelectionField.style.scss";

export default function MySelectionField({
  label,
  register,
  name,
  defaultValue,
  validation,
  listOptions,
}) {
  const { isError, mess } = validation;
  console.log("my selection field - validation : ", validation);
  console.log("my selection field - default value : ", defaultValue);

  const NoneValueOption = () => {
    if (defaultValue) return null;
    else
      return (
        <option value="" selected disabled hidden>
          Chọn loại sản phẩm
        </option>
      );
  };

  return (
    <>
      <div className="mb-8">
        <span className="mb-2 flex flex-col text-gray-600">{label}</span>
        <select
          type="text"
          {...register(name, {})}
          className={
            "h-full w-full  rounded-full  w-30 py-4 px-6 leading-tight focus:outline-none border  text-gray-500" +
            (isError ? " border-red-500" : " focus:border-indigo-500")
          }
        >
          <NoneValueOption />
          {listOptions.map((e, index) => {
            let optionValue = JSON.stringify(e);
            return (
              <option
                selected={optionValue === JSON.stringify(defaultValue)}
                className
                value={optionValue}
                key={index}
              >
                {e.name}
              </option>
            );
          })}
        </select>
        {isError ? <span className="ml-2 mt-2 text-red-500">*{mess}</span> : ""}
      </div>
    </>
  );
}
