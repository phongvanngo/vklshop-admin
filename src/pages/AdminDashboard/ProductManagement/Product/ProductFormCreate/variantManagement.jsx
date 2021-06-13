import React, { useState } from "react";

import MenuDropdown from "./variantManagement.dropdown";
import { numberWithSpaces } from "app/myLibrary/utilities";
import { useDispatch, useSelector } from "react-redux";
import { openVariantFormDialog } from "app/redux/dialogSlice";
import { useEffect } from "react";
import { deleteVariant, setListVariant } from "app/redux/variantSlice";

export default function VariantManagement({ productToEdit }) {
  const handleDeleteVariant = (variant) => {
    if (window.confirm("Xóa mẫu sản phẩm này ?")) {
      dispatch(deleteVariant(variant));
    }
  };
  const handleEditVariant = (variant) => {};
  const dispatch = useDispatch();

  // const [listVariants, setListVariants] = useState(
  //   productToEdit?.productVariants
  // );
  // const listVariants = useSelector((state) => state.variant.listVariant || []);

  const listVariants = useSelector((state) => state.variant.listVariant);
  console.log("varaint managment - list Variants", listVariants);

  // useEffect(() => {
  //   if (productToEdit) {
  //     dispatch(setListVariant(productToEdit.productVariants));
  //   }
  // }, [productToEdit]);

  return (
    <>
      <div className="w-full mb-8 ">
        <div className="mb-3 flex justify-between items-center ">
          <span className="text-gray-600"></span>
          <button
            onClick={() => {
              dispatch(
                openVariantFormDialog({
                  id: null,
                  productId: productToEdit.id,
                })
              );
            }}
            className="flex items-center bg-admin_color_1 appearance-none  rounded-full w-30 h-full  py-2 px-8 text-admin_color_2 leading-tight hover:bg-indigo-900 focus:outline-none"
          >
            <i className="bx bx-plus mr-2 align-middle block"></i>
            <span>Thêm mẫu mã</span>
          </button>
        </div>
        <div className="px-8 py-6 rounded-b-3xl bg-white shadow-sm">
          <table className="table-fixed w-full mb-10">
            <thead className="">
              <tr className="uppercase border-b border-gray-200 text-left text-base font-extrabold text-gray-500 tracking-widest">
                <th scope="col" className="w-1/12 px-2 py-3 break-words">
                  <strong>#</strong>
                </th>
                <th scope="col" className="w-2/12 px-2 py-3 break-words">
                  <strong>Tên</strong>
                </th>
                <th scope="col" className="w-3/12 px-2 py-3 break-words">
                  <strong>Giá gốc</strong>
                </th>
                <th scope="col" className="w-3/12 px-2 py-3 break-words">
                  <strong>Giá bán</strong>
                </th>
                <th scope="col" className="w-2/12 px-2 py-3 break-words">
                  <strong>Tồn kho</strong>
                </th>
                <th scope="col" className="w-1/12 px-2 py-3 break-words">
                  <strong></strong>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-500 font-normal">
              {(listVariants || []).map((variant, index) => {
                const { id, name, image, price, costPrice, stock } = variant;
                return (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-2 py-4 text-gray-500 text-sm font-extrabold">
                      <strong>{index + 1}</strong>
                    </td>
                    <td className="px-2 py-4">{name}</td>
                    <td className="px-2 py-4">
                      {numberWithSpaces(costPrice, stock) + " VND"}
                    </td>
                    <td className="px-2 py-4">
                      {numberWithSpaces(price) + " VND"}
                    </td>
                    <td className="px-2 py-4">{stock}</td>
                    <td className="px-2 py-4">
                      <MenuDropdown
                        handleDelete={() => {
                          handleDeleteVariant(variant);
                        }}
                        handleEdit={() => {
                          handleEditVariant(variant);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {(listVariants || []).length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              <span>Không có mẫu mã nào</span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
