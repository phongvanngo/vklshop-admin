import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorNotificationDialog: {
    isOpen: false,
    defaultData: { title: "", content: "" },
  },
  categoryFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  productFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  variantFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  cardTypeFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  shippingMethodFormDialog: {
    isOpen: false,
    defaultData: null,
  },
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openErrorNofificationDialog: (state, action) => {
      for (var prop in state) {
        state[prop].isOpen = false;
      }

      state.errorNotificationDialog.defaultData = action.payload;
      state.errorNotificationDialog.isOpen = true;
    },
    closeErrorNotificationDialog: (state) => {
      state.errorNotificationDialog.isOpen = false;
      state.errorNotificationDialog.defaultData = { title: "" };
    },
    openCategoryFormDialog: (state, action) => {
      state.categoryFormDialog.defaultData = action.payload;
      state.categoryFormDialog.isOpen = true;
    },
    closeCategoryFormDialog: (state) => {
      state.categoryFormDialog.isOpen = false;
      state.categoryFormDialog.defaultData = null;
    },
    openProductFormDialog: (state, action) => {
      state.productFormDialog.defaultData = action.payload;
      state.productFormDialog.isOpen = true;
    },
    closeProductFormDialog: (state) => {
      state.productFormDialog.isOpen = false;
      state.productFormDialog.defaultData = null;
    },
    openVariantFormDialog: (state, action) => {
      state.variantFormDialog.defaultData = action.payload;
      state.variantFormDialog.isOpen = true;
    },
    closeVariantFormDialog: (state) => {
      state.variantFormDialog.isOpen = false;
      state.variantFormDialog.defaultData = null;
    },
    openCardTypeFormDialog: (state, action) => {
      state.cardTypeFormDialog.defaultData = action.payload;
      state.cardTypeFormDialog.isOpen = true;
    },
    closeCardTypeFormDialog: (state) => {
      state.cardTypeFormDialog.isOpen = false;
      state.cardTypeFormDialog.defaultData = null;
    },
    openShippingMethodFormDialog: (state, action) => {
      state.shippingMethodFormDialog.defaultData = action.payload;
      state.shippingMethodFormDialog.isOpen = true;
    },
    closeShippingMethodFormDialog: (state) => {
      state.shippingMethodFormDialog.isOpen = false;
      state.shippingMethodFormDialog.defaultData = null;
    },
  },
});

export const {
  openErrorNofificationDialog,
  closeErrorNotificationDialog,

  openCategoryFormDialog,
  closeCategoryFormDialog,
  openProductFormDialog,
  closeProductFormDialog,
  openVariantFormDialog,
  closeVariantFormDialog,
  openCardTypeFormDialog,
  closeCardTypeFormDialog,
  openShippingMethodFormDialog,
  closeShippingMethodFormDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
