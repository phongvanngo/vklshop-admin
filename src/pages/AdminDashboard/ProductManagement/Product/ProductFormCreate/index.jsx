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
import ProductOverview from "./productOverview";

const schema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
});

export default function ProductForm() {
  const dispatch = useDispatch();
  // const listCategory = useSelector(
  //   (state) => state.category.listCategory || []
  // );
  useEffect(() => {
    dispatch(fetchListCategory({}));
    dispatch(changeAdminNavbarTitle("Quản lý sản phẩm"));
    dispatch(setEmtyListVariant());
  }, []);

  const [currentTab, setCurrentTab] = useState(0);

  const listTab = [
    {
      title: "Chi tiết sản phẩm",
      component: <ProductOverview key="1" />,
    },
    { title: "Quản lý mẫu mã", component: <VariantManagement key="2" /> },
  ];

  console.log("Product Form render ---------------------------");

  return (
    <>
      <div className="p-5">
        <div className="w-full rounded-2xl bg-white py-5 px-7 shadow-sm">
          <div>
            <h1 className="text-xl mb-5 font-medium">{"Tạo mới sản phẩm"}</h1>
          </div>
          <ul className="flex gap-5 border-b border-gray-200">
            {listTab.map((tab, index) => {
              return (
                <li
                  onClick={() => {
                    setCurrentTab(index);
                  }}
                  key={index}
                  style={
                    currentTab === index
                      ? {
                          marginBottom: "-1px",
                          borderBottom: "1px solid #42389d",
                          color: "#42389d",
                        }
                      : {}
                  }
                  className="p-2 cursor-pointer"
                >
                  <span>{tab.title}</span>
                </li>
              );
            })}
          </ul>
          <div>
            <div className="py-5">{[listTab[currentTab].component]}</div>
          </div>
        </div>
      </div>

      {/* <VariantFormDialog />
      <div className="pt-10">
        <div className="sm:w-full md:w-3/4 m-auto ">
          <ProductOverview />
        </div>
      </div> */}
    </>
  );
}
