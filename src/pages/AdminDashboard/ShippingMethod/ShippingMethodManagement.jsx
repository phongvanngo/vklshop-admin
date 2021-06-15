import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import { fetchListShippingMethod } from "app/redux/shippingMethodSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShippingMethodTable from "./ShippingMethod.table";
import ShippingMethodFormModal from "./ShippingMethod.formDialog";

export default function ShippingMethodManagement() {
  const dispatch = useDispatch();
  const listShippingMethod = useSelector(
    (state) => state.shippingMethod.listShippingMethod
  );

  useEffect(() => {
    dispatch(changeAdminNavbarTitle("Quản lý phương thức vận chuyển"));
    dispatch(fetchListShippingMethod({}));
  }, [dispatch]);

  return (
    <div>
      <ShippingMethodFormModal />
      <div className="pt-20">
        <ShippingMethodTable listShippingMethod={listShippingMethod} />
      </div>
    </div>
  );
}
