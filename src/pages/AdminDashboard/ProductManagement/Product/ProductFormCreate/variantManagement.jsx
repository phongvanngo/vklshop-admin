import React from "react";

export default function VariantManagement() {
  return (
    <>
      <div className="w-full ">
        <div className="px-8 py-6 rounded-b-3xl bg-white shadow-sm">
          <table className="table-fixed w-full mb-10">
            <thead className="">
              <tr className="uppercase border-b border-gray-200 text-left text-base font-extrabold text-gray-500 tracking-widest">
                <th scope="col" className="w-1/12 px-2 py-3 break-words">
                  <strong>#</strong>
                </th>
                <th scope="col" className="w-3/12 px-2 py-3 break-words">
                  <strong>Tên mẫu mã</strong>
                </th>
                <th scope="col" className="w-7/12 px-2 py-3 break-words">
                  <strong>Giá gốc</strong>
                </th>
                <th scope="col" className="w-7/12 px-2 py-3 break-words">
                  <strong>Giá bán</strong>
                </th>
                <th scope="col" className="w-7/12 px-2 py-3 break-words">
                  <strong>Tồn kho</strong>
                </th>
                <th scope="col" className="w-1/12 px-2 py-3 break-words">
                  <strong></strong>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-500 font-normal">
              {currentListCategory.map((category, index) => {
                const { id, name, image } = category;
                return (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-2 py-4 text-gray-500 text-sm font-extrabold">
                      <strong>{index + 1}</strong>
                    </td>
                    <td className="px-2 py-4">
                      <img
                        className="h-20 w-20 rounded-lg"
                        alt="logo"
                        src={image}
                      />
                    </td>
                    <td className="px-2 py-4">{name}</td>
                    <td className="px-2 py-4">
                      <MenuDropdown
                        handleDelete={() => {
                          handleDeleteCategory(id);
                        }}
                        handleEdit={() => {
                          handleEditCategory(category);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {currentListCategory.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              <span>Không có rạp chiếu nào</span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
