import React from "react";

export default function ToolBar({ title }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-medium">{title || "không có tiêu đề"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            form="create-product-form"
            onClick={() => {}}
            className="flex items-center bg-admin_color_1 appearance-none  rounded-full w-30 h-full  py-2 px-8 text-admin_color_2 leading-tight hover:bg-indigo-900 focus:outline-none"
          >
            <i className="bx bx-check mr-2 align-middle block"></i>
            <span>Lưu</span>
          </button>
          <button
            onClick={() => {}}
            className="flex items-center bg-red-700 appearance-none  rounded-full w-30 h-full  py-2 px-8 text-admin_color_2 leading-tight hover:bg-red-900 focus:outline-none"
          >
            <i className="bx bxs-left-arrow-alt mr-2 align-middle block"></i>
            <span>Quay lại</span>
          </button>
        </div>
      </div>
    </>
  );
}
