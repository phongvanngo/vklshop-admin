import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import { fetchListCardType } from "app/redux/cardTypeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardTypeTable from "./CardType.table";
import CardTypeFormModal from "./CardType.formDialog";

export default function CardTypeManagement() {
  const dispatch = useDispatch();
  const listCardType = useSelector((state) => state.cardType.listCardType);

  useEffect(() => {
    dispatch(changeAdminNavbarTitle("Quản lý các loại thẻ thanh toán"));
    dispatch(fetchListCardType({}));
  }, [dispatch]);

  return (
    <div>
      <CardTypeFormModal />
      <div className="pt-20">
        <CardTypeTable listCardType={listCardType} />
      </div>
    </div>
  );
}
