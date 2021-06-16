import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import { fetchListDiscountCode } from "app/redux/discountCodeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiscountCodeTable from "./DiscountCode.table";
import DiscountCodeFormModal from "./DiscountCode.formDialog";

export default function DiscountCodeManagement() {
  const dispatch = useDispatch();
  const listDiscountCode = useSelector(
    (state) => state.discountCode.listDiscountCode
  );

  useEffect(() => {
    dispatch(changeAdminNavbarTitle("Quản lý mã giảm"));
    dispatch(fetchListDiscountCode({}));
  }, [dispatch]);

  return (
    <div>
      <DiscountCodeFormModal />
      <div className="pt-20">
        <DiscountCodeTable listDiscountCode={listDiscountCode} />
      </div>
    </div>
  );
}
