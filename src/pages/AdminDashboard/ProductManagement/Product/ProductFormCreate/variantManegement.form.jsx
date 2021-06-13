import { Dialog, Transition } from "@headlessui/react";
import { closeVariantFormDialog } from "app/redux/dialogSlice";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { createVariant, updateVariant } from "app/redux/variantSlice";
import MyInputField from "common/FormComponent/MyInputField";

const schema = yup.object().shape({
  name: yup.string().required(),
  costPrice: yup.number().required(),
  price: yup.number().required(),
  stock: yup.number().required(),
});

export default function VariantFormModal() {
  const dispatch = useDispatch();
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isOpen, defaultData } = useSelector(
    (state) => state.dialog.variantFormDialog
  );

  function onSaveData(data) {
    if (defaultData?.id === null) {
      console.log(data);
      dispatch(createVariant({ ...data, productId: defaultData.productId }));
      dispatch(closeVariantFormDialog());
    } else {
      dispatch(
        updateVariant({
          ...data,
          id: defaultData.id,
        })
      );
      dispatch(closeVariantFormDialog());
    }
  }
  function handleCloseModal() {
    dispatch(closeVariantFormDialog());
  }

  console.log("render");

  useEffect(() => {
    clearErrors("name");
    if (defaultData?.id) {
      const { name, price, costPrice, stock } = defaultData;
      setValue("name", name);
      setValue("price", price);
      setValue("costPrice", costPrice);
      setValue("stock", stock);
    } else {
      setValue("name", "");
      setValue("price", "");
      setValue("costPrice", "");
      setValue("stock", "");
    }
  }, [setValue, defaultData]);

  console.log(errors);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="p-0 inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 border-b"
                >
                  <div className="pr-5 pl-5 pt-4 pb-3 w-full flex justify-between">
                    <h1 className="font-bold">
                      {defaultData?.id
                        ? "Chỉnh sửa mẫu mã sản phẩm"
                        : "Thêm mẫu mã sản phẩm"}
                    </h1>
                    <button
                      onClick={handleCloseModal}
                      className="focus:outline-none hover:text-gray-400"
                    >
                      <i className="bx bx-x text-xl"></i>
                    </button>
                  </div>
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSaveData)}>
                  <div className="mt-2 p-6">
                    <MyInputField
                      register={register}
                      validation={{
                        isError: errors.name,
                        mess: "Không được để trống",
                      }}
                      name="name"
                      label="Tên mẫu mã"
                    />
                    <MyInputField
                      register={register}
                      validation={{
                        isError: errors.costPrice,
                        mess: "Dữ liệu phải là số và không được để trống",
                      }}
                      name="costPrice"
                      label="Giá gốc"
                    />
                    <MyInputField
                      register={register}
                      validation={{
                        isError: errors.price,
                        mess: "Dữ liệu phải là số và không được để trống",
                      }}
                      name="price"
                      label="Giá bán"
                    />
                    <MyInputField
                      register={register}
                      validation={{
                        isError: errors.stock,
                        mess: "Dữ liệu phải là số và không được để trống",
                      }}
                      name="stock"
                      label="Tồn kho"
                    />
                  </div>

                  <div className="mb-4 p-6 overflow-hidden">
                    <input
                      type="submit"
                      value="Lưu"
                      className="inline-flex float-right px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        handleSubmit(onSaveData);
                      }}
                    />
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
