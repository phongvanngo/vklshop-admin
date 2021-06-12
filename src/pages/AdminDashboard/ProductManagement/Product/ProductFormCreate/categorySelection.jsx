import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCategoryFormDialog } from "app/redux/dialogSlice";
import CategoryFormModal from "../../Category/Category.formDialog";

export default function Category({
  label,
  register,
  name,
  defaultValue,
  validation,
}) {
  const { isError, mess } = validation;
  let listOptions = useSelector((state) => state.category.listCategory);
  const dispatch = useDispatch();
  const NoneValueOption = () => {
    if (defaultValue) return null;
    else
      return (
        <option value="" selected disabled hidden>
          Chọn loại sản phẩm
        </option>
      );
  };

  console.log("  category selection ", defaultValue);

  return (
    <>
      <CategoryFormModal />
      <div className="mb-8">
        <div className="mb-3 flex justify-between items-center ">
          <span className="text-gray-600">{label}</span>
          <button
            onClick={() => {
              dispatch(openCategoryFormDialog({ id: null }));
            }}
            className="flex items-center justify-center bg-green-900 appearance-none  rounded-full w-100 h-full  py-1 pl-1 pr-3 text-admin_color_2 leading-tight hover:bg-green-500 focus:outline-none"
          >
            <i className="bx bx-plus mr-2 align-middle block"></i>
            <span>Thêm loại</span>
          </button>
        </div>
        <select
          type="text"
          {...register(name, {})}
          className={
            "h-full w-full  rounded-full  w-30 py-4 px-6 leading-tight focus:outline-none border  text-gray-500" +
            (isError ? " border-red-500" : " focus:border-indigo-500")
          }
        >
          <NoneValueOption />
          {listOptions.map((e, index) => {
            let optionValue = JSON.stringify(e);
            return (
              <option
                selected={optionValue === JSON.stringify(defaultValue)}
                className
                value={optionValue}
                key={index}
              >
                {e.name}
              </option>
            );
          })}
        </select>
        {isError ? <span className="ml-2 mt-2 text-red-500">*{mess}</span> : ""}
      </div>
    </>
  );
}
