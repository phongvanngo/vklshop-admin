import React from "react";

export default function UploadImageForm({ LinkImage }) {
  function handleUploadImage(event) {
    console.log(event.target.files);
  }

  function handleChooseImage() {
    document.getElementById("input-image").click();
  }

  return (
    <div>
      <input
        id="input-image"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        style={{ display: "none" }}
        onChange={handleUploadImage}
      />

      <button
        onClick={handleChooseImage}
        className="flex items-center justify-center bg-green-900 appearance-none  rounded-full w-100 h-full  py-1 pl-1 pr-3 text-admin_color_2 leading-tight hover:bg-green-500 focus:outline-none"
      >
        <i className="bx bx-plus mr-2 align-middle block"></i>
        <span>Thêm ảnh</span>
      </button>
    </div>
  );
}
