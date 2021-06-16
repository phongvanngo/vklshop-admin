import {
  convertDateTime,
  filterArrayBySearchTerm,
} from "app/myLibrary/utilities";
import { openCardTypeFormDialog } from "app/redux/dialogSlice";
import { deleteCardType } from "app/redux/cardTypeSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MenuDropdown from "./CardType.table.menu";

export default function CardTypeTable({ listCardType }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  let currentListCardType = filterArrayBySearchTerm(listCardType, searchTerm);

  const handleEditCardType = (cardTypeData) => {
    dispatch(openCardTypeFormDialog(cardTypeData));
  };

  const handleDeleteCardType = (id) => {
    if (window.confirm("Bạn có chắc chắn xóa")) {
      dispatch(deleteCardType(id));
    }
  };

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="w-full flex justify-between items-center mb-5">
          <div className="flex items-center h-10 ">
            <input
              className="h-full appearance-none rounded-l-full border w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Tìm kiếm"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div className="bg-admin_color_1 rounded-r-full h-full w-12 p-1 flex justify-center hover:bg-indigo-900">
              <i className="bx bx-search-alt text-2xl text-white m-auto "></i>
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-between items-center h-20 border-b border-gray-200 rounded-t-3xl bg-white">
          <h1 className="text-xl font-medium">Danh sách các loại thẻ</h1>
          <button
            onClick={() => {
              dispatch(openCardTypeFormDialog({ id: null }));
            }}
            className="flex items-center bg-admin_color_1 appearance-none  rounded-full w-100 h-full  py-2 px-8 text-admin_color_2 leading-tight hover:bg-indigo-900 focus:outline-none"
          >
            <i className="bx bx-plus mr-2 align-middle block"></i>
            <span>Thêm thẻ</span>
          </button>
        </div>
        <div className="px-8 py-6 rounded-b-3xl bg-white shadow-sm">
          <table className="table-fixed w-full mb-10">
            <thead className="">
              <tr className="uppercase border-b border-gray-200 text-left text-base font-extrabold text-gray-500 tracking-widest">
                <th scope="col" className="w-1/12 px-2 py-3 break-words">
                  <strong>#</strong>
                </th>
                <th scope="col" className="w-5/12 px-2 py-3 break-words">
                  <strong>Tên thẻ</strong>
                </th>
                <th scope="col" className="w-5/12 px-2 py-3 break-words">
                  <strong>Phí</strong>
                </th>
                <th scope="col" className="w-1/12 px-2 py-3 break-words">
                  <strong></strong>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-500 font-normal">
              {currentListCardType.map((cardType, index) => {
                const { id, name, fee } = cardType;
                return (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-2 py-4 text-gray-500 text-sm font-extrabold">
                      <strong>{index + 1}</strong>
                    </td>
                    <td className="px-2 py-4">{name}</td>
                    <td className="px-2 py-4">
                      {fee * 100 + " % giá trị hóa đơn"}
                    </td>
                    <td className="px-2 py-4">
                      <MenuDropdown
                        handleDelete={() => {
                          handleDeleteCardType(id);
                        }}
                        handleEdit={() => {
                          handleEditCardType(cardType);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {currentListCardType.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              <span>Không có loại thẻ nào</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
