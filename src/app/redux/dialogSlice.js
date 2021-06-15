import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theaterSystemFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  movieFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  cumRapFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  phongChieuFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  showTimeFormDialog: {
    isOpen: false,
    defaultData: null,
  },
  movieTypeFormDialog: {
    isOpen: false,
    defaultData: null,
  },
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
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openTheaterSystemFormDialog: (state, action) => {
      state.theaterSystemFormDialog.defaultData = action.payload;
      state.theaterSystemFormDialog.isOpen = true;
    },
    closeTheaterSystemFormDialog: (state) => {
      state.theaterSystemFormDialog.isOpen = false;
      state.theaterSystemFormDialog.defaultData = null;
    },
    openMovieFormDialog: (state, action) => {
      state.movieFormDialog.defaultData = action.payload;
      state.movieFormDialog.isOpen = true;
    },
    closeMovieFormDialog: (state) => {
      state.movieFormDialog.isOpen = false;
      state.movieFormDialog.defaultData = null;
    },
    openCumRapFormDialog: (state, action) => {
      state.cumRapFormDialog.defaultData = action.payload;
      state.cumRapFormDialog.isOpen = true;
    },
    closeCumRapFormDialog: (state) => {
      state.cumRapFormDialog.isOpen = false;
      state.cumRapFormDialog.defaultData = null;
    },
    openMovieTypeFormDialog: (state, action) => {
      state.movieTypeFormDialog.defaultData = action.payload;
      state.movieTypeFormDialog.isOpen = true;
    },
    closeMovieTypeFormDialog: (state) => {
      state.movieTypeFormDialog.isOpen = false;
      state.movieTypeFormDialog.defaultData = null;
    },
    openShowTimeFormDialog: (state, action) => {
      state.showTimeFormDialog.defaultData = action.payload;
      state.showTimeFormDialog.isOpen = true;
    },
    closeShowTimeFormDialog: (state) => {
      state.showTimeFormDialog.isOpen = false;
      state.showTimeFormDialog.defaultData = null;
    },
    openPhongChieuFormDialog: (state, action) => {
      state.phongChieuFormDialog.defaultData = action.payload;
      state.phongChieuFormDialog.isOpen = true;
    },
    closePhongChieuFormDialog: (state) => {
      state.phongChieuFormDialog.isOpen = false;
      state.phongChieuFormDialog.defaultData = null;
    },
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
  },
});

export const {
  openErrorNofificationDialog,
  closeErrorNotificationDialog,
  openTheaterSystemFormDialog,
  closeTheaterSystemFormDialog,
  openMovieFormDialog,
  closeMovieFormDialog,
  openCumRapFormDialog,
  closeCumRapFormDialog,
  openPhongChieuFormDialog,
  closePhongChieuFormDialog,
  openMovieTypeFormDialog,
  closeMovieTypeFormDialog,
  openShowTimeFormDialog,
  closeShowTimeFormDialog,

  openCategoryFormDialog,
  closeCategoryFormDialog,
  openProductFormDialog,
  closeProductFormDialog,
  openVariantFormDialog,
  closeVariantFormDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
