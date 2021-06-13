import { fetchListCategory } from "app/redux/categorySlice";
import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import { setEmtyListVariant } from "app/redux/variantSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductOverview from "./productOverview";
import VariantManagement from "./variantManagement";
import queryString from "query-string";
import { fetchProductById } from "app/redux/productSlice";

export default function ProductForm() {
  const dispatch = useDispatch();
  const { productInfo } = useParams();
  let { productId } = queryString.parse(productInfo);
  console.log(productId);

  useEffect(() => {
    dispatch(fetchListCategory({}));
    dispatch(changeAdminNavbarTitle("Quản lý sản phẩm"));
    dispatch(setEmtyListVariant());
    if (productId !== null) {
      dispatch(fetchProductById(productId));
    }
  }, []);

  const [currentTab, setCurrentTab] = useState(0);

  const productToEdit = useSelector((state) => state.product.productToEdit);

  console.log("create product - product to edit - ", productToEdit);

  const listTab = [
    {
      title: "Chi tiết sản phẩm",
      component: <ProductOverview productToEdit={productToEdit} key="1" />,
    },
    { title: "Quản lý mẫu mã", component: <VariantManagement key="2" /> },
  ];

  console.log("Product Form render ---------------------------");

  console.log("product form index -  product to Edit", productToEdit);

  return (
    <>
      <div className="p-5">
        <div className="w-full rounded-2xl bg-white py-5 px-7 shadow-sm">
          <div>
            <h1 className="text-xl mb-5 font-medium">
              {productToEdit ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
            </h1>
          </div>
          <ul className="flex gap-5 border-b border-gray-200">
            {listTab.map((tab, index) => {
              return (
                <li
                  onClick={() => {
                    if (productToEdit === null) {
                      toast.warning(
                        "Bạn cần lưu lại sản phẩm trước khi tạo mẫu mã",
                        {
                          position: toast.POSITION.TOP_RIGHT,
                        }
                      );
                    } else setCurrentTab(index);
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
