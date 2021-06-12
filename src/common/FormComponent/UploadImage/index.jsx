import React, { useState } from "react";
import UploadImageComp from "./UploadImage";
import ImageIcon from "assets/image/ImageIcon.png";

const fakeListImage = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/300/300",
  "https://picsum.photos/500/300",
  "https://picsum.photos/900/300",
  "https://picsum.photos/400/300",
  "https://picsum.photos/100/300",
  "https://picsum.photos/500/300",
];

export default function Index({}) {
  const [listImage, setListImage] = useState(fakeListImage);

  const handleNewImage = (linkImage) => {};
  return (
    <>
      <div className="mb-8">
        <div className="mb-3 flex justify-between items-center ">
          <span className="text-gray-600">Hình ảnh</span>
          <UploadImageComp />
        </div>
        <div>
          <div
            className="border min-w-full"
            style={{
              minHeight: "100px",
            }}
          >
            <div>
              {listImage?.length === 0 ? (
                <div className="w-full h-full p-5 opacity-30 bg-gray-600">
                  <img
                    className="w-20 h-20 m-auto"
                    src={ImageIcon}
                    alt="background-picture"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-wrap gap-1 p-2">
                {listImage.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="relative border border-md  w-36 h-36 flex items-center justify-center"
                    >
                      <img className="max-w-full max-h-full" src={image} />
                      <div className="absolute w-full h-full opacity-0 hover:opacity-100 transition flex items-center justify-center ">
                        <div className="absolute items-center bg-black opacity-60 w-full h-full "></div>
                        <button className="relative text-black bg-white rounded-full flex items-center justify-center px-2 py-2 hover:bg-black hover:text-white transition-all">
                          <i className="text-md  bx bxs-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
