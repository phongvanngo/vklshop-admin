import { Dialog, Transition } from "@headlessui/react";
import { closeDiscountCodeFormDialog } from "app/redux/dialogSlice";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { forwardRef, useState } from "react";
import {
  createDiscountCode,
  updateDiscountCode,
} from "app/redux/discountCodeSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePickerInput = forwardRef(
  ({ value, onClick, onChange }, ref) => (
    <input
      className="h-full w-full appearance-none rounded-full border w-30 py-4 px-6 leading-tight focus:outline-none focus:border-indigo-500 text-gray-500"
      onClick={onClick}
      ref={ref}
      value={value}
      onChange={(e) => {
        try {
          onChange(e.target.value);
        } catch (error) {
          console.log("dateTimePicker eror", error);
        }
      }}
    />
  )
);

const schema = yup.object().shape({
  code: yup.string().required(),
  percentage: yup.number().required(),
  number: yup.number().required(),
});

export default function DiscountCodeFormModal() {
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
    (state) => state.dialog.discountCodeFormDialog
  );

  const [startDate, setStartDate] = useState(new Date());

  function onSaveData(data) {
    if (defaultData?.id === null) {
      dispatch(
        createDiscountCode({
          code: data.code,
          exp: startDate.toDateString(),
          percentage: data.percentage / 100,
          number: data.number,
        })
      );
      dispatch(closeDiscountCodeFormDialog());
    } else {
      dispatch(
        updateDiscountCode({
          code: data.code,
          number: data.number,
          exp: startDate.toDateString(),
          percentage: data.percentage / 100,
          id: defaultData.id,
        })
      );
      dispatch(closeDiscountCodeFormDialog());
    }
  }
  function handleCloseModal() {
    dispatch(closeDiscountCodeFormDialog());
  }

  useEffect(() => {
    clearErrors("name");
    if (defaultData?.id) {
      const { code, percentage, exp, number } = defaultData;
      setValue("code", code);
      setValue("percentage", percentage * 100);
      setValue("number", number);
      setStartDate(new Date(exp));
    } else {
      setValue("code", "");
      setValue("percentage", "");
      setValue("number", "");
      setStartDate(new Date());
    }
  }, [setValue, defaultData]);

  if (!isOpen) return null;

  return (
    <>
      <Transition appear show={true} as={Fragment}>
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
                    <h1 className="font-normal">
                      {defaultData?.id
                        ? "Chỉnh sửa mã giảm giá"
                        : "Thêm mã giảm giá mới"}
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
                    <div className="mb-8">
                      <span className="mb-2 flex flex-col font-extrabold">
                        Mã giảm giá
                      </span>
                      <input
                        type="text"
                        {...register("code", {})}
                        className={
                          "h-full w-full appearance-none rounded-full  w-30 py-4 px-6 leading-tight focus:outline-none border  text-gray-500" +
                          (errors.code
                            ? " border-red-500"
                            : " focus:border-indigo-500")
                        }
                      />
                      {errors.code ? (
                        <span className="ml-2 mt-2 text-red-500">
                          *Không được để trống
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mb-8">
                      <span className="mb-2 flex flex-col font-extrabold">
                        Chiết khấu (% giá trị hóa đơn)
                      </span>
                      <input
                        type="text"
                        {...register("percentage", {})}
                        className={
                          "h-full w-full appearance-none rounded-full  w-30 py-4 px-6 leading-tight focus:outline-none border  text-gray-500" +
                          (errors.percentage
                            ? " border-red-500"
                            : " focus:border-indigo-500")
                        }
                      />
                      {errors.percentage ? (
                        <span className="ml-2 mt-2 text-red-500">
                          *Dữ liệu phải là số và không được để trống
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mb-8">
                      <span className="mb-2 flex flex-col font-extrabold">
                        Số lượng
                      </span>
                      <input
                        type="text"
                        {...register("number", {})}
                        className={
                          "h-full w-full appearance-none rounded-full  w-30 py-4 px-6 leading-tight focus:outline-none border  text-gray-500" +
                          (errors.number
                            ? " border-red-500"
                            : " focus:border-indigo-500")
                        }
                      />
                      {errors.number ? (
                        <span className="ml-2 mt-2 text-red-500">
                          *Dữ liệu phải là số và không được để trống
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mb-8">
                      <span className="font-extrabold mb-2 flex flex-col">
                        Ngày hết hạn
                      </span>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        customInput={<CustomDatePickerInput />}
                      />
                      {errors.exp ? (
                        <span className="block ml-2 mt-2 text-red-500">
                          *Ngày tháng chưa hợp lệ
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
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
