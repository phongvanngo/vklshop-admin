import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import { fetchListProduct } from "app/redux/productSlice";
import { fetchListCategory } from "app/redux/categorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTable from "./Product.table";
import ProductFormModal from "./Product.formDialog";

export default function ProductManagement() {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.product.listProduct);

  useEffect(() => {
    dispatch(changeAdminNavbarTitle("Quản lý cụm rạp"));
    dispatch(fetchListProduct({}));
    dispatch(fetchListCategory({}));
  }, [dispatch]);

  return (
    <div>
      <ProductFormModal />
      <div className="pt-20">
        <ProductTable listProduct={listProduct} />
      </div>
    </div>
  );
}
