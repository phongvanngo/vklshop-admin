import React from "react";
import CategoryFormModal from "../../Category/Category.formDialog";
import ProductFormWrapper from "./FormWrapper";
import VariantFormModal from "./variantManegement.form";

export default function index() {
  return (
    <>
      <VariantFormModal />
      <CategoryFormModal />
      <ProductFormWrapper />
    </>
  );
}
