import { Dialog, Transition } from "@headlessui/react";
import { closeCumRapFormDialog } from "app/redux/dialogSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCumRap, updateCumRap } from "app/redux/cumRapSlice";
import FilterTheaterSystem from "./CumRap.formDialog.filterTheaterSystem";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function CumRapFormModal() {
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { isOpen, defaultData } = useSelector(
    (state) => state.dialog.cumRapFormDialog
  );

  let listTheaterSystem = useSelector(
    (state) => state.theater.listTheaterSystem
  );

  const [selectedTheaterSystem, setSelectedTheaterSytem] = useState([]);

  console.log(defaultData);

  function onSaveData(data) {
    let theaterSystemInfo = {
      theaterSystemId: selectedTheaterSystem?.id,
      theaterSystemName: selectedTheaterSystem?.name,
    };
    if (defaultData?.id === null) {
      console.log(data);
      dispatch(createCumRap({ ...data, ...theaterSystemInfo }));
      dispatch(closeCumRapFormDialog());
    } else {
      dispatch(
        updateCumRap({ ...data, ...theaterSystemInfo, id: defaultData.id })
      );
      dispatch(closeCumRapFormDialog());
    }
  }
  function handleCloseModal() {
    dispatch(closeCumRapFormDialog());
  }

  console.log("render");

  useEffect(() => {
    clearErrors("name");
    if (defaultData?.id) {
      const { name, information, theaterSystemId } = defaultData;
      setValue("name", name);
      setValue("information", information);
      setSelectedTheaterSytem(
        listTheaterSystem.find((element) => element.id === theaterSystemId) ||
          {}
      );
    } else {
      setValue("name", "");
      setValue("information", "");
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
                    <h1 className="font-normal">
                      {defaultData?.id ? "Chỉnh sửa cụm rạp" : "Thêm cụm rạp"}
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
                        Tên cụm rạp
                      </span>
                      <input
                        type="text"
                        {...register("name", {})}
                        className={
                          "h-full w-full appearance-none rounded-full  w-30 py-4 px-6 leading-tight focus:outline-none border  text-gray-500" +
                          (errors.name
                            ? " border-red-500"
                            : " focus:border-indigo-500")
                        }
                      />
                      {errors.name ? (
                        <span className="ml-2 mt-2 text-red-500">
                          *Không được để trống
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mb-8">
                      <span className="font-extrabold mb-2 flex flex-col">
                        Hệ thống rạp
                      </span>
                      <FilterTheaterSystem
                        listTheaterSystem={listTheaterSystem}
                        selected={selectedTheaterSystem}
                        setSelected={setSelectedTheaterSytem}
                      />
                    </div>

                    <div className="mb-8">
                      <span className="font-extrabold mb-2 flex flex-col">
                        Thông tin
                      </span>
                      <input
                        type="text"
                        {...register("information", {})}
                        className="h-full w-full appearance-none rounded-full border w-30 py-4 px-6 leading-tight focus:outline-none focus:border-indigo-500 text-gray-500"
                      />
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
