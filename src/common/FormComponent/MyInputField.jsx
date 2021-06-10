import React from "react";

export default function MyInputField({ label, register, name, validation }) {
  const { isError, mess } = validation || {};
  return (
    <>
      <div className="mb-8">
        <span className="mb-3 flex flex-col text-gray-600">{label}</span>
        <input
          type="text"
          {...register(name, {})}
          className={
            "h-full w-full appearance-none rounded-full  w-30 py-4 px-6 leading-tight focus:outline-none border  text-gray-500" +
            (isError ? " border-red-500" : " focus:border-indigo-500")
          }
        />
        {isError ? <span className="ml-2 mt-2 text-red-500">*{mess}</span> : ""}
      </div>
    </>
  );
}
