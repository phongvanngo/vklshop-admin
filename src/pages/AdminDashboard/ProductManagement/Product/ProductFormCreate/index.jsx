import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ToolBar from "./toolBar";
import { fetchListCategory } from "app/redux/categorySlice";
import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import MyInputField from "common/FormComponent/MyInputField";
import MySelectionField from "common/FormComponent/MySelectionField";

const schema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
});

export default function ProductForm() {
  const dispatch = useDispatch();
  const listCategory = useSelector(
    (state) => state.category.listCategory || []
  );
  console.log("product form index - list category: ", listCategory);
  useEffect(() => {
    dispatch(fetchListCategory({}));
    dispatch(changeAdminNavbarTitle("Quản lý sản phẩm"));
  }, []);

  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSaveData(data) {
    console.log(data);
  }

  useEffect(() => {
    setValue("category", "--chưa chọn--");
  }, []);

  console.log("Product Form render ---------------------------");

  return (
    <div className="pt-20">
      <div className="w-full ">
        <div className="p-6  min-h-20 border-b border-gray-200 rounded-t-3xl bg-white">
          <ToolBar title={"Tạo mới sản phẩm"} />
        </div>
        <div className="px-8 py-6 rounded-b-3xl bg-white shadow-sm">
          <form id="create-product-form" onSubmit={handleSubmit(onSaveData)}>
            <MyInputField
              register={register}
              name="name"
              label="Tên sản phẩm"
              validation={{ isError: errors.name, mess: "Không được để trống" }}
            />
            <MySelectionField
              defaultValue={null}
              register={register}
              name="category"
              label="Loại sản phẩm"
              validation={{
                isError: errors.category,
                mess: "Không được để trống",
              }}
              listOptions={listCategory}
            />
            <MyInputField
              register={register}
              name="name"
              label="Tên sản phẩm"
              validation={{ isError: errors.name, mess: "Không được để trống" }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
