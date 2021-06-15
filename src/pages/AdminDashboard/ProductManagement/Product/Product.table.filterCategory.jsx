import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import {
  fetchListProduct,
  fetchListProductInCategory,
} from "app/redux/productSlice";
import { useHistory } from "react-router-dom";
import { AdminRoutes } from "routes.const";

export default function FilterCategory({ defaultSelectedId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const listCategory = useSelector((state) => state.category.listCategory);
  const categoryOptions = [{ name: "Tất cả", id: null }, ...listCategory];
  const [selected, setSelected] = useState(categoryOptions[0]);

  useEffect(() => {
    let defaultOption = listCategory.find((e) => e.id == defaultSelectedId);

    if (defaultOption) {
      setSelected(defaultOption);
    }
  }, [listCategory]);

  // useEffect(() => {
  //   if (!selected) return;
  //   if (selected.id === null) {
  //     // dispatch(fetchListProduct({}));
  //     history.push(
  //       AdminRoutes.PRODUCTS +
  //         "/" +
  //         queryString.stringify({ categoryId: selected.id })
  //     );
  //   } else {
  //     history.push(
  //       AdminRoutes.PRODUCTS +
  //         "/" +
  //         queryString.stringify({ categoryId: selected.id })
  //     );
  //     // dispatch(fetchListProductInCategory({ categoryId: selected?.id }));
  //   }
  // }, [selected]);

  return (
    <div className="mt-5 flex items-center">
      <div className="mr-5">
        <span>Chọn danh mục sản phẩm</span>
      </div>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);

          history.push(
            AdminRoutes.PRODUCTS +
              "/" +
              queryString.stringify({ categoryId: e.id })
          );
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-60 py-2 pl-3 pr-10 text-left bg-white rounded-2xl shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categoryOptions.map((category, categoryIdx) => (
                <Listbox.Option
                  key={categoryIdx}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-amber-900 bg-amber-100 hover:bg-indigo-800 hover:text-white"
                        : "text-gray-900"
                    }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={category}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
