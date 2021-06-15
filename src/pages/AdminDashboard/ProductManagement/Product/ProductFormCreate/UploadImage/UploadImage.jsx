import React from "react";
import axios from "axios";

export default function UploadImageForm({ addNewImage }) {
  function handleUploadImage(event) {
    const listImages = Array.from(event?.target?.files);

    uploadImageToServerHandler(listImages);
  }

  function handleChooseImage() {
    document.getElementById("input-product-image").click();
  }

  const uploadImageToServerHandler = async (files) => {
    if (!files) return;
    let token = localStorage.getItem("id_token");
    let url = `${process.env.REACT_APP_API_URL}/product/image`;
    // let url = `http://103.142.137.207:3000/product/image`;
    files.forEach((file) => {
      const fd = new FormData();
      fd.append("image", file, file.name);
      axios
        .post(url, fd, {
          timeout: 10000,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          switch (res.status) {
            case 200:
              // let linkImage = `${process.env.REACT_APP_API_URL}/image/product/${res.data.data.filename}`;
              let imageName = res.data.data.filename;
              addNewImage(imageName);
              break;
            default:
              break;
          }
        })
        .catch((error) => {});
    });
  };

  return (
    <div>
      <input
        id="input-product-image"
        type="file"
        multiple
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
