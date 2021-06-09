import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import { fetchListCategory } from "app/redux/categorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryTable from "./Category.table";
import CategoryFormModal from "./Category.formDialog";

export default function CategoryManagement() {
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.category.listCategory);

  useEffect(() => {
    dispatch(changeAdminNavbarTitle("Quản lý danh mục sản phẩm"));
    dispatch(fetchListCategory({}));
  }, [dispatch]);

  return (
    <div>
      <CategoryFormModal />
      <div className="pt-20">
        <CategoryTable listCategory={listCategory} />
      </div>
    </div>
  );
}
