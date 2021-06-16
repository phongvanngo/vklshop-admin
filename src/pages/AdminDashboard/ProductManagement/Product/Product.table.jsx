import { filterArrayBySearchTerm } from "app/myLibrary/utilities";
import { openProductFormDialog } from "app/redux/dialogSlice";
import { deleteProduct } from "app/redux/productSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MenuDropdown from "./Product.table.menu";
import FilterCategory from "./Product.table.filterCategory";
import { reduceParagraph } from "app/myLibrary/utilities";
import { useHistory } from "react-router";
import { AdminRoutes } from "routes.const";
import queryString from "query-string";
import { useParams } from "react-router-dom";

export default function ProductTable({ listProduct, currentCategoryId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  let currentListProduct = filterArrayBySearchTerm(listProduct, searchTerm);

  const handleEditProduct = (productData) => {
    // dispatch(openProductFormDialog(productData));
    history.push(
      EDIT_PRODUCT + "/" + queryString.stringify({ productId: productData.id })
    );
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Bạn có chắc chắn xóa")) {
      dispatch(deleteProduct(id));
    }
  };

  const { EDIT_PRODUCT } = AdminRoutes;

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
        <div className="p-6  min-h-20 border-b border-gray-200 rounded-t-3xl bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Danh sách sản phẩm</h1>
            <button
              onClick={() => {
                // dispatch(openProductFormDialog({ id: null }));
                history.push(
                  EDIT_PRODUCT +
                    "/" +
                    queryString.stringify({ productId: null })
                );
              }}
              className="flex items-center bg-admin_color_1 appearance-none  rounded-full w-100 h-full  py-2 px-8 text-admin_color_2 leading-tight hover:bg-indigo-900 focus:outline-none"
            >
              <i className="bx bx-plus mr-2 align-middle block"></i>
              <span>Thêm sản phẩm mới</span>
            </button>
          </div>
          <FilterCategory defaultSelectedId={currentCategoryId} />
        </div>
        <div className="px-8 py-6 rounded-b-3xl bg-white shadow-sm">
          <table className="table-fixed w-full mb-10">
            <thead className="">
              <tr className="uppercase border-b border-gray-200 text-left text-base font-extrabold text-gray-500 tracking-widest">
                <th scope="col" className="w-1/12 px-2 py-3 break-words">
                  <strong>#</strong>
                </th>
                <th scope="col" className="w-2/12 px-2 py-3 break-words">
                  <strong>Mã</strong>
                </th>
                <th scope="col" className="w-2/12 px-2 py-3 break-words">
                  <strong></strong>
                </th>
                <th scope="col" className="w-3/12 px-2 py-3 break-words">
                  <strong>Tên sản phẩm</strong>
                </th>
                {/* <th scope="col" className="w-2/12 px-2 py-3 break-words">
                  <strong>Tên loại sản phẩm</strong>
                </th> */}
                <th scope="col" className="w-3/12 px-2 py-3 break-words">
                  <strong>Mô tả</strong>
                </th>
                <th scope="col" className="w-1/12 px-2 py-3 break-words">
                  <strong></strong>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-500 font-normal">
              {currentListProduct.map((product, index) => {
                const { id, image, name, description, theaterSystemName } =
                  product;
                return (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-2 py-4 text-gray-500 text-sm font-extrabold">
                      <strong>{index + 1}</strong>
                    </td>
                    <td className="px-2 py-4 text-gray-500 text-sm font-extrabold">
                      <strong>{id}</strong>
                    </td>
                    <td className="px-2 py-4">
                      <img
                        className="h-20 w-20 rounded-lg"
                        alt="logo"
                        src={image}
                      />
                    </td>
                    <td className="px-2 py-4">{name}</td>
                    {/* <td className="px-2 py-4">{}</td> */}
                    <td className="px-2 py-4">
                      {reduceParagraph(description, 10)}
                    </td>
                    <td className="px-2 py-4">
                      <MenuDropdown
                        handleDelete={() => {
                          handleDeleteProduct(id);
                        }}
                        handleEdit={() => {
                          handleEditProduct(product);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {currentListProduct.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              <span>Không có sản phẩm nào</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
