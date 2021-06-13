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
import TextEditor from "common/FormComponent/TextEditor";
import CategorySelection from "./categorySelection";
import UploadImageForm from "common/FormComponent/UploadImage";
import VariantManagement from "./variantManagement";
import { listVariants } from "app/api/fakeData";
import { setEmtyListVariant } from "app/redux/variantSlice";
import VariantFormDialog from "./variantManegement.form";
import { createProduct } from "app/redux/productSlice";

const schema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
  unit: yup.string().required(),
});

export default function ProductOverview({ productToEdit }) {
  const dispatch = useDispatch();
  const listCategory = useSelector(
    (state) => state.category.listCategory || []
  );
  let {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSaveData(data) {
    if (productToEdit) {
      //sua product
    } else {
      dispatch(createProduct(data));
    }
  }

  function submitFormHandler() {
    document.getElementById("create-product-form").submit();
  }

  useEffect(() => {
    console.log("product overview - product to edit: ", productToEdit);
    if (productToEdit?.id) {
      const { images, name, unit, category, description, content } =
        productToEdit;
      setValue("name", name);
      setValue("description", description);
      setValue("content", content);
      setValue("unit", unit);
      setValue("images", JSON.stringify(images));

      let productCategory =
        listCategory.find((element) => element.id === category) || {};

      // setValue("category", JSON.stringify(productCategory));
    } else {
      // setValue("name", "");
      // setValue("information", "");
    }
  }, [productToEdit]);

  console.log(
    "Product over view render ---------------------------",
    getValues("content")
  );

  return (
    <>
      <div>
        <div className="w-full">
          <div className="px-6 pb-6 pt-0  min-h-20 border-b border-gray-200 rounded-t-3xl bg-white">
            <div className="flex justify-between items-center">
              <div></div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  form="create-product-form"
                  onClick={() => {}}
                  className="flex items-center bg-admin_color_1 appearance-none  rounded-full w-30 h-full  py-2 px-8 text-admin_color_2 leading-tight hover:bg-indigo-900 focus:outline-none"
                >
                  <i className="bx bx-check mr-2 align-middle block"></i>
                  <span>Lưu</span>
                </button>
                {/* <button
                  onClick={() => {}}
                  className="flex items-center bg-red-700 appearance-none  rounded-full w-30 h-full  py-2 px-8 text-admin_color_2 leading-tight hover:bg-red-900 focus:outline-none"
                >
                  <i className="bx bxs-left-arrow-alt mr-2 align-middle block"></i>
                  <span>Quay lại</span>
                </button> */}
              </div>
            </div>
          </div>
          <div className="px-8 py-6 rounded-b-3xl bg-white shadow-sm">
            <form id="create-product-form" onSubmit={handleSubmit(onSaveData)}>
              <div className="md:flex gap-10 sm:block">
                <div className="md:w-1/2 sm:w-full">
                  <MyInputField
                    register={register}
                    name="name"
                    label="Tên sản phẩm"
                    validation={{
                      isError: errors.name,
                      mess: "Không được để trống",
                    }}
                  />
                </div>
                <div className="md:w-1/2 sm:w-full">
                  <MyInputField
                    register={register}
                    validation={{
                      isError: errors.unit,
                      mess: "Không được để trống",
                    }}
                    name="unit"
                    label="Đơn vị"
                  />
                </div>
              </div>

              <div className="md:flex gap-10 sm:block">
                <div className="md:w-1/2 sm:w-full">
                  <MyInputField
                    register={register}
                    name="description"
                    label="Mô tả sản phẩm"
                  />
                </div>

                <div className="md:w-1/2 sm:w-full">
                  <CategorySelection
                    defaultValue={productToEdit?.category}
                    register={register}
                    name="category"
                    label="Phân loại"
                    validation={{
                      isError: errors.category,
                      mess: "Không được để trống",
                    }}
                  />
                </div>
              </div>

              <TextEditor
                defaultValue={productToEdit?.content}
                register={register}
                setValue={(newContent) => {
                  setValue("content", newContent);
                }}
                name="content"
                label="Nội dung sản phẩm"
              />
            </form>
            <UploadImageForm
              defaultValue={JSON.parse(productToEdit?.images || "[]")}
              setImage={(listImage) => {
                setValue("images", JSON.stringify(listImage));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
