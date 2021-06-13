import React, { useState } from "react";
import UploadImageComp from "./UploadImage";
import ImageIcon from "assets/image/ImageIcon.png";

export default function UploadOneImageForm({ setImage, defaultImage }) {
  const [currentImage, setCurrentImage] = useState(defaultImage);

  const handleAddImage = (imageToAdd) => {
    setCurrentImage(imageToAdd);
    setImage(imageToAdd);
  };
  const handleRemoveImage = () => {
    if (window.confirm("Xóa hình ảnh khỏi sản phẩm ?")) {
      setImage("");
      setCurrentImage("");
    }
  };
  return (
    <>
      <div className="mb-8">
        <div className="mb-3 flex justify-between items-center ">
          <span className="text-gray-600">Hình ảnh</span>
          <UploadImageComp
            addNewImage={(image) => {
              handleAddImage(image);
            }}
          />
        </div>
        <div>
          <div
            className="border min-w-full"
            style={{
              height: "100px",
            }}
          >
            <div>
              {currentImage === "" ? (
                <div className="w-full h-full p-5 opacity-30 bg-gray-600">
                  <img
                    className="w-20 h-20 m-auto"
                    src={ImageIcon}
                    alt="background-picture"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center p-2">
                  <div className="relative border border-md  w-36 h-36 flex items-center justify-center">
                    <img className="max-w-full max-h-full" src={currentImage} />
                    <div className="absolute w-full h-full opacity-0 hover:opacity-100 transition flex items-center justify-center ">
                      <div className="absolute items-center bg-black opacity-60 w-full h-full "></div>
                      <button
                        onClick={() => {
                          handleRemoveImage();
                        }}
                        className="appearance-none focus:outline-none relative text-black bg-white rounded-full flex items-center justify-center px-2 py-2 hover:bg-black hover:text-white transition-all"
                      >
                        <i className="text-md  bx bxs-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
