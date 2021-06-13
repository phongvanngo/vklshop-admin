import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import {
  fetchListProduct,
  fetchListProductInCategory,
  setProductToEdit,
} from "app/redux/productSlice";
import { fetchListCategory } from "app/redux/categorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTable from "./Product.table";
import ProductFormModal from "./Product.formDialog";
import { useParams } from "react-router-dom";
import queryString from "query-string";

export default function ProductManagement() {
  const dispatch = useDispatch();
  let { categoryId } = useParams();
  categoryId = queryString.parse(categoryId)?.categoryId;
  console.log("product manager: category id: ", categoryId);

  const listProduct = useSelector((state) => state.product.listProduct);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchListProductInCategory({ categoryId }));
    } else {
      dispatch(fetchListProduct({}));
    }
  }, [categoryId]);

  useEffect(() => {
    dispatch(changeAdminNavbarTitle("Quản lý sản phẩm"));
    dispatch(fetchListCategory({}));
    dispatch(setProductToEdit(null));
  }, [dispatch]);

  return (
    <div>
      <ProductFormModal />
      <div className="pt-20">
        <ProductTable
          currentCategoryId={categoryId}
          listProduct={listProduct}
        />
      </div>
    </div>
  );
}
